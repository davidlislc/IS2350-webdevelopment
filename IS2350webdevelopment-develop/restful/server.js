const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse incoming JSON request bodies
app.use(express.json());

// In-memory data store
let todos = [
  { id: 1, title: 'Learn Node.js REST APIs', completed: true },
  { id: 2, title: 'Build a To-Do backend', completed: false }
];
let nextId = 3;

// Welcome route at the root path
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the To-Do REST API!',
    endpoints: {
      getAllTodos: 'GET /api/todos',
      getSingleTodo: 'GET /api/todos/:id',
      createTodo: 'POST /api/todos',
      updateTodo: 'PATCH /api/todos/:id',
      deleteTodo: 'DELETE /api/todos/:id'
    }
  });
});
// ====================================================================
// RESTful Endpoints
// ====================================================================

// 1. GET /api/todos - Retrieve all to-dos (with optional ?completed=true/false filter)
app.get('/api/todos', (req, res) => {
  const { completed } = req.query;

  if (completed !== undefined) {
    const isCompleted = completed === 'true';
    const filteredTodos = todos.filter(t => t.completed === isCompleted);
    return res.json(filteredTodos);
  }

  res.json(todos);
});

// 2. GET /api/todos/:id - Retrieve a single to-do by ID
app.get('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const todo = todos.find(t => t.id === id);

  if (!todo) {
    return res.status(404).json({ error: 'To-do item not found' });
  }

  res.json(todo);
});

// 3. POST /api/todos - Create a new to-do
app.post('/api/todos', (req, res) => {
  const { title } = req.body;

  if (!title || typeof title !== 'string' || !title.trim()) {
    return res.status(400).json({ error: 'Title is required and must be a non-empty string' });
  }

  const newTodo = {
    id: nextId++,
    title: title.trim(),
    completed: false
  };

  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// 4. PATCH /api/todos/:id - Partially update a to-do (title or completed state)
app.patch('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const todo = todos.find(t => t.id === id);

  if (!todo) {
    return res.status(404).json({ error: 'To-do item not found' });
  }

  const { title, completed } = req.body;

  if (title !== undefined) {
    if (typeof title !== 'string' || !title.trim()) {
      return res.status(400).json({ error: 'Title must be a non-empty string' });
    }
    todo.title = title.trim();
  }

  if (completed !== undefined) {
    if (typeof completed !== 'boolean') {
      return res.status(400).json({ error: 'Completed state must be a boolean' });
    }
    todo.completed = completed;
  }

  res.json(todo);
});

// 5. DELETE /api/todos/:id - Remove a to-do
app.delete('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const index = todos.findIndex(t => t.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'To-do item not found' });
  }

  todos.splice(index, 1);
  res.status(204).end(); // 204 No Content
});

// Fallback for unhandled routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`To-Do REST API running on http://localhost:${PORT}`);
});