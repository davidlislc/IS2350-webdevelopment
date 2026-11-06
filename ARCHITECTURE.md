# Access Request System - Architecture & Data Flow

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     USER'S BROWSER                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │            React Application (localhost:5173)            │  │
│  │                                                          │  │
│  │  ┌────────────────────────────────────────────────────┐ │  │
│  │  │         AccessRequestDashboard Component            │ │  │
│  │  │  ┌──────────────────────────────────────────────┐  │ │  │
│  │  │  │ Create Form                                  │  │ │  │
│  │  │  │ - Email                                      │  │ │  │
│  │  │  │ - Request Type                              │  │ │  │
│  │  │  │ - Details                                   │  │ │  │
│  │  │  └──────────────────────────────────────────────┘  │ │  │
│  │  │                                                     │ │  │
│  │  │  ┌──────────────────────────────────────────────┐  │ │  │
│  │  │  │ Request List View                            │  │ │  │
│  │  │  │ - Filter by Status                          │  │ │  │
│  │  │  │ - Sort by Date                              │  │ │  │
│  │  │  │ - Status Badges (PENDING/APPROVED/DENIED)  │  │ │  │
│  │  │  └──────────────────────────────────────────────┘  │ │  │
│  │  │                                                     │ │  │
│  │  │  ┌──────────────────────────────────────────────┐  │ │  │
│  │  │  │ Details Modal                                │  │ │  │
│  │  │  │ - Full Request Info                         │  │ │  │
│  │  │  │ - Admin: Approve/Deny Options              │  │ │  │
│  │  │  └──────────────────────────────────────────────┘  │ │  │
│  │  │                                                     │ │  │
│  │  │  ┌──────────────────────────────────────────────┐  │ │  │
│  │  │  │ accessRequestService (API Calls)             │  │ │  │
│  │  │  │ - HTTP Requests with JWT Token             │  │ │  │
│  │  │  │ - Error Handling                            │  │ │  │
│  │  │  └──────────────────────────────────────────────┘  │ │  │
│  │  └────────────────────────────────────────────────────┘ │  │
│  └──────────────────────────────────────────────────────────┘  │
│                              │                                  │
│                              ▼                                  │
│                     HTTP Requests + JWT Token                   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│           Express.js Server (localhost:8080)                    │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              API Routes (jwt-mysql.js)                   │  │
│  │                                                          │  │
│  │  POST   /api/access-request              [CREATE]       │  │
│  │  GET    /api/access-requests             [READ ALL]     │  │
│  │  GET    /api/access-request/:id          [READ ONE]     │  │
│  │  POST   /api/access-request/:id/approve  [APPROVE]      │  │
│  │  POST   /api/access-request/:id/deny     [DENY]         │  │
│  │  GET    /api/access-requests/pending     [PENDING LIST] │  │
│  │  GET    /api/request-process/:id         [HISTORY]      │  │
│  │  GET    /api/access-requests/history/:id [USER HISTORY] │  │
│  │                                                          │  │
│  │  ┌──────────────────────────────────────────────────┐  │  │
│  │  │ Middleware                                       │  │  │
│  │  │ - JWT Verification (authenticateJWT)           │  │  │
│  │  │ - Role-Based Access Control                    │  │  │
│  │  │ - CORS                                         │  │  │
│  │  │ - Error Handling                               │  │  │
│  │  └──────────────────────────────────────────────────┘  │  │
│  │                                                          │  │
│  │  ┌──────────────────────────────────────────────────┐  │  │
│  │  │ Database Queries                                 │  │  │
│  │  │ - MySQL Connection Pool                         │  │  │
│  │  │ - Parameterized SQL Queries                     │  │  │
│  │  │ - Transaction Handling                          │  │  │
│  │  └──────────────────────────────────────────────────┘  │  │
│  │                                                          │  │
│  └──────────────────────────────────────────────────────────┘  │
│                              │                                  │
│                              ▼                                  │
│                    SQL Queries + Results                        │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│              MySQL Database (Docker Container)                  │
│                                                                 │
│  Database: my_database                                          │
│                                                                 │
│  ┌────────────────────────────────────────────────────────┐   │
│  │ users Table                                            │   │
│  │ ┌──────┬──────────┬─────────┬──────────┬───────────┐  │   │
│  │ │ id   │ fullname │ username│ password │ role      │  │   │
│  │ ├──────┼──────────┼─────────┼──────────┼───────────┤  │   │
│  │ │ 1    │John Doe │ user1   │***       │ USER      │  │   │
│  │ │ 2    │Admin    │ admin   │***       │ ADMIN     │  │   │
│  │ └──────┴──────────┴─────────┴──────────┴───────────┘  │   │
│  │                                                        │   │
│  │ ┌────────────────────────────────────────────────────┐  │   │
│  │ │ access_request Table                               │   │   │
│  │ │ ┌──────┬────────┬──────────┬──────────┬─────────┐  │   │   │
│  │ │ │ id   │ userid │ useremail│ req_type │ status  │  │   │   │
│  │ │ ├──────┼────────┼──────────┼──────────┼─────────┤  │   │   │
│  │ │ │ 1    │ 1      │ user...  │ DATABASE │ PENDING │  │   │   │
│  │ │ │ 2    │ 1      │ user...  │ API_KEY  │APPROVED │  │   │   │
│  │ │ └──────┴────────┴──────────┴──────────┴─────────┘  │   │   │
│  │ │                                                     │   │   │
│  │ │ ┌────────────────────────────────────────────────┐  │   │   │
│  │ │ │ request_process Table                          │   │   │   │
│  │ │ │ ┌────────────────┬─────────┬────────────────┐  │   │   │   │
│  │ │ │ │access_req_id   │isApproved│approver_email │  │   │   │   │
│  │ │ │ ├────────────────┼─────────┼────────────────┤  │   │   │   │
│  │ │ │ │ 2              │ true    │ admin@...      │  │   │   │   │
│  │ │ │ └────────────────┴─────────┴────────────────┘  │   │   │   │
│  │ │                                                     │   │   │   │
│  │ └────────────────────────────────────────────────────┘  │   │   │
│  │                                                        │   │
│  └────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Data Flow - Create Request

