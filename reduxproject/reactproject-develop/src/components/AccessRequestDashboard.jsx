import { useState, useEffect } from 'react';
import '../styles/AccessRequestDashboard.css';
import { accessRequestService } from '../services/accessRequestService';

export default function AccessRequestDashboard({ userRole, userId, userEmail }) {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [sortBy, setSortBy] = useState('recent');

  // Form state
  const [formData, setFormData] = useState({
    useremail: '',
    request_type: '',
    request_detail: '',
  });

  const [approvalData, setApprovalData] = useState({
    approver_email: userEmail || '',
    note: '',
  });

  // Load requests on component mount
  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await accessRequestService.getRequests();
      setRequests(data.access_requests || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateRequest = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.useremail || !formData.request_type) {
      setError('Email and request type are required');
      return;
    }

    setLoading(true);
    try {
      await accessRequestService.createRequest(
        formData.useremail,
        formData.request_type,
        formData.request_detail
      );
      setSuccess('Access request created successfully!');
      setFormData({ useremail: '', request_type: '', request_detail: '' });
      setShowCreateForm(false);
      loadRequests();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (requestId) => {
    if (!window.confirm('Are you sure you want to approve this request?')) return;

    setError('');
    setSuccess('');
    setLoading(true);
    try {
      await accessRequestService.approveRequest(requestId, approvalData.approver_email);
      setSuccess('Request approved successfully!');
      loadRequests();
      setShowDetails(false);
      setSelectedRequest(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeny = async (requestId) => {
    if (!window.confirm('Are you sure you want to deny this request?')) return;

    setError('');
    setSuccess('');
    setLoading(true);
    try {
      await accessRequestService.denyRequest(
        requestId,
        approvalData.note,
        approvalData.approver_email
      );
      setSuccess('Request denied successfully!');
      loadRequests();
      setShowDetails(false);
      setSelectedRequest(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = async (request) => {
    setSelectedRequest(request);
    setShowDetails(true);
    setApprovalData({ approver_email: userEmail || '', note: '' });
  };

  const getFilteredRequests = () => {
    let filtered = requests;

    if (filterStatus !== 'ALL') {
      filtered = filtered.filter(r => r.status === filterStatus);
    }

    // Sort requests
    if (sortBy === 'recent') {
      filtered.sort((a, b) => new Date(b.request_time) - new Date(a.request_time));
    } else if (sortBy === 'oldest') {
      filtered.sort((a, b) => new Date(a.request_time) - new Date(b.request_time));
    } else if (sortBy === 'pending') {
      filtered = filtered.filter(r => r.status === 'PENDING');
      filtered.sort((a, b) => new Date(a.request_time) - new Date(b.request_time));
    }

    return filtered;
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'APPROVED':
        return 'badge bg-success';
      case 'DENIED':
        return 'badge bg-danger';
      case 'PENDING':
        return 'badge bg-warning';
      default:
        return 'badge bg-secondary';
    }
  };

  const filteredRequests = getFilteredRequests();

  return (
    <div className="access-request-dashboard">
      <div className="dashboard-header">
        <h2>Access Request Dashboard</h2>
        {userRole === 'admin' && (
          <span className="badge bg-info">Admin Mode</span>
        )}
      </div>

      {/* Messages */}
      {error && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          {error}
          <button
            type="button"
            className="btn-close"
            onClick={() => setError('')}
          ></button>
        </div>
      )}
      {success && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          {success}
          <button
            type="button"
            className="btn-close"
            onClick={() => setSuccess('')}
          ></button>
        </div>
      )}

      {/* Create Request Button */}
      <div className="action-bar">
        <button
          className="btn btn-primary"
          onClick={() => setShowCreateForm(!showCreateForm)}
        >
          {showCreateForm ? '✕ Cancel' : '+ New Request'}
        </button>
        <div className="filter-controls">
          <select
            className="form-select"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="ALL">All Statuses</option>
            <option value="PENDING">Pending</option>
            <option value="APPROVED">Approved</option>
            <option value="DENIED">Denied</option>
          </select>
          <select
            className="form-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="recent">Most Recent</option>
            <option value="oldest">Oldest First</option>
            {userRole === 'admin' && <option value="pending">Pending First</option>}
          </select>
        </div>
      </div>

      {/* Create Request Form */}
      {showCreateForm && (
        <div className="create-form-container">
          <form onSubmit={handleCreateRequest}>
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                className="form-control"
                value={formData.useremail}
                onChange={(e) =>
                  setFormData({ ...formData, useremail: e.target.value })
                }
                required
              />
            </div>
            <div className="form-group">
              <label>Request Type</label>
              <select
                className="form-control"
                value={formData.request_type}
                onChange={(e) =>
                  setFormData({ ...formData, request_type: e.target.value })
                }
                required
              >
                <option value="">Select a type</option>
                <option value="DATABASE_ACCESS">Database Access</option>
                <option value="FILE_SHARE">File Share Access</option>
                <option value="ADMIN_PRIVILEGES">Admin Privileges</option>
                <option value="API_KEY">API Key</option>
                <option value="OTHER">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label>Request Details</label>
              <textarea
                className="form-control"
                rows="4"
                value={formData.request_detail}
                onChange={(e) =>
                  setFormData({ ...formData, request_detail: e.target.value })
                }
                placeholder="Provide details about your access request..."
              ></textarea>
            </div>
            <button
              type="submit"
              className="btn btn-success"
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Submit Request'}
            </button>
          </form>
        </div>
      )}

      {/* Loading State */}
      {loading && !showCreateForm && (
        <div className="text-center my-4">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {/* Requests List */}
      {!loading && filteredRequests.length === 0 ? (
        <div className="empty-state">
          <p>No access requests found</p>
        </div>
      ) : (
        <div className="requests-container">
          {filteredRequests.map((request) => (
            <div key={request.id} className="request-card">
              <div className="request-header">
                <div className="request-title">
                  <h5>{request.request_type}</h5>
                  <span className={getStatusBadgeClass(request.status)}>
                    {request.status}
                  </span>
                </div>
                <small className="text-muted">
                  {new Date(request.request_time).toLocaleString()}
                </small>
              </div>

              <div className="request-body">
                <p>
                  <strong>Email:</strong> {request.useremail}
                </p>
                {request.request_detail && (
                  <p>
                    <strong>Details:</strong> {request.request_detail.substring(0, 100)}
                    {request.request_detail.length > 100 ? '...' : ''}
                  </p>
                )}
                {request.note && (
                  <p>
                    <strong>Note:</strong> {request.note}
                  </p>
                )}
              </div>

              <div className="request-actions">
                <button
                  className="btn btn-sm btn-info"
                  onClick={() => handleViewDetails(request)}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Details Modal */}
      {showDetails && selectedRequest && (
        <div className="modal-overlay" onClick={() => setShowDetails(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h5>Request Details</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setShowDetails(false)}
              ></button>
            </div>
            <div className="modal-body">
              <div className="detail-group">
                <label>Request ID:</label>
                <p>{selectedRequest.id}</p>
              </div>
              <div className="detail-group">
                <label>Email:</label>
                <p>{selectedRequest.useremail}</p>
              </div>
              <div className="detail-group">
                <label>Type:</label>
                <p>{selectedRequest.request_type}</p>
              </div>
              <div className="detail-group">
                <label>Status:</label>
                <p>
                  <span className={getStatusBadgeClass(selectedRequest.status)}>
                    {selectedRequest.status}
                  </span>
                </p>
              </div>
              <div className="detail-group">
                <label>Request Time:</label>
                <p>{new Date(selectedRequest.request_time).toLocaleString()}</p>
              </div>
              <div className="detail-group">
                <label>Details:</label>
                <p>{selectedRequest.request_detail || 'No details provided'}</p>
              </div>
              {selectedRequest.note && (
                <div className="detail-group">
                  <label>Note:</label>
                  <p>{selectedRequest.note}</p>
                </div>
              )}

              {/* Admin Actions */}
              {userRole === 'admin' && selectedRequest.status === 'PENDING' && (
                <div className="admin-actions">
                  <div className="form-group">
                    <label>Approver Email</label>
                    <input
                      type="email"
                      className="form-control"
                      value={approvalData.approver_email}
                      onChange={(e) =>
                        setApprovalData({
                          ...approvalData,
                          approver_email: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Denial Note (if denying)</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      value={approvalData.note}
                      onChange={(e) =>
                        setApprovalData({
                          ...approvalData,
                          note: e.target.value,
                        })
                      }
                      placeholder="Provide reason if denying..."
                    ></textarea>
                  </div>
                  <div className="admin-button-group">
                    <button
                      className="btn btn-success"
                      onClick={() => handleApprove(selectedRequest.id)}
                      disabled={loading}
                    >
                      ✓ Approve
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDeny(selectedRequest.id)}
                      disabled={loading}
                    >
                      ✕ Deny
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
