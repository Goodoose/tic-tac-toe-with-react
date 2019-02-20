import React from 'react';

import Cell from './Components/Cell.jsx';

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
      const clickCellUpdate = prevState.stateGame.map((cell) => {
        if (cell.id === id && cell.name === '') { // eslint-disable-next-line no-param-reassign
          cell.name = 'X';
          const { changePlayer } = this.state;
          if (!changePlayer) { // eslint-disable-next-line no-param-reassign
            cell.name = 'O';
          }
          this.state.changePlayer = !changePlayer;
        }
        return cell;
      });
      return {
        stateGame: clickCellUpdate,
      };
    });
    setTimeout(() => this.winCombo(), 200);
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
    this.state.stateGame = stateGame.map((cell) => {
      if (cell.name === '') { // eslint-disable-next-line no-param-reassign
        cell.name = ' ';
      }
      return cell;
    });
    this.setState(() => ({
      messageWin: `Player ${winPlayer} win!!!`,
    }));
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
        messageWin: 'Draw!!!',
      }));
    }
  }

  render() {
    const { stateGame } = this.state;
    const renderGame = stateGame
      .map(cell => (
        <Cell
          key={cell.id}
          itemId={cell.id}
          itemName={cell.name}
          handleClick={this.handleClick}
        />
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
