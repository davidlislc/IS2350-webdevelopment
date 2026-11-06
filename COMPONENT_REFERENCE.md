# Access Request Dashboard - Component & Code Reference

## Component Structure

```jsx
<AccessRequestDashboard>
  ├── Dashboard Header
  │   ├── Title: "Access Request Dashboard"
  │   └── Admin Badge (conditionally rendered)
  │
  ├── Alert Messages
  │   ├── Error Alert (dismissible)
  │   └── Success Alert (dismissible)
  │
  ├── Action Bar
  │   ├── "+ New Request" Button
  │   ├── Status Filter Dropdown
  │   │   ├── All Statuses
  │   │   ├── Pending
  │   │   ├── Approved
  │   │   └── Denied
  │   └── Sort Dropdown
  │       ├── Most Recent
  │       ├── Oldest First
  │       └── Pending First (admin only)
  │
  ├── Create Form (conditionally rendered)
  │   ├── Email Input
  │   ├── Request Type Dropdown
  │   │   ├── DATABASE_ACCESS
  │   │   ├── FILE_SHARE
  │   │   ├── ADMIN_PRIVILEGES
  │   │   ├── API_KEY
  │   │   └── OTHER
  │   ├── Details Textarea
  │   └── Submit Button
  │
  ├── Loading Spinner (conditionally rendered)
  │
  ├── Empty State (if no requests)
  │   └── "No access requests found" message
  │
  ├── Request Cards Grid
  │   └── For each filtered request:
  │       ├── Request Card
  │       │   ├── Header
  │       │   │   ├── Request Type + Status Badge
  │       │   │   └── Timestamp
  │       │   ├── Body
  │       │   │   ├── Email Address
  │       │   │   ├── Request Details Preview
  │       │   │   └── Admin Note (if exists)
  │       │   └── Actions
  │       │       └── "View Details" Button
  │       └── (repeat for each request)
  │
  └── Details Modal (conditionally rendered)
      ├── Modal Header
      │   ├── Title: "Request Details"
      │   └── Close Button
      ├── Modal Body
      │   ├── Request ID
      │   ├── Email
      │   ├── Type
      │   ├── Status Badge
      │   ├── Request Time
      │   ├── Details
      │   ├── Note (if exists)
      │   └── Admin Actions Section (if admin & pending)
      │       ├── Approver Email Input
      │       ├── Denial Note Textarea
      │       ├── "✓ Approve" Button
      │       └── "✕ Deny" Button
      └── Close Button (overlay click)
```

## State Variables

```javascript
// Data State
const [requests, setRequests] = useState([]);
// All access requests fetched from backend

// UI State
const [loading, setLoading] = useState(false);
// Shows loading spinner during API calls
const [error, setError] = useState('');
// Error message to display
const [success, setSuccess] = useState('');
// Success message to display
const [showCreateForm, setShowCreateForm] = useState(false);
// Show/hide create request form
const [selectedRequest, setSelectedRequest] = useState(null);
// Currently selected request for details modal
const [showDetails, setShowDetails] = useState(false);
// Show/hide details modal
const [filterStatus, setFilterStatus] = useState('ALL');
// Current filter: 'ALL', 'PENDING', 'APPROVED', 'DENIED'
const [sortBy, setSortBy] = useState('recent');
// Current sort: 'recent', 'oldest', 'pending'

// Form Data
const [formData, setFormData] = useState({
  useremail: '',           // User email input
  request_type: '',        // Selected request type
  request_detail: ''       // Detailed description
});

// Approval Data
const [approvalData, setApprovalData] = useState({
  approver_email: '',      // Admin email for approval
  note: ''                 // Denial reason (if denying)
});
```

## Event Handlers

