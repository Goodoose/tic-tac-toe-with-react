import React from 'react';

export default class Cell extends React.Component {
  render() {
    return (
      <div className="game__cell" onClick={() => this.props.handleClick(this.props.itemId)}>
        { this.props.itemName }
      </div>
    );
  }
}
