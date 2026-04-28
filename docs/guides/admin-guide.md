# Admin Guide

## Accessing the Admin Panel

Navigate to `/admin` in the dashboard. You will be redirected to `/admin/login` if not authenticated.

**Default Admin Credentials (development only):**
- Email: `admin@aiagentkit.com`
- Password: `admin123`

> ⚠️ **Change the default credentials before deploying to production.** Update the `ADMIN_USERS` array in `app/api/auth/[...nextauth]/route.ts` or configure a database-backed user store.

---

## User Management

The **Users** tab in Admin shows all registered users with:
- Wallet address
- Role (Admin / Developer / User / Auditor)
- Status (Active / Inactive)
- Join date

### Actions

| Action | Description |
|---|---|
| **Add User** | Create a new user record |
| **Edit** | Change user role or status |
| **Remove** | Deactivate a user account |

---

## Role Management

The **Roles** tab shows the four RBAC roles:

| Role | Permissions |
|---|---|
| **Admin** | Full access: user management, role assignment, all dashboards, billing |
| **Developer** | Developer dashboard, tool explorer, API monitoring, environment config |
| **User** | User dashboard, wallet overview, transaction history |
| **Auditor** | Read-only access to audit logs, activity feeds |

### Assigning Roles

1. Go to **Admin → Users**
2. Click **Edit** next to a user
3. Select the new role from the dropdown
4. Click **Save**

---

## Activity Log

The **Activity Log** tab shows all user actions in the system:
- Timestamp
- Actor (wallet address)
- Action type
- Target resource
- Result (success / failure)

Use the search bar to filter by wallet address, action type, or date range.

---

## API Monitoring

Access system metrics at `GET /api/metrics`. The Admin dashboard displays:
- Total agent calls (last 24h / 7d / 30d)
- Protocol breakdown (which Solana protocols are most used)
- Error rate
- Average response latency

---

## System Health

`GET /api/health` returns the system health status:

```json
{
  "status": "ok",
  "timestamp": "2026-03-15T04:00:00.000Z",
  "version": "1.0.0",
  "services": {
    "database": "ok",
    "solana_rpc": "ok"
  }
}
```

---

## Security Configuration

### Changing Admin Password

Generate a new bcrypt hash:

```bash
node -e "const bcrypt = require('bcryptjs'); bcrypt.hash('your-new-password', 10).then(h => console.log(h))"
```

Replace the `password` field in `ADMIN_USERS` with the new hash.

### Rate Limiting

Rate limiting is enforced in `web-dashboard/middleware.ts`. Default limits:
- API routes: 100 requests / 15 minutes per IP
- Auth routes: 10 requests / 15 minutes per IP

Adjust these values in `middleware.ts` as needed.
