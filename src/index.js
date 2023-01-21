import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

//In order to complete the came, the process called "lifting the state up" is necessary.
//In order for this process to take place, the game's state needs to be stored in the parent Board component, instead of in each Square.
//The Board component can tell each Square what to display by passing a prop, just like we did when we passed a number to each Square.

//Important
//In order to collect data from multiple children, or to have two child components communicate with each other, you need to declare the shared state in their
//parent component instead.
//The parent component can pass the state back down to the children by using props; This keeps the child components in sync with each other and with the parent
//component.

//Lifting the state up into a parent component is common when React components are refractored - let's take this opportunity to try it out.

// // component 1 - renders a square
// class Square extends React.Component {
//   //to remember things, components use state
//   //  lifting the state up ------------------  🎈🎈🎈🎈🎈🎈🎈
//   // constructor(props) {🎈🎈
//   //   //in JS classes, you always need to call super when defining the constructor of a subclass.🎈🎈
//   //   //Therefore, all React components classes that have a constructor should start with a super(props) call.🎈🎈
//   //   super(props);🎈🎈
//   //   this.state = {🎈🎈
//   //     value: null,🎈🎈
//   //   };🎈🎈
//   // }🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈

//   //CONTROLLED COMPONENT(S) - THE BOARD CONTROLLES THEM
//   render() {
//     return (
//       <button
//         className="square"
//         onClick={() => this.props.onClick({ value: "X" })}
//       >
//         {this.props.value}
//       </button>
//     );
//   }
// }

//Now, we will change the Square to be a function component.
//easier to write way for functions that don't have state - remark) there is to THIS or arrow functions
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

//component 2 - renders 9 squares
class Board extends React.Component {
  //Lifted Again 🎈🎈🎈🎈🎈🎈🎈
  // constructor(props) {🎈🎈🎈🎈🎈🎈🎈
  //   super(props);🎈🎈🎈🎈🎈🎈🎈
  //   //lifted state ------------------🎈🎈🎈🎈🎈🎈🎈🎈
  //   this.state = {🎈🎈🎈🎈🎈🎈🎈
  //     squares: Array(9).fill(null), //when the board's state changes, the square components re-render automatically🎈🎈🎈🎈🎈🎈🎈
  //     xIsNext: true,🎈🎈🎈🎈🎈🎈🎈
  //   };🎈🎈🎈🎈🎈🎈🎈
  //   ////-----------------------------🎈🎈🎈🎈🎈🎈🎈🎈
  // }🎈🎈🎈🎈🎈🎈🎈

  // handleClick(i) {
  //   //Why is immutability important? There are two ways of changing data: 1) mutate data by directly changing the data's values e.g:player.score = 2;
  //   //2) replace the data with a new copy which has the desired changes e.g.: var newPlayer = {...player, score: 2};
  //   //Why is immutability cooler? -Complex Features Become Simple: avoiding direct data mutation lets us keep previous versions intact, and reuse them.
  //   //-Detecting Changes: is very easy
  //   //-Determining When to Re-Render in React: The main benefit is that it helps you build PURE COMPONENTS in React. Immutable data can easily determine if
  //   //changes have been made, which helps to determine when a component requires re-rendering.
  //   const squares = this.state.squares.slice();
  //   if (calculateWinner(squares) || squares[i]) {
  //     return;
  //   }
  //   squares[i] = this.state.xIsNext ? "X" : "O";
  //   this.setState({ squares: squares, xIsNext: !this.state.xIsNext });
  // }
  //render a square
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  //render loop
  render() {
    // const winner = calculateWinner(this.state.squares);
    // let status;
    // if (winner) {
    //   status = "Winner: " + winner;
    // } else {
    //   status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    // }

    return (
      <div>
        {/* <div className="status">{status}</div> */}
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

// renders a board
//We want as a functionality to display past moves in game component, so we need the history state in Game component
//So indeed we are lifting the state up again, moving the array of squares here.
class Game extends React.Component {
  ////-----------------------------🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈
  constructor(props) {
    super(props);
    this.state = {
      history: [{ squares: Array(9).fill(null) }],
      stepNumber: 0,
      xIsNext: true,
    };
  }
  handleClick(i) {
    //Why is immutability important? There are two ways of changing data: 1) mutate data by directly changing the data's values e.g:player.score = 2;
    //2) replace the data with a new copy which has the desired changes e.g.: var newPlayer = {...player, score: 2};
    //Why is immutability cooler? -Complex Features Become Simple: avoiding direct data mutation lets us keep previous versions intact, and reuse them.
    //-Detecting Changes: is very easy
    //-Determining When to Re-Render in React: The main benefit is that it helps you build PURE COMPONENTS in React. Immutable data can easily determine if
    //changes have been made, which helps to determine when a component requires re-rendering.
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([{ squares: squares }]), //concat() returns a new array
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }
  ////-----------------------------🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈

  //function to update stepNumber
  //sets xIsNext if number is even
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    //map our history of moves to React elements representing buttons on the screen, and display a list of buttons to "jump" to past moves
    const moves = history.map((step, move) => {
      const desc = move ? "Go to move #" + move : "Go to game start";
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>{" "}
        </li>
      );
    });
    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