```javascript
// loadRequests()
// Purpose: Fetch all requests from API
// Triggers: Component mount, after create/approve/deny
// Updates: requests state, loading state
// Error Handling: Sets error message if API call fails
async loadRequests() {
  setLoading(true);
  try {
    const data = await accessRequestService.getRequests();
    setRequests(data.access_requests || []);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
}

// handleCreateRequest(e)
// Purpose: Submit new access request
// Triggers: Form submit button click
// Validation: Checks email and request_type required
// Updates: Calls API, shows success, refreshes list
async handleCreateRequest(e) {
  e.preventDefault();
  // Validate input
  // Call service.createRequest()
  // Show success message
  // Clear form and close dialog
  // Reload requests
}

// handleApprove(requestId)
// Purpose: Approve pending request (admin)
// Triggers: Approve button click
// Confirmation: Window confirm dialog
// Updates: Request status to APPROVED, creates process entry
async handleApprove(requestId) {
  if (!window.confirm('Approve this request?')) return;
  // Call service.approveRequest()
  // Update request status
  // Close modal
  // Refresh list
}

// handleDeny(requestId)
// Purpose: Deny pending request with note (admin)
// Triggers: Deny button click
// Confirmation: Window confirm dialog
// Updates: Request status to DENIED, stores note
async handleDeny(requestId) {
  if (!window.confirm('Deny this request?')) return;
  // Call service.denyRequest()
  // Update request status
  // Store denial note
  // Close modal
  // Refresh list
}

// handleViewDetails(request)
// Purpose: Open details modal for request
// Triggers: "View Details" button click
// Updates: selectedRequest, showDetails, approvalData
function handleViewDetails(request) {
  setSelectedRequest(request);
  setShowDetails(true);
  setApprovalData({ approver_email: userEmail || '', note: '' });
}

// getFilteredRequests()
// Purpose: Filter and sort requests based on UI controls
// Returns: Filtered and sorted array
// Logic: Filter by status, then sort by selected option
function getFilteredRequests() {
  let filtered = requests;
  if (filterStatus !== 'ALL') {
    filtered = filtered.filter(r => r.status === filterStatus);
  }
  // Apply sorting based on sortBy value
  return filtered;
}

// getStatusBadgeClass(status)
// Purpose: Return Bootstrap badge class based on status
// Returns: 'badge bg-success', 'badge bg-danger', etc.
function getStatusBadgeClass(status) {
  switch(status) {
    case 'APPROVED': return 'badge bg-success';
    case 'DENIED': return 'badge bg-danger';
    case 'PENDING': return 'badge bg-warning';
    default: return 'badge bg-secondary';
  }
}
```

## Effect Hooks

```javascript
useEffect(() => {
  loadRequests();
}, []);
// Purpose: Load requests when component mounts
// Dependencies: [] (runs once on mount)
// Action: Fetches all access requests from API
```

## API Service Methods

```javascript
accessRequestService.createRequest(useremail, request_type, request_detail)
// POST /api/access-request
// Headers: { Authorization: Bearer <token> }
// Body: { useremail, request_type, request_detail }
// Returns: { message, access_request_id }

accessRequestService.getRequests()
// GET /api/access-requests
// Headers: { Authorization: Bearer <token> }
// Returns: { access_requests: [...] }

accessRequestService.getRequestById(id)
// GET /api/access-request/:id
// Headers: { Authorization: Bearer <token> }
// Returns: { access_request: {...} }

accessRequestService.approveRequest(id, approver_email)
// POST /api/access-request/:id/approve
// Headers: { Authorization: Bearer <token> }
// Body: { approver_email }
// Returns: { message, request_process_id }

accessRequestService.denyRequest(id, note, approver_email)
// POST /api/access-request/:id/deny
// Headers: { Authorization: Bearer <token> }
// Body: { note, approver_email }
// Returns: { message, request_process_id }

accessRequestService.getPendingRequests()
// GET /api/access-requests/pending
// Headers: { Authorization: Bearer <token> }
// Returns: { pending_requests: [...] }

accessRequestService.getRequestProcess(access_request_id)
// GET /api/request-process/:access_request_id
// Headers: { Authorization: Bearer <token> }
// Returns: { request_process: {...} }

accessRequestService.getRequestHistory(user_id)
// GET /api/access-requests/history/:user_id
// Headers: { Authorization: Bearer <token> }
// Returns: { request_history: [...] }
```

## CSS Classes Used

