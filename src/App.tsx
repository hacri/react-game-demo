import React, { Component } from 'react';
import logo from './logo.svg';
import './App.scss';
import Board from './components/Board';
import BoardStore from './store/BoardStore';

class App extends Component<{ store: BoardStore }> {
  constructor(props: Readonly<{ store: BoardStore; }>) {
    super(props)

    this.test = this.test.bind(this);
  }

  test() {
    this.props.store.removeItem(2, 2);
  }

  render() {
    return (
      <div className="App">
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header> */}
        <div className="main">
          <Board board={this.props.store.board}
            rowLength={this.props.store.rowLength}
            colLength={this.props.store.colLength}
            removeItem={this.props.store.removeItem.bind(this.props.store)}></Board>

          <ul>
            <li>🍌 = Row BOMB</li>
            <li>🍉 = Column BOMB</li>
            <li>🍒 = Block BOMB</li>
          </ul>
          <button onClick={this.test}>remove 2,2</button>
        </div>
      </div>
    );
  }
}

export default App;
