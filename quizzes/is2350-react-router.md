# is2350-react-router

**1. What is the primary role of React Router in a React application?**

- A) Handling navigation between different views in a single-page application
- B) Managing database transactions on the server
- C) Compiling JSX directly into WebAssembly
- D) Validating CSS stylesheets during build time

**2. Which npm command installs the standard React Router package for web applications?**

- A) npm install react-router-dom
- B) npm install react-navigation
- C) npm install router-react
- D) npm install vite-plugin-router

**3. Which top-level React Router component must wrap your application to enable routing functionality?**

- A) BrowserRouter
- B) RouteProvider
- C) NavigationContainer
- D) RouterView

**4. Which three core React Router components are used for basic route definition and link navigation?**

- A) Link, Routes, and Route
- B) Anchor, Switch, and Path
- C) Href, RouteGroup, and Screen
- D) NavLink, Router, and Page

**5. How do you specify the destination path for a `<Link>` component?**

- A) Using the `to` prop (e.g., `<Link to="/about">`)
- B) Using the `href` attribute (e.g., `<Link href="/about">`)
- C) Using the `path` prop (e.g., `<Link path="/about">`)
- D) Using the `target` attribute (e.g., `<Link target="/about">`)

**6. What component serves as a container for all individual route definitions in React Router?**

- A) Routes
- B) RouteSet
- C) SwitchBoard
- D) RouterBox

**7. Which props are used on a `<Route>` component to map a URL path to a React component?**

- A) `path` and `element`
- B) `url` and `component`
- C) `to` and `render`
- D) `href` and `view`

**8. Why is `<NavLink>` preferred over `<Link>` when creating navigation menus and tabs?**

- A) It makes it easier to apply active styling when the current URL matches its `to` prop
- B) It automatically fetches backend API data on click
- C) It bypasses the need for `<BrowserRouter>`
- D) It forces full page reloads for better SEO

**9. When styling a `<NavLink>`, how is active state passed to a style function?**

- A) Via an object parameter destructured as `({ isActive })`
- B) Via a global variable named `window.isCurrentRoute`
- C) Through a CSS class called `.selected-tab` exclusively
- D) By querying the `req.params` object

**10. In the route path `<Route path="/customer/:firstname" element={<Info />} />`, what does `:firstname` represent?**

- A) A dynamic URL parameter
- B) A static sub-directory
- C) An optional CSS module class
- D) A query string key

**11. Which React Router hook is used inside a component to retrieve dynamic URL parameters from the current route path?**

- A) useParams
- B) useRoute
- C) useURL
- D) usePath

**12. Given `const { firstname } = useParams();` for route `/customer/:firstname`, what will `firstname` equal when visiting `/customer/Tobias`?**

- A) "Tobias"
- B) "firstname"
- C) "/customer/Tobias"
- D) undefined

**13. What happens when a user clicks on a `<Link to="/contact">Contact</Link>` component in a React SPA?**

- A) The browser URL updates and the client-side view changes without triggering a full page reload
- B) The browser sends a full HTTP GET request to re-download the entire HTML document
- C) The app clears local storage and re-instantiates all root dependencies
- D) The web server executes a server-side redirect action

**14. Which import statement correctly imports the essential components and hooks for routing from `react-router-dom`?**

- A) import { BrowserRouter, Routes, Route, Link, NavLink, useParams } from 'react-router-dom';
- B) import { Router, RouteGroup, Anchor } from 'react-router';
- C) import ReactRouter from 'react-router-dom/all';
- D) import { createRouter, useRoute } from 'react-dom/client';

**15. What component is rendered when a URL matches `<Route path="/about" element={<About />} />`?**

- A) The `<About />` component
- B) The `<Home />` component
- C) A 404 page error screen
- D) The `<BrowserRouter />` root wrapper

