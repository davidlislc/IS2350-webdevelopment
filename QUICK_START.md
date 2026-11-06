# Quick Start Guide - Access Request Dashboard

## Project Files Created

### Frontend Files
1. **[AccessRequestDashboard.jsx](/Users/david/github/IS2350webdevelopment/reduxproject/reactproject-develop/src/components/AccessRequestDashboard.jsx)** (14KB)
   - Main React component for the dashboard
   - Handles CRUD operations for access requests
   - Responsive UI with filtering and sorting

2. **[accessRequestService.js](/Users/david/github/IS2350webdevelopment/reduxproject/reactproject-develop/src/services/accessRequestService.js)** (3KB)
   - API service layer
   - Handles all HTTP requests to backend

3. **[AccessRequestDashboard.css](/Users/david/github/IS2350webdevelopment/reduxproject/reactproject-develop/src/styles/AccessRequestDashboard.css)** (6.7KB)
   - Complete styling
   - Responsive design
   - Dark mode support

4. **[App.jsx](/Users/david/github/IS2350webdevelopment/reduxproject/reactproject-develop/src/App.jsx)** (Updated)
   - Integrated access request dashboard
   - Enhanced authentication
   - User role management

## Database Schema

The following tables have been created in your `init.sql`:

### access_request Table
```sql
CREATE TABLE access_request (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userid INT NOT NULL,
    useremail VARCHAR(100) NOT NULL,
    request_type VARCHAR(50) NOT NULL,
    request_detail TEXT,
    request_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) NOT NULL DEFAULT 'PENDING',
    note TEXT,
    FOREIGN KEY (userid) REFERENCES users(id) ON DELETE CASCADE
);
```

### request_process Table
```sql
CREATE TABLE request_process (
    id INT AUTO_INCREMENT PRIMARY KEY,
    access_request_id INT NOT NULL UNIQUE,
    isApproved BOOLEAN,
    approver_id INT,
    approver_email VARCHAR(100),
    decidsion_time TIMESTAMP,
    FOREIGN KEY (access_request_id) REFERENCES access_request(id) ON DELETE CASCADE,
    FOREIGN KEY (approver_id) REFERENCES users(id) ON DELETE SET NULL
);
```

## Backend Endpoints

8 fully implemented endpoints in `jwt-mysql.js`:

### Create Request
```bash
POST /api/access-request
Authorization: Bearer <token>
Content-Type: application/json

{
  "useremail": "user@example.com",
  "request_type": "DATABASE_ACCESS",
  "request_detail": "Need access to customer database"
}
```

### List Requests
```bash
GET /api/access-requests
Authorization: Bearer <token>
# Returns user's own requests (or all if admin)
```

### View Request Details
```bash
GET /api/access-request/:id
Authorization: Bearer <token>
```

### Approve Request (Admin Only)
```bash
POST /api/access-request/:id/approve
Authorization: Bearer <token>
Content-Type: application/json

{
  "approver_email": "admin@example.com"
}
```

### Deny Request (Admin Only)
```bash
POST /api/access-request/:id/deny
Authorization: Bearer <token>
Content-Type: application/json

{
  "note": "Reason for denial",
  "approver_email": "admin@example.com"
}
```

### Get Pending Requests (Admin Only)
```bash
GET /api/access-requests/pending
Authorization: Bearer <token>
```

### Get Request Process
```bash
GET /api/request-process/:access_request_id
Authorization: Bearer <token>
```

### Get User History (Admin Only)
```bash
GET /api/access-requests/history/:user_id
Authorization: Bearer <token>
```

## Setup Instructions

### Step 1: Start MySQL Database
```bash
cd jwt/
docker-compose up -d
# Wait for container to be ready
docker-compose logs mysql
```

### Step 2: Verify Database Tables
```bash
docker-compose exec mysql mysql -uroot -proot_password -Dmy_database
mysql> SHOW TABLES;
mysql> DESCRIBE access_request;
mysql> DESCRIBE request_process;
mysql> EXIT;
```

### Step 3: Start Backend Server
```bash
# In jwt/ directory
npm install  # if not already installed
node jwt-mysql.js
# Should see: "Server running on port 8080"
```

### Step 4: Start Frontend (in another terminal)
```bash
cd reduxproject/reactproject-develop/
npm install  # if not already installed
npm run dev
# Should see: "Local: http://localhost:5173"
```

### Step 5: Open Application
- Open browser to `http://localhost:5173`
- Login with credentials below

## Demo Credentials

### Regular User
- **Username**: `user1`
- **Password**: `password1`
- **Role**: User (can only see own requests)

### Admin User
- **Username**: `admin`
- **Password**: `password1`
- **Role**: Admin (can see all requests and approve/deny)

## Dashboard Features

### For Regular Users
1. ✅ Create new access request
   - Select request type (DATABASE_ACCESS, FILE_SHARE, etc.)
   - Enter email and details
   - Submit for approval

