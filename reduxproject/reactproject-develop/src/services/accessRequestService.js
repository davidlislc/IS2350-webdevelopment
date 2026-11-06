const API_BASE_URL = 'http://localhost:8080/api';

const getAuthHeaders = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem('token')}`,
});

export const accessRequestService = {
  // Create a new access request
  createRequest: async (useremail, request_type, request_detail) => {
    const response = await fetch(`${API_BASE_URL}/access-request`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ useremail, request_type, request_detail }),
    });
    if (!response.ok) throw new Error('Failed to create access request');
    return response.json();
  },

  // Get all access requests
  getRequests: async () => {
    const response = await fetch(`${API_BASE_URL}/access-requests`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch access requests');
    return response.json();
  },

  // Get a specific access request
  getRequestById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/access-request/${id}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch access request');
    return response.json();
  },

  // Approve an access request
  approveRequest: async (id, approver_email) => {
    const response = await fetch(`${API_BASE_URL}/access-request/${id}/approve`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ approver_email }),
    });
    if (!response.ok) throw new Error('Failed to approve access request');
    return response.json();
  },

  // Deny an access request
  denyRequest: async (id, note, approver_email) => {
    const response = await fetch(`${API_BASE_URL}/access-request/${id}/deny`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ note, approver_email }),
    });
    if (!response.ok) throw new Error('Failed to deny access request');
    return response.json();
  },

  // Get pending requests (admin only)
  getPendingRequests: async () => {
    const response = await fetch(`${API_BASE_URL}/access-requests/pending`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch pending requests');
    return response.json();
  },

  // Get request process information
  getRequestProcess: async (access_request_id) => {
    const response = await fetch(`${API_BASE_URL}/request-process/${access_request_id}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch request process');
    return response.json();
  },

  // Get request history for a user (admin only)
  getRequestHistory: async (user_id) => {
    const response = await fetch(`${API_BASE_URL}/access-requests/history/${user_id}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch request history');
    return response.json();
  },
};
