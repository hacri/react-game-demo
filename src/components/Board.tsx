import React, { Component } from 'react';
import { Item } from '../type';
import { observer } from "mobx-react";
import { ItemStatusEnum } from '../enums';
import ItemComponent from './Item';

@observer
export default class Board extends Component<{
    board: Array<Item>,
    rowLength: number,
    colLength: number,
}> {
    render() {
        const boardStyle = {
            height: this.props.rowLength * 50,
            width: this.props.colLength * 50,
        }

        return (
            <div className="board" style={boardStyle}>
                {this.props.board.map((item) =>
                    <ItemComponent key={item.id} item={item}></ItemComponent>
                )}
            </div>
        )
    }
}