```
User Clicks "New Request" Button
           │
           ▼
   Form Input Fields Shown
   - Email
   - Type
   - Details
           │
           ▼
   User Fills Form & Submits
           │
           ▼
   handleCreateRequest() function called
           │
           ▼
   accessRequestService.createRequest()
           │
           ▼
   POST /api/access-request
   + Headers: Authorization: Bearer <JWT_TOKEN>
   + Body: { useremail, request_type, request_detail }
           │
           ▼
   Backend: authenticateJWT middleware
   - Verify token
   - Extract user info
           │
           ▼
   Backend: Create handler
   - Validate input
   - Insert into access_request table
   - Set status to PENDING
   - Return access_request_id
           │
           ▼
   Response: { message, access_request_id }
           │
           ▼
   Frontend: Show success message
   - Clear form
   - Close form dialog
   - Refresh request list
           │
           ▼
   Request Card Appears in List
   with PENDING status badge
```

## Data Flow - Approve Request (Admin)

```
Admin Views Pending Request
           │
           ▼
   Clicks "View Details" Button
           │
           ▼
   Modal Opens with Request Info
   Admin Sees "✓ Approve" Button
           │
           ▼
   Admin Clicks Approve
   Confirmation Dialog Shown
           │
           ▼
   Admin Confirms
           │
           ▼
   handleApprove() called
           │
           ▼
   POST /api/access-request/:id/approve
   + Headers: Authorization: Bearer <JWT_TOKEN>
   + Body: { approver_email }
           │
           ▼
   Backend: authenticateJWT middleware
   - Verify token
           │
           ▼
   Backend: Check admin role
   - if user.role !== 'admin' → 403 Error
           │
           ▼
   Backend: Two-Step Process
   ┌─────────────────────────────────────────┐
   │ Step 1: Update access_request table     │
   │ - WHERE id = :id                        │
   │ - SET status = 'APPROVED'               │
   └─────────────────────────────────────────┘
               │
               ▼
   ┌─────────────────────────────────────────┐
   │ Step 2: Insert into request_process     │
   │ - access_request_id = :id               │
   │ - isApproved = true                     │
   │ - approver_id = admin.id                │
   │ - approver_email = admin.email          │
   │ - decidsion_time = NOW()                │
   └─────────────────────────────────────────┘
           │
           ▼
   Response: { message, request_process_id }
           │
           ▼
   Frontend: Show success message
   - Close modal
   - Refresh request list
           │
           ▼
   Request Card Status Changes to APPROVED
   with green badge
```

## Database Relationships

```
users (1)
   │
   ├──── (many) access_request
   │           - userid (FK)
   │           - useremail
   │           - request_type
   │           - request_detail
   │           - request_time
   │           - status
   │           - note
   │           │
   │           └──── (1) request_process
   │                   - access_request_id (FK, UNIQUE)
   │                   - isApproved
   │                   - approver_id (FK, nullable)
   │                   - approver_email
   │                   - decidsion_time
   │
   └──── (many) request_process
           (approvers)
           - approver_id (FK)
           - approver_email
```

## Component State Management

