/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      stateGame: App.setStartState(),
      changePlayer: true,
      messageWin: '',
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleClickRestart = this.handleClickRestart.bind(this);
  }

  static setStartState() {
    const QUANTITY_CELLS = 9;
    return [...Array(QUANTITY_CELLS).keys()].map(item => ({
      id: item,
      name: '',
    }));
  }

  handleClick(id) {
    this.setState((prevState) => {
      const { stateGame } = prevState;
      if (stateGame[id].name) {
        return prevState;
      }
      const { changePlayer } = this.state;
      stateGame[id].name = changePlayer ? 'X' : 'O';
      return {
        stateGame,
        changePlayer: !changePlayer,
      };
    });
    setTimeout(() => this.winCombo(), 0);
  }

  handleClickRestart() {
    this.setState(() => ({
      stateGame: App.setStartState(),
      changePlayer: true,
      messageWin: '',
    }));
  }

  showWinner(winPlayer) {
    const { stateGame } = this.state;
    this.setState(() => {
      const newState = stateGame.map((cell) => {
        if (cell.name === '') { // eslint-disable-next-line no-param-reassign
          cell.name = ' ';
        }
        return cell;
      });
      return {
        stateGame: newState,
        messageWin: `Player ${winPlayer} win!!!`,
      };
    });
  }

  isFull() {
    const { stateGame } = this.state;
    return stateGame.every(cell => cell.name !== '');
  }

  winCombo() {
    const winTemplates = ['012', '345', '678', '036', '147', '258', '048', '246'];
    let player = 'X';
    const { changePlayer } = this.state;
    if (changePlayer === true) {
      player = 'O';
    }
    let combo = '';
    const { stateGame } = this.state;
    stateGame.forEach((cell) => {
      if (cell.name === player) {
        combo += cell.id;
      }
    });
    let winPlayer = '';
    for (let i = 0; i < winTemplates.length; i++) {
      let count = 0;
      for (let j = 0; j < winTemplates[i].length; j++) {
        if (combo.indexOf(winTemplates[i][j]) > -1) {
          count++;
        }
        if (count === 3) {
          winPlayer = player;
          this.showWinner(winPlayer);
          break;
        }
      }
    }
    if (this.isFull() && winPlayer === '') {
      this.setState(() => ({
        messageWin: '!!!!! Draw !!!!!',
      }));
    }
  }

  render() {
    const { stateGame } = this.state;
    const renderGame = stateGame
      .map(cell => (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <div
          className="game__cell"
          key={cell.id}
          onClick={() => this.handleClick(cell.id)}
        >
          {cell.name}
        </div>
      ));
    const { messageWin } = this.state;
    return (
      <div>
        <div className={messageWin && 'moved'}>
          { messageWin }
        </div>
        <div className="container shadow">
          {renderGame}
        </div>
        <button type="button" className="button__restart" onClick={() => this.handleClickRestart()}>
          Restart Game
        </button>
      </div>
    );
  }
}
