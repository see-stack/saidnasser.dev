---
slug: 'pos-system-design'
title: 'System Design: Restaurant POS Order Flow'
date: '2026-04-20'
readTime: '8 min read'
excerpt: 'How the order lifecycle works in a production restaurant POS system handling dine-in, takeaway, and multi-station coordination.'
tags: ['architecture', 'POS', 'system design']
---

## Overview

The restaurant POS at ibreezglobal handles the complete order lifecycle: a waiter takes an order, it appears on the kitchen display, the kitchen prepares it, and the waiter is notified when it's ready. This sounds straightforward, but coordinating three roles (waiter, kitchen, cafe) across a live service environment requires careful system design.

## The Order Lifecycle

The system implements a four-stage flow:

1. **Order Intake** --- The waiter selects a table, chooses items from categorized menus (Cafe/Restaurant), and sends the order. Each order is timestamped and tagged with the table number and service type (dine-in or takeaway).
2. **Kitchen Routing** --- The system splits the order by station. Cafe items route to the Cafe station; Restaurant items route to the Kitchen. Each station sees only its own items, avoiding noise.
3. **Preparation & Status** --- Kitchen staff see orders sorted by urgency. Each item progresses through PREP -> HOLD -> DONE. The system coordinates cross-station completion --- if one station finishes before the other, it shows an alert.
4. **Delivery Signal** --- When both stations mark items as DONE, the system signals the waiter that the order is ready for serving.

## Architecture Decisions

### Server-Sent Events for Live Updates

The kitchen display needs real-time updates without polling. SSE provides a persistent connection from server to client, pushing order status changes as they happen. This keeps the kitchen screen synchronized across multiple displays without the overhead of WebSockets.

### Role-Based Views

Rather than building a monolithic dashboard, the system has three distinct interfaces:

- **Waiter View** --- Menu browsing, cart management, order submission
- **Kitchen Display** --- Order queue, station filtering, status controls
- **Admin Panel** --- Menu management, table configuration, order history

This separation means each view loads only what it needs and presents only the actions relevant to that role.

### Order Splitting at the Application Layer

When a waiter sends an order containing both Cafe and Restaurant items, the application layer splits it into station-specific sub-orders. Each sub-order has its own status lifecycle. This allows parallel preparation tracking while maintaining a unified view for the waiter.

```javascript
// Simplified order split logic
function splitOrderByStation(order) {
  const stations = { cafe: [], kitchen: [] };

  order.items.forEach(item => {
    if (item.category === 'cafe') {
      stations.cafe.push(item);
    } else {
      stations.kitchen.push(item);
    }
  });

  return stations;
}
```

## Database Schema

The order system uses a normalized schema with these core tables:

- `orders` --- Top-level order with table number, status, timestamps
- `order_items` --- Individual line items linked to menu products
- `order_stations` --- Station-specific sub-orders (cafe, kitchen)
- `station_item_status` --- Per-item status within each station

This design means a single order can span multiple stations while maintaining atomic status tracking per item. The waiter sees one order; each station sees only its relevant items.

## What Went Right

The station-split approach proved essential during real service. When a large table orders both coffee and mains, the cafe starts preparing drinks while the kitchen works on food. Without the split, one station would be blocked waiting for the other's items.

SSE for live updates eliminated the "refresh to see new orders" problem that plagued the previous manual system. Kitchen staff see orders appear in real time, reducing the feedback loop from minutes to seconds.

## What I'd Do Differently

The current system uses polling fallback when SSE connections drop. A more robust approach would implement automatic reconnection with exponential backoff and a last-event-ID mechanism to avoid missing updates during reconnection windows.

I'd also add an order audit log earlier. Tracking every status transition with a timestamp makes debugging production issues far easier.
