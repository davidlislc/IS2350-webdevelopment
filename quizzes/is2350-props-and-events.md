# is2350-props-and-events

**1. How are props passed into React components from JSX?**

- A) As HTML attributes
- B) As URL query parameters
- C) As global CSS rules
- D) As server response headers

**2. Which delimiter syntax must be used when passing non-string values (like numbers, arrays, or objects) as props in React?**

- A) Double quotes " "
- B) Curly brackets { }
- C) Square brackets [ ]
- D) Parentheses ( )

**3. How do you correctly pass an array named `x` into a component as a prop called `years`?**

- A) <Car years="x" />
- B) <Car years={x} />
- C) <Car years=(x) />
- D) <Car years=[x] />

**4. If a component receives an object prop called `carinfo`, how are its internal properties accessed inside the component?**

- A) Using dot notation, e.g., `props.carinfo.model`
- B) Using index notation, e.g., `props.carinfo[1]`
- C) Using string key lookup, e.g., `carinfo->model`
- D) Using scope resolution operator, e.g., `props::carinfo::model`

**5. How do you destructure specific props directly in a functional component's parameter list?**

- A) function Car({ color, brand })
- B) function Car(props.color, props.brand)
- C) function Car([color, brand])
- D) function Car(const { color, brand })

**6. Which rest operator syntax is used in prop destructuring to collect all unspecified remaining properties into an object?**

- A) ...rest
- B) ---rest
- C) &&rest
- D) ***rest

**7. How do you assign a default value to a destructured prop named `color` inside the function parameters?**

- A) function Car({ color = "blue", brand })
- B) function Car({ color : "blue", brand })
- C) function Car({ color == "blue", brand })
- D) function Car({ color || "blue", brand })

**8. How are React event attribute names written in JSX compared to standard HTML?**

- A) They are written in camelCase (e.g., `onClick`)
- B) They are written in lowercase (e.g., `onclick`)
- C) They are written in UPPERCASE (e.g., `ONCLICK`)
- D) They are written in kebab-case (e.g., `on-click`)

**9. What wrapper syntax is used to assign event handlers in React event attributes?**

- A) Curly braces `{ }` containing the function reference
- B) Double quotes `" "` containing a string call
- C) Parentheses `( )` containing a global script reference
- D) Square brackets `[ ]` containing the function name

**10. What is the correct way to pass custom arguments (e.g., `"Goal!"`) to an event handler `shoot` on a button click?**

- A) onClick={() => shoot("Goal!")}
- B) onClick=shoot("Goal!")
- C) onClick="shoot('Goal!')"
- D) onClick={shoot["Goal!"]}

**11. When passing custom arguments along with the synthetic event object to a click handler, how is the handler defined in `onClick`?**

- A) onClick={(event) => shoot("Goal!", event)}
- B) onClick=shoot("Goal!", event)
- C) onClick={shoot("Goal!", event)}
- D) onClick={event => shoot.bind(event, "Goal!")}

**12. How does the logical `&&` operator behave during conditional rendering in JSX?**

- A) The right-hand side is rendered only if the left-hand condition evaluates to true
- B) It always renders both the left and right expressions regardless of value
- C) It acts as a fallback default when the left-hand expression is null
- D) It toggles the CSS display property between block and none

**13. Which conditional operator is used inside JSX to render one of two components based on a boolean state (e.g., `isGoal`)?**

- A) Ternary operator (`condition ? <TrueComponent/> : <FalseComponent/>`)
- B) Nullish coalescing operator (`condition ?? <FalseComponent/>`)
- C) Optional chaining operator (`condition?.<TrueComponent/>`)
- D) Assignment operator (`condition = <TrueComponent/>`)

**14. What data type must be passed to the `style` attribute when applying inline styles in React JSX?**

- A) A JavaScript object
- B) A plain text CSS string
- C) An array of string values
- D) A boolean flag

**15. How must CSS properties with hyphens (e.g., `background-color`) be written in React inline style objects?**

- A) In camelCase syntax (e.g., `backgroundColor`)
- B) In snake_case syntax (e.g., `background_color`)
- C) In PascalCase syntax (e.g., `BackgroundColor`)
- D) Enclosed in brackets (e.g., `['background-color']`)

**16. Which syntax correctly demonstrates double curly braces for an inline style specifying a red text color?**

- A) <h1 style={{ color: "red" }}>Hello</h1>
- B) <h1 style="color: red">Hello</h1>
- C) <h1 style={color: "red"}>Hello</h1>
- D) <h1 style=[{ color: "red" }]>Hello</h1>

**17. How is an external CSS file imported into a React application component file?**

- A) import './MyStylesheet.css';
- B) require.css('./MyStylesheet.css');
- C) <link rel="stylesheet" href="./MyStylesheet.css" />
- D) include './MyStylesheet.css';

**18. Which third-party library is featured for writing CSS-in-JS using tagged template literals in React?**

- A) styled-components
- B) bootstrap
- C) tailwind-css
- D) sass

**19. When creating styled elements using `styled-components`, what characters enclose the CSS rules?**

- A) Backticks (`)
- B) Double quotes (")
- C) Parentheses ( )
- D) Curly braces { }

**20. How are dynamic background colors applied based on props in `styled-components`?**

- A) background-color: ${props => props.btntype === 'primary' ? '#007bff' : '#6c757d'};
- B) background-color: props.btntype === 'primary' ? '#007bff' : '#6c757d';
- C) background-color: {{ props.btntype }};
- D) background-color: var(--btntype);

**21. What is a main advantage of using CSS-in-JS libraries like `styled-components`?**

- A) They create component-scoped styles and prevent class name conflicts
- B) They eliminate the need for JavaScript build tools
- C) They run directly in the database engine
- D) They convert React components into native desktop applications

**22. If an array prop is passed as `const carInfo = ["Ford", "Mustang"]`, how does `Car(props)` access 'Mustang'?**

- A) props.carinfo[1]
- B) props.carinfo.Mustang
- C) props.carinfo[0]
- D) props.carinfo.model

**23. Which statement correctly describes React props?**

- A) Props are read-only arguments passed into components to transfer data
- B) Props are internal mutable state variables managed inside a component
- C) Props are restricted exclusively to string primitive values
- D) Props can only be passed from child components up to parent components

**24. What terminal command is used to install `styled-components` into a React project?**

- A) npm install styled-components
- B) npm get styled-components
- C) vite add styled-components
- D) npm install react-css

**25. In React conditional rendering using an `if` statement outside JSX, what determines which element is returned?**

- A) Component return statements triggered conditionally based on boolean evaluations
- B) Automated CSS media query breakpoints
- C) The number of props passed to the root element
- D) The build settings configured in `vite.config.js`