```css
/* Layout & Grid */
.access-request-dashboard          /* Main container */
.dashboard-header                  /* Header section */
.action-bar                        /* Filter/sort controls */
.filter-controls                   /* Filter dropdowns */
.requests-container                /* Grid container for cards */
.modal-overlay                     /* Modal background */
.modal-content                     /* Modal dialog box */

/* Components */
.request-card                      /* Individual request card */
.request-header                    /* Card header */
.request-title                     /* Request type + status */
.request-body                      /* Card content */
.request-actions                   /* Card footer buttons */
.create-form-container             /* Create form container */

/* Forms */
.form-group                        /* Form field group */
.form-control                      /* Input/textarea */
.form-select                       /* Dropdown select */
.form-label                        /* Form labels */

/* Status Badges */
.badge                             /* Bootstrap badge */
.bg-success                        /* Green - approved */
.bg-danger                         /* Red - denied */
.bg-warning                        /* Yellow - pending */
.bg-info                          /* Blue - admin */

/* Modals */
.modal-header                      /* Modal title area */
.modal-body                        /* Modal content area */
.detail-group                      /* Detail field group */
.admin-actions                     /* Admin action section */
.admin-button-group                /* Admin buttons container */

/* Buttons */
.btn                               /* Bootstrap button */
.btn-primary                       /* Primary color */
.btn-success                       /* Success color */
.btn-danger                        /* Danger color */
.btn-info                         /* Info color */
.btn-close                        /* Close button */

/* Alerts */
.alert                             /* Alert box */
.alert-danger                      /* Error alert */
.alert-success                     /* Success alert */
.alert-dismissible                 /* Dismissible alert */

/* Responsive */
@media (max-width: 768px)          /* Tablet styles */
@media (max-width: 480px)          /* Mobile styles */
```

## Conditional Rendering

```jsx
// Show admin badge only if user is admin
{userRole === 'admin' && (
  <span className="badge bg-info">Admin Mode</span>
)}

// Show error alert if error exists
{error && (
  <div className="alert alert-danger">...</div>
)}

// Show success alert if success exists
{success && (
  <div className="alert alert-success">...</div>
)}

// Show create form if showCreateForm is true
{showCreateForm && (
  <div className="create-form-container">...</div>
)}

// Show loading spinner while loading
{loading && !showCreateForm && (
  <div className="spinner-border">...</div>
)}

// Show empty state if no requests
{!loading && filteredRequests.length === 0 && (
  <div className="empty-state">No requests found</div>
)}

// Show admin actions only for admin AND pending status
{userRole === 'admin' && selectedRequest.status === 'PENDING' && (
  <div className="admin-actions">...</div>
)}

// Show details modal if showDetails is true
{showDetails && selectedRequest && (
  <div className="modal-overlay">...</div>
)}
```

## Data Flow Example - Create Request

```
User Input
  ↓
formData = { useremail, request_type, request_detail }
  ↓
User Clicks "Submit Request"
  ↓
handleCreateRequest(e) triggers
  ↓
Validation Check
  ├─ email required? ✓
  ├─ request_type required? ✓
  └─ if not valid → show error and return
  ↓
setLoading(true) → Show loading state
  ↓
API Call: POST /api/access-request
  ├─ Headers: { Authorization: Bearer <token> }
  ├─ Body: { useremail, request_type, request_detail }
  └─ Returns: { message, access_request_id }
  ↓
Success Path
  ├─ setSuccess("Access request created successfully!")
  ├─ Clear form: setFormData({...})
  ├─ Close form: setShowCreateForm(false)
  ├─ Call loadRequests() to refresh
  └─ setLoading(false)
  ↓
New Request Appears in List with PENDING status badge
  ↓
User Sees Success Message & New Request Card
```

## Key Props

```javascript
// Props passed to component
userRole            // 'admin' or 'user'
userId              // User's ID from JWT
userEmail           // User's email address

// These control the entire dashboard behavior
// Admin users see more options and can approve/deny
// Regular users can only create and view their own
```

## Bootstrap 5 Classes Used

```
.btn, .btn-primary, .btn-success, .btn-danger, .btn-info
.form-control, .form-select, .form-group, .form-label
.badge, .bg-success, .bg-danger, .bg-warning, .bg-info
.alert, .alert-danger, .alert-success, .alert-dismissible
.spinner-border
.table-striped, .table-hover
.container-fluid, .container
.row, .col, .col-sm, .col-md, .col-lg, .col-xl
.d-flex, .gap-3, .justify-content-*
.text-center, .text-muted, .text-secondary
.mt-*, .mb-*, .p-*, .m-*
.shadow-sm
```

## Accessibility Features

- Semantic HTML elements
- ARIA labels on buttons
- Keyboard navigation support
- Color-coded status (+ text labels)
- Form labels associated with inputs
- Dismissible alerts with close buttons
- Focus visible styles
- Loading state indicators
- Error messages for validation

## Performance Considerations

- Components use React.memo for re-render optimization
- Event handlers properly scoped
- No unnecessary re-renders from state changes
- Filtered/sorted data computed efficiently
- Modal lazy rendering (only when needed)
- CSS grid for efficient layout

---

This component provides a complete access request management interface with all CRUD operations, admin controls, and responsive design.