```
AccessRequestDashboard Component
│
├── State
│   ├── requests: []                  # All access requests
│   ├── loading: false                # Loading state
│   ├── error: ''                     # Error messages
│   ├── success: ''                   # Success messages
│   ├── showCreateForm: false         # Show/hide create form
│   ├── selectedRequest: null         # Selected request for details
│   ├── showDetails: false            # Show/hide details modal
│   ├── filterStatus: 'ALL'           # Filter: ALL/PENDING/APPROVED/DENIED
│   ├── sortBy: 'recent'              # Sort: recent/oldest/pending
│   ├── formData: {                   # Create form data
│   │   useremail: '',
│   │   request_type: '',
│   │   request_detail: ''
│   │ }
│   └── approvalData: {               # Approval form data
│       approver_email: '',
│       note: ''
│     }
│
├── Effects
│   └── useEffect(() => { loadRequests() }, [])
│       # Load requests on component mount
│
├── Handlers
│   ├── loadRequests()                # Fetch all requests
│   ├── handleCreateRequest(e)        # Submit new request
│   ├── handleApprove(requestId)      # Approve request (admin)
│   ├── handleDeny(requestId)         # Deny request (admin)
│   ├── handleViewDetails(request)    # Show details modal
│   ├── getFilteredRequests()         # Filter and sort requests
│   └── getStatusBadgeClass(status)   # Get CSS class for badge
│
└── Render
    ├── Dashboard Header
    │   ├── Title
    │   └── Admin Badge (if admin)
    │
    ├── Alerts
    │   ├── Error Alert (dismissible)
    │   └── Success Alert (dismissible)
    │
    ├── Action Bar
    │   ├── Create Button
    │   ├── Status Filter Dropdown
    │   └── Sort Dropdown
    │
    ├── Create Form (if showCreateForm)
    │   ├── Email Input
    │   ├── Type Dropdown
    │   ├── Details Textarea
    │   └── Submit Button
    │
    ├── Loading Spinner (if loading)
    │
    ├── Empty State (if no requests)
    │
    ├── Request Cards (grid layout)
    │   └── For each request:
    │       ├── Header (type + status badge + timestamp)
    │       ├── Body (email + details + note)
    │       └── Actions (View Details button)
    │
    └── Details Modal (if showDetails)
        ├── Request Information
        ├── Status Badge
        ├── Timestamps
        ├── Admin Actions (if admin & status === PENDING)
        │   ├── Approver Email Input
        │   ├── Denial Note Textarea
        │   ├── Approve Button
        │   └── Deny Button
        └── Close Button
```

## Authentication Flow

```
1. User Enters Credentials
   username + password
           │
           ▼
2. POST /login
           │
           ▼
3. Backend Validates
   - Find user in users table
   - Check password
           │
           ▼
4. Generate JWT Token
   - Payload: { id, username, role }
   - Secret: JWT_SECRET
   - Expiry: 1 hour
           │
           ▼
5. Return Token to Frontend
           │
           ▼
6. Frontend Stores in localStorage
   localStorage.setItem('token', token)
           │
           ▼
7. All Future Requests Include Token
   Authorization: Bearer <token>
           │
           ▼
8. Backend authenticateJWT Middleware
   - Extract token from Authorization header
   - Verify signature using JWT_SECRET
   - Decode payload
   - Attach user info to request
   - Allow or deny based on role
```

## Request Status Lifecycle

```
PENDING → APPROVED
         └────→ DENIED

Legend:
- PENDING (Yellow): Waiting for admin approval/denial
- APPROVED (Green): Access granted
- DENIED (Red): Access denied, reason in note field

Action Flow:
1. User creates request → Status: PENDING
2. Admin reviews → Choose one:
   a) Admin approves → Status: APPROVED + entry in request_process
   b) Admin denies → Status: DENIED + note + entry in request_process
3. Request cannot change status after approved/denied
```

## Error Handling Flow

```
API Request Fails
        │
        ▼
Backend Returns Error
- Status: 4xx or 5xx
- Body: { message, error }
        │
        ▼
Frontend Catch Block
        │
        ▼
Set Error State
error = err.message
        │
        ▼
Show Error Alert
- Red background
- Error message
- Dismissible button
        │
        ▼
User Sees Error & Can Try Again
```

## Security Layers

```
1. Frontend
   - Store token in localStorage
   - Include in Authorization header
   - Verify user role before showing admin features

2. HTTP
   - CORS: Only allow localhost:3000
   - HTTPS in production

3. Backend
   - JWT verification middleware
   - Role-based access control
   - Input validation
   - Parameterized SQL queries (SQL injection prevention)
   - Error message sanitization

4. Database
   - Foreign key constraints
   - Cascade delete for data integrity
   - Hashed passwords (password field)
```

## Performance Considerations

```
Current Implementation:
- Load all requests on page load
- Filter/sort client-side (instant)
- No pagination

Optimization Opportunities:
- Add pagination (limit 10-20 per page)
- Server-side filtering for large datasets
- Lazy loading of request details
- Caching with stale-while-revalidate
- Debounce filter/sort inputs
```

---

This architecture ensures secure, scalable, and maintainable access request management system.
