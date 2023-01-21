import logo from "./logo.svg";
import "./App.css";

//what is React?
//React is a declarative, efficient and flexible JavaScript library for building user interfaces.
//With React, you are not creating a web page, you're writing the user interface for an application that happens to be rendered in a browser.
//React apps really are "apps" not "web pages"

//React user interfaces are composed from small and isolated pieces of code called "components".

//React has a few different kinds of components, but we'll start with React.Component subclasses.

//render() returns a React element, which is a lightweight description of what to render.
// Most React developers use a special syntax called “JSX” which makes these structures easier to write

//e.g.:
//React.createElement('h1', /* ... h1 children ... */)

//With the use of JSX, you can put any JavaScript expression within braces inside JSX.

// The ShoppingList component above only renders built-in DOM components like <div /> and <li />. But you can compose and render custom
// React components too. For example, we can now refer to the whole shopping list by writing <ShoppingList />. Each React component
// is encapsulated and can operate independently; this allows you to build complex UIs from simple components

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