2. ✅ View all personal requests
   - See status of each request
   - Click "View Details" for full information

3. ✅ Track request status
   - PENDING (yellow) - waiting for approval
   - APPROVED (green) - request approved
   - DENIED (red) - request denied with reason

### For Admin Users
1. ✅ All user features
2. ✅ View all requests from all users
3. ✅ Filter requests by status
4. ✅ Sort requests by date or priority
5. ✅ Approve pending requests
   - Add approver email
   - Decision tracked in request_process table

6. ✅ Deny requests with reasons
   - Provide denial note
   - Note stored in database

7. ✅ View complete request history

## File Structure

```
reduxproject/reactproject-develop/
├── src/
│   ├── components/
│   │   └── AccessRequestDashboard.jsx      ✨ NEW
│   ├── services/
│   │   └── accessRequestService.js         ✨ NEW
│   ├── styles/
│   │   └── AccessRequestDashboard.css      ✨ NEW
│   ├── App.jsx                             ✏️ UPDATED
│   └── main.jsx
├── ACCESS_REQUEST_README.md                ✨ NEW (Documentation)
└── package.json

jwt/
├── jwt-mysql.js                            ✏️ UPDATED (8 endpoints)
├── init.sql                                ✏️ UPDATED (2 tables)
├── package.json
└── docker-compose.yml
```

## Testing the System

### 1. Create a Request (as user1)
1. Login with user1/password1
2. Click "+ New Request" button
3. Fill in:
   - Email: `user1@example.com`
   - Type: `DATABASE_ACCESS`
   - Details: `I need access to the sales database`
4. Click "Submit Request"
5. Success message should appear

### 2. View Request (as user1)
1. See your created request in the list
2. Click "View Details" button
3. See full request information
4. Notice status is "PENDING"

### 3. Approve Request (as admin)
1. Logout and login as admin/password1
2. You should see pending requests
3. Click "View Details" on user1's request
4. Click "✓ Approve" button
5. Confirm approval
6. Request status changes to "APPROVED"

### 4. Create and Deny Request (as admin)
1. As admin, create a new request
2. Click "View Details"
3. Fill in "Denial Note" field
4. Click "✕ Deny" button
5. Confirm denial
6. Request status changes to "DENIED"

### 5. Filter and Sort (as admin)
1. Use "Status" dropdown to filter by:
   - All Statuses
   - Pending
   - Approved
   - Denied
2. Use "Sort" dropdown to sort by:
   - Most Recent
   - Oldest First
   - Pending First (admin only)

## Troubleshooting

### Issue: "Cannot connect to backend"
**Solution**: 
```bash
# Check if backend is running
ps aux | grep jwt-mysql.js
# Restart backend
cd jwt/
node jwt-mysql.js
```

### Issue: Database tables not found
**Solution**:
```bash
# Recreate tables
docker-compose exec mysql mysql -uroot -proot_password -Dmy_database < init.sql
```

### Issue: Login fails
**Solution**:
- Check MySQL is running: `docker-compose ps`
- Verify credentials: user1/password1 or admin/password1
- Check console for error messages

### Issue: Admin features not visible
**Solution**:
- Make sure user is actually admin
- Check user table for admin user
- Verify JWT token includes role

## API Response Examples

### Success Response (Create Request)
```json
{
  "message": "Access request created successfully",
  "access_request_id": 1
}
```

### Error Response
```json
{
  "message": "Error creating access request",
  "error": "..."
}
```

### Get Requests Response
```json
{
  "access_requests": [
    {
      "id": 1,
      "userid": 1,
      "useremail": "user1@example.com",
      "request_type": "DATABASE_ACCESS",
      "request_detail": "Need access to customer database",
      "request_time": "2024-11-05T17:30:00.000Z",
      "status": "PENDING",
      "note": null
    }
  ]
}
```

## Performance Considerations

- Dashboard loads all requests on page load
- Consider pagination for large datasets (future enhancement)
- Filtering and sorting happen client-side
- Status updates require page refresh

## Security Notes

- Tokens stored in localStorage (use secure cookies in production)
- All endpoints require JWT authentication
- Admin endpoints have role verification
- SQL queries use parameterized statements
- CORS enabled for localhost:3000

## Next Steps

1. ✅ Test the dashboard with demo credentials
2. ✅ Create a few test requests
3. ✅ Test approve/deny workflow
4. ✅ Review the database tables
5. Consider adding:
   - Email notifications
   - Request comments
   - More request types
   - Analytics dashboard
   - Pagination for large datasets

## Additional Documentation

- See [ACCESS_REQUEST_README.md](/Users/david/github/IS2350webdevelopment/reduxproject/reactproject-develop/ACCESS_REQUEST_README.md) for detailed documentation
- See [IMPLEMENTATION_SUMMARY.md](/Users/david/github/IS2350webdevelopment/IMPLEMENTATION_SUMMARY.md) for technical details

---

**Ready to use!** Start the backend and frontend, login, and begin managing access requests. 🚀
