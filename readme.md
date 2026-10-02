# REX Calculator

A simple offline calculator built with **HTML, CSS, and JavaScript**.

The project is designed to help understand how the three main frontend technologies work together:

* **HTML** → creates the calculator structure
* **CSS** → controls the appearance and layout
* **JavaScript** → controls the calculator's functionality

---

## 1. Project Structure

```text
calculator/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

### `index.html`

Contains the calculator's structure:

* Display screen
* Number buttons
* Operator buttons
* Clear button
* Percentage button
* Equals button

It also connects the CSS and JavaScript files.

```html
<link rel="stylesheet" href="style.css">
<script src="script.js"></script>
```

---

### `style.css`

Controls how the calculator looks.

It handles:

* Colors
* Background
* Button sizes
* Spacing
* Borders
* Rounded corners
* Hover effects
* Mobile responsiveness
* Calculator layout

CSS does **not** perform the calculations.

---

### `script.js`

Contains the calculator's logic.

It handles:

* Reading button clicks
* Storing the user's input
* Updating the display
* Addition
* Subtraction
* Multiplication
* Division
* Percentages
* Brackets
* Decimal numbers
* Clear
* Equals
* Keyboard input
* Error handling

---

# 2. How the Calculator Works

The basic flow is:

```text
User presses a button
        ↓
JavaScript detects the click
        ↓
The value is added to "input"
        ↓
The display is updated
        ↓
User presses "="
        ↓
JavaScript calculates the expression
        ↓
The result appears on the screen
```

For example:

```text
5 + 10
```

JavaScript stores:

```javascript
input = "5+10";
```

When `=` is pressed, JavaScript calculates it:

```text
5 + 10 = 15
```

Then the display becomes:

```text
15
```

---

# 3. Main JavaScript Concepts Used

This project demonstrates several important JavaScript concepts.

### Variables

```javascript
let input = "";
```

Stores information that can change.

---

### Constants

```javascript
const display = document.getElementById("display");
```

Stores a reference that should not be reassigned.

---

### DOM

JavaScript uses the **DOM (Document Object Model)** to communicate with the HTML.

For example:

```javascript
document.getElementById("display");
```

finds an HTML element.

---

### Functions

Functions group instructions together.

Example:

```javascript
function updateDisplay() {
    display.textContent = input || "0";
}
```

---

### Events

Events allow JavaScript to react to user actions.

Example:

```javascript
button.addEventListener("click", ...);
```

This means:

> When this button is clicked, run this code.

---

### Loops

The project uses:

```javascript
forEach()
```

to work with multiple calculator buttons.

---

### Conditions

The project uses:

```javascript
if
```

to make decisions.

Example:

```javascript
if (!input) return;
```

---

### Regular Expressions

The project uses regex to validate calculator expressions.

Example:

```javascript
/^[0-9+\-*/().\s]+$/
```

---

### Error Handling

The project uses:

```javascript
try
catch
```

to prevent invalid calculations from crashing the calculator.

---

# 4. Offline Usage

The calculator can work completely offline.

It does not require:

* Internet
* Database
* Backend
* API
* Server
* Account
* Internet connection

Open:

```text
index.html
```

and the calculator can run locally in the browser.

---

# 5. Technologies

| Technology | Purpose                     |
| ---------- | --------------------------- |
| HTML       | Structure                   |
| CSS        | Design                      |
| JavaScript | Functionality               |
| DOM        | Connects JavaScript to HTML |
| Browser    | Runs the application        |

---

# 6. What You Learn From This Project

After understanding this calculator, you should have a basic understanding of:

* Variables
* `const`
* `let`
* Functions
* DOM selection
* `getElementById()`
* `querySelectorAll()`
* `addEventListener()`
* `forEach()`
* `if`
* `try/catch`
* Regular expressions
* `replace()`
* `replaceAll()`
* `slice()`
* `Number()`
* `String()`
* `toFixed()`
* `dataset`
* Keyboard events
* Click events
* Template literals
* JavaScript operators

---

# 7. Possible Future Improvements

The calculator can later be upgraded with:

* Scientific calculations
* Square root
* Powers
* Sin/Cos/Tan
* Calculation history
* Dark/light themes
* Memory buttons
* Sound effects
* Better keyboard support
* More advanced mathematical parsing
* Mobile app version

---

# 8. Project Goal

The main purpose of this project is not just to create a calculator.

It is to understand how:

```text
HTML + CSS + JavaScript
```

work together to create an interactive web application.

Once this concept is understood, the same principles can be used to build:

* Banking interfaces
* To-do apps
* Dashboards
* Forms
* Games
* Authentication interfaces
* Business applications
* Full-stack applications
