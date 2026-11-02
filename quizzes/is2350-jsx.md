# is2350-jsx

**1. What does JSX stand for in React development?**

- A) JavaScript XML
- B) Java Syntax Extension
- C) JavaScript Expression
- D) JSON Style XML

**2. Without using JSX, which core React method must be called to create HTML elements programmatically?**

- A) React.createElement()
- B) React.appendElement()
- C) document.createElement()
- D) React.renderElement()

**3. How are JavaScript expressions embedded inside JSX syntax?**

- A) Wrapped in curly braces { }
- B) Wrapped in double brackets [[ ]]
- C) Preceded by a dollar sign $
- D) Enclosed in angle brackets < >

**4. What wrapper syntax is recommended in JSX when writing multiline HTML elements?**

- A) Parentheses ( )
- B) Curly braces { }
- C) Square brackets [ ]
- D) Double quotes " "

**5. What requirement must JSX markup satisfy regarding top-level elements?**

- A) It must be wrapped in exactly ONE top-level parent element or Fragment
- B) It allows multiple adjacent unclosed top-level tags
- C) It requires every top-level element to be an `<h1>` tag
- D) It must always contain a `<div>` element with `id="app"`

**6. Which syntax represents a React Fragment used to group multiple elements without adding extra nodes to the DOM?**

- A) <></>
- B) <fragment></fragment>
- C) <group></group>
- D) <React.Section></React.Section>

**7. How must self-closing elements (such as `<input>`) be written in JSX to satisfy XML rules?**

- A) They must be explicitly closed with a slash, e.g., `<input type="text" />`
- B) They should omit closing slashes completely
- C) They must be wrapped in an `<i>` tag
- D) They can only be rendered using `React.createElement`

**8. Why is `className` used instead of `class` when setting CSS classes on elements in JSX?**

- A) `class` is a reserved keyword in JavaScript
- B) `className` provides automatic CSS module scoping
- C) `class` is restricted to XML schemas only
- D) `className` is required by standard HTML5 specifications

**9. How are comments written inside JSX block markup?**

- A) {/* Comment */}
- B) // Comment
- C) <!-- Comment -->
- D) /* Comment */

**10. What strict naming convention must be followed when creating React component function names?**

- A) The name MUST start with an uppercase letter
- B) The name must be written in snake_case
- C) The name must end with the suffix `Component`
- D) The name must be strictly lowercase

**11. What value will React evaluate and render in the DOM for `<h1>React is {5 + 5} times better</h1>`?**

- A) React is 10 times better
- B) React is 5 + 5 times better
- C) React is {5 + 5} times better
- D) React is NaN times better

**12. How can dynamic JavaScript values be assigned to JSX attributes (such as `className` or `src`)?**

- A) By wrapping the variable in curly braces `{ }`, e.g., `className={x}`
- B) By wrapping the variable in quotes, e.g., `className="{x}"`
- C) By using template strings inside double quotes, e.g., `className="${x}"`
- D) By using parentheses, e.g., `className=(x)`

**13. How are event handler attribute names written in JSX (such as click events)?**

- A) camelCase, e.g., `onClick={myfunc}`
- B) lowercase, e.g., `onclick="myfunc()"`
- C) kebab-case, e.g., `on-click={myfunc}`
- D) UPPERCASE, e.g., `ONCLICK={myfunc}`

**14. How does JSX treat a boolean attribute specified without an explicit value, such as `<button disabled>Click</button>`?**

- A) It treats the attribute value as `true`
- B) It treats the attribute value as `false`
- C) It evaluates the attribute as `null`
- D) It throws a JSX syntax error

**15. What type of value must be provided to the `style` attribute in JSX?**

- A) A JavaScript object with camelCased CSS property names
- B) A standard plain text CSS string
- C) An array of class names
- D) A reference to an external `.css` file URL

**16. Given the style object `const mystyles = { backgroundColor: "lightyellow", fontSize: "20px" };`, how is it applied in JSX?**

- A) style={mystyles}
- B) style="mystyles"
- C) class={mystyles}
- D) css={mystyles}

**17. Where should standard `if / else` conditional logic be placed when rendering component content?**

- A) Outside of the returned JSX block or via inline ternary operators inside `{ }`
- B) Directly inside JSX HTML tags without curly braces
- C) Inside JSX comment blocks
- D) In the `index.html` root element

**18. How are arguments passed into a child React component from a parent component?**

- A) As HTML attributes called `props`
- B) Via global system environment variables
- C) Through local session storage
- D) Using URL query parameters exclusively

**19. If a parent component renders `<Car color="red" />`, how does the `Car` component access this property inside its function signature `function Car(props)`?**

- A) props.color
- B) props[0]
- C) this.color
- D) Car.color

**20. How can a child component `<Car />` be nested inside a parent component `<Garage />` in JSX?**

- A) By placing `<Car />` directly inside the returned JSX block of `<Garage />`
- B) By calling `Garage.append(Car)` in `main.jsx`
- C) By passing `Car` as an array index to `createRoot`
- D) By nesting `Car` inside an HTML comment block

**21. How is a component named `Car` exported from `Vehicle.jsx` and imported in `main.jsx` as a default import?**

- A) `export default Car;` in Vehicle.jsx, and `import Car from './Vehicle.jsx';` in main.jsx
- B) `export Car;` in Vehicle.jsx, and `import { Car } from './Vehicle.jsx';` in main.jsx
- C) `module.exports = Car;` in Vehicle.jsx, and `const Car = require('./Vehicle.jsx');` in main.jsx
- D) `export class Car;` in Vehicle.jsx, and `import default Car from './Vehicle.jsx';` in main.jsx

**22. What is the result of evaluating `<h1>{(x) < 10 ? "Banana" : "Apple"}</h1>` when `x = 5`?**

- A) <h1>Banana</h1>
- B) <h1>Apple</h1>
- C) <h1>5</h1>
- D) <h1>true</h1>

**23. What are the two primary types of React components mentioned in the reference slides?**

- A) Class components and Function components
- B) Server components and Database components
- C) Static components and Dynamic components
- D) Native components and Web components

**24. How do you evaluate object properties directly inside JSX markup for `myobj = { name: "Fiat" }`?**

- A) <h1>{myobj.name}</h1>
- B) <h1>myobj.name</h1>
- C) <h1>${myobj.name}</h1>
- D) <h1>(myobj.name)</h1>

**25. Which statement accurately describes what React components return?**

- A) They return JSX markup that describes the UI elements
- B) They return raw SQL database query handles
- C) They return binary executable files
- D) They return Express server middleware objects

