# Access Request Dashboard - Complete System

This is a full-stack access request management system with JWT authentication, React frontend, and Node.js/MySQL backend.

## Features

### User Features
- **Create Access Requests**: Submit new access requests with email, type, and details
- **View Requests**: See all your submitted requests
- **Track Status**: Monitor approval status (PENDING, APPROVED, DENIED)
- **View Details**: Click to see full details of any request

### Admin Features
- **All User Features** plus:
- **View All Requests**: See requests from all users
- **Approve Requests**: Approve pending requests with approver email
- **Deny Requests**: Deny requests with optional notes
- **Filter & Sort**: Filter by status and sort by date or priority
- **Request History**: View complete request history for any user

## Tech Stack

### Backend
- **Node.js** with Express.js
- **MySQL** Database
- **JWT** Authentication
- **CORS** Support

### Frontend
- **React** 18+ with Hooks
- **Bootstrap 5** for styling
- **CSS3** with responsive design

## Project Structure

```
reduxproject/reactproject-develop/
├── src/
│   ├── components/
│   │   └── AccessRequestDashboard.jsx    # Main dashboard component
│   ├── services/
│   │   └── accessRequestService.js       # API service calls
│   ├── styles/
│   │   └── AccessRequestDashboard.css    # Component styling
│   ├── App.jsx                           # Main app with auth
│   └── main.jsx
```

## Database Schema

### access_request Table
```sql
CREATE TABLE access_request (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userid INT NOT NULL,
    useremail VARCHAR(100) NOT NULL,
    request_type VARCHAR(50) NOT NULL,
    request_detail TEXT,
    request_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) DEFAULT 'PENDING',
    note TEXT,
    FOREIGN KEY (userid) REFERENCES users(id)
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
    FOREIGN KEY (access_request_id) REFERENCES access_request(id),
    FOREIGN KEY (approver_id) REFERENCES users(id)
);
```

## API Endpoints

### Create Request
```
POST /api/access-request
Headers: Authorization: Bearer <token>
Body: {
  "useremail": "user@example.com",
  "request_type": "DATABASE_ACCESS",
  "request_detail": "Need access to customer database"
}
Response: { "message": "...", "access_request_id": 1 }
```

### Get All Requests
```
GET /api/access-requests
Headers: Authorization: Bearer <token>
Response: { "access_requests": [...] }
```

### Get Specific Request
```
GET /api/access-request/:id
Headers: Authorization: Bearer <token>
Response: { "access_request": {...} }
```

### Approve Request (Admin)
```
POST /api/access-request/:id/approve
Headers: Authorization: Bearer <token>
Body: { "approver_email": "admin@example.com" }
Response: { "message": "...", "request_process_id": 1 }
```

### Deny Request (Admin)
```
POST /api/access-request/:id/deny
Headers: Authorization: Bearer <token>
Body: {
  "note": "Reason for denial",
  "approver_email": "admin@example.com"
}
Response: { "message": "...", "request_process_id": 1 }
```

### Get Pending Requests (Admin)
```
GET /api/access-requests/pending
Headers: Authorization: Bearer <token>
Response: { "pending_requests": [...] }
```

### Get Request History (Admin)
```
GET /api/access-requests/history/:user_id
Headers: Authorization: Bearer <token>
Response: { "request_history": [...] }
```

### Get Request Process Info
```
GET /api/request-process/:access_request_id
Headers: Authorization: Bearer <token>
Response: { "request_process": {...} }
```

## Installation & Setup

### Backend Setup
```bash
cd jwt/
npm install
docker-compose up -d  # Start MySQL
node jwt-mysql.js     # Start server on port 8080
```

### Frontend Setup
```bash
cd reduxproject/reactproject-develop/
npm install
npm run dev           # Start dev server on port 5173
```

### Login Credentials
- **Regular User**: username: `user1`, password: `password1`
- **Admin User**: username: `admin`, password: `password1`

## Component Usage

```jsx
import AccessRequestDashboard from './components/AccessRequestDashboard'

<AccessRequestDashboard 
  userRole="admin"           // 'admin' or 'user'
  userId={1}                 // User ID from JWT
  userEmail="user@example.com" // User email
/>
```

## Features Breakdown

### Create Request Form
- Email validation
- Predefined request types (DATABASE_ACCESS, FILE_SHARE, ADMIN_PRIVILEGES, API_KEY, OTHER)
- Optional detailed description
- Real-time form submission with loading state

### Request Cards
- Color-coded status badges
- Quick preview of request details
- Timestamp display
- View details button for full information

### Modal Details View
- Complete request information
- Full request details and notes
- Admin approval/denial interface (if applicable)
- Confirmation dialogs for destructive actions

### Filtering & Sorting
- Filter by status (All, Pending, Approved, Denied)
- Sort by date (Most Recent, Oldest First)
- Admin-only "Pending First" sort option
- Live update when filters change

### Admin Dashboard
- All pending requests clearly marked
- Bulk action capabilities
- Request history tracking
- Approval/denial notes for audit trail

## Error Handling

- Network error messages
- Form validation errors
- API error responses
- Loading states for better UX
- Dismissible alert messages

## Security Features

- JWT token-based authentication
- Authorization checks on backend
- Admin-only endpoint protection
- SQL injection prevention (parameterized queries)
- CORS configuration
- Token stored in localStorage (consider using secure cookies for production)

## Future Enhancements

- [ ] Pagination for large request lists
- [ ] Advanced search and filtering
- [ ] Email notifications for approvals/denials
- [ ] Request templates
- [ ] Bulk operations for admins
- [ ] Request comments/discussion thread
- [ ] Analytics and reporting dashboard
- [ ] Role-based request type restrictions
- [ ] SLA tracking for approvals
- [ ] Audit logs for all actions

## Troubleshooting

### Backend Connection Issues
- Ensure MySQL is running: `docker-compose ps`
- Check backend is running on port 8080
- Verify CORS origin in jwt-mysql.js matches frontend URL

### Authentication Issues
- Check token in browser localStorage
- Verify token format: `Bearer <token>`
- Test with correct credentials: user1/password1

### Database Issues
- Ensure tables are created: Run init.sql
- Check user permissions in MySQL
- Verify database name: `my_database`

## License

This project is open source and available under the MIT License.
