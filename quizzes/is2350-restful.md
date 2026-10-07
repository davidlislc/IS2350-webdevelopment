# is2350-restful

**1. What core principle of RESTful architecture states that the server must store no client session context and that every HTTP request must contain all necessary information?**

- A) Resource-Based Routing
- B) Statelessness
- C) In-Memory Caching
- D) Server-Side Rendering

**2. According to RESTful API principles, how should web resources be identified in URLs?**

- A) Using action-based verb endpoints (e.g., /api/getStudents)
- B) Using clean, noun-based endpoints (e.g., /api/students)
- C) Using database query string parameters exclusively (e.g., /api?table=students)
- D) Using dynamic function handlers in the URL path

**3. Which HTTP verb distinction is drawn between PUT and PATCH when updating an existing resource?**

- A) PUT updates fields partially, while PATCH replaces the resource completely
- B) PUT replaces a resource completely, while PATCH updates fields partially
- C) PUT creates a new resource, while PATCH removes an existing resource
- D) PUT retrieves resource headers, while PATCH updates the resource asynchronously

**4. When a new resource is successfully created via a POST request in a RESTful API, what standard HTTP status code should be returned?**

- A) 200 OK
- B) 201 Created
- C) 204 No Content
- D) 400 Bad Request

**5. What expected HTTP status code and response body behavior occurs upon a successful DELETE operation in the provided To-Do REST API example?**

- A) 200 OK with the deleted JSON object
- B) 201 Created with an empty string
- C) 204 No Content with no response body
- D) 404 Not Found with an error message

**6. Which HTTP status code category represents backend runtime failures?**

- A) 2xx Success
- B) 3xx Redirection
- C) 4xx Client Error
- D) 5xx Server Error

**7. In the Express endpoint `GET /api/todos`, how are optional filtering parameters (like `?completed=true`) accessed in the request object?**

- A) req.params
- B) req.body
- C) req.query
- D) req.headers

**8. If a request is sent to `GET /api/todos/:id` with an ID that does not match any existing to-do item, what HTTP status code and response payload are returned by the handler?**

- A) 400 Bad Request with `{ error: 'Invalid ID format' }`
- B) 404 Not Found with `{ error: 'To-do item not found' }`
- C) 500 Internal Server Error with `{ error: 'Server exception' }`
- D) 200 OK with `null`

**9. What validation check causes the `POST /api/todos` endpoint to return a 400 Bad Request status code?**

- A) If the `completed` property is explicitly set to `false`
- B) If the `id` field is not supplied in the request body
- C) If `title` is missing, not a string, or resolves to an empty string when trimmed
- D) If the request body contains extra unknown properties

**10. When testing a POST or PATCH request in Postman that passes JSON data to an Express REST API, which Body type setting should be selected?**

- A) form-data
- B) x-www-form-urlencoded
- C) raw / JSON
- D) binary

