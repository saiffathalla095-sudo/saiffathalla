# SecureShare Architecture

This project is now split so the app layers are easy to find:

- `frontend/` contains the UI.
- `backend/` contains the mock server and API routes.
- `docs/diagrams/` contains architecture notes and diagrams.

## Folder Map

```text
New project/
|-- index.html
|-- frontend/
|   |-- css/styles.css
|   `-- js/
|       |-- app.js
|       |-- charts.js
|       `-- data.js
|-- backend/
|   `-- server.js
`-- docs/
    `-- diagrams/
        `-- architecture.md
```

## Data Flow

```mermaid
flowchart LR
  A["Browser"] --> B["index.html"]
  B --> C["frontend/js/app.js"]
  C --> D["frontend/js/charts.js"]
  C --> E["frontend/js/data.js"]
  C --> F["GET /api/bootstrap"]
  F --> G["backend/server.js"]
  G --> H["Mock data: files, users, subscriptions"]
```

## Subscription Placement

```mermaid
flowchart TD
  A["Sidebar: Subscriptions"] --> B["Subscriptions Screen"]
  B --> C["Current Plan Summary"]
  B --> D["Plan Cards"]
  B --> E["Billing / Seat Metrics"]
  C --> F["Backend API /api/subscriptions"]
```
