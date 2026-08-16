---
slug: 'kitchen-display-bug'
title: 'Debugging the Kitchen Display'
date: '2026-04-10'
readTime: '5 min read'
excerpt: 'A production bug where the kitchen display went blank during service, the investigation, and the monitoring gaps it exposed.'
tags: ['debugging', 'ops', 'POS']
---

## The Bug

During a live service shift, the kitchen display went blank. Not a loading spinner, not an empty-state message --- just a white screen where the order queue should have been. Kitchen staff couldn't see incoming orders. Waiters were calling back to the kitchen asking if orders had been received.

The system was still accepting orders from the waiter interface. Orders were being written to the database correctly. But the kitchen display --- the primary interface for food preparation --- was showing nothing.

## Root Cause Investigation

The kitchen display uses an auto-refresh mechanism that polls the server for new orders every few seconds. The flow looks like this:

1. Frontend sends GET request to `/kitchen/orders`
2. Server queries for active (non-completed) orders
3. Server returns JSON response with order data
4. Frontend replaces the current order list with the response data

The problem was in step 3. Under certain conditions, the server was returning an empty response --- not an empty array `[]`, but a `200 OK` with an empty body.

The frontend code handled this case by replacing the DOM content with nothing. Since it used `innerHTML` assignment without checking for an empty response, the previous order queue was erased and replaced with blank content.

## Why the Server Returned Empty Responses

The root cause was a PHP error in the query logic. The kitchen orders endpoint had a filter that was supposed to exclude orders older than a certain threshold. The filter had a bug:

```php
// Bug: missing return statement in the filter closure
$orders = $orders->filter(function ($order) {
    $order->created_at >= Carbon::now()->subHours(4);
    // Should be: return $order->created_at >= ...;
});
```

In PHP, a closure without an explicit `return` statement returns `null`, which is falsy. The filter removed every order, resulting in an empty collection. The controller then serialized this empty collection --- but instead of returning `[]`, an edge case in the response formatting middleware produced an empty body.

## The Fix

Two fixes were needed:

1. **Add the missing return statement** --- The immediate cause. The filter closure now properly returns the boolean comparison result.
2. **Frontend defensive check** --- The auto-refresh handler now validates the response before replacing the DOM. If the response is empty, it keeps the current order list and logs a warning.

```javascript
// Fixed: validate response before replacing DOM
function refreshKitchenOrders() {
  fetch('/kitchen/orders')
    .then(res => res.json())
    .then(data => {
      if (!data || !Array.isArray(data.orders)) {
        console.warn('Invalid kitchen orders response, keeping current state');
        return;
      }
      renderOrderQueue(data.orders);
    })
    .catch(err => {
      console.error('Failed to refresh orders:', err);
    });
}
```

## The Monitoring Gap

This bug exposed a monitoring blind spot. The kitchen display failing silently meant that no alert was triggered when orders stopped appearing. The system had health checks for the server (is it running?) and the database (is it reachable?), but no check for the application-level contract: "can the kitchen display render orders?"

I added a synthetic monitoring check that periodically verifies the kitchen endpoint returns valid order data and the frontend can render it. If the check fails three times in a row, an alert is sent.

## Lessons

- **Validate response data** --- Never assume the server returns the expected shape. Defensive rendering prevents blank screens.
- **Monitor application health, not just infrastructure** --- A server can be healthy while the application is broken.
- **PHP closures need explicit return** --- A missing `return` in a filter closure silently removes all items.
- **Auto-refresh with full replacement is risky** --- Consider using incremental updates or keeping a local cache that survives bad responses.
