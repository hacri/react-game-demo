import React, { Component } from 'react';
import { Item } from '../type';
import { observer } from "mobx-react";
import { ItemStatusEnum } from '../enums';
import ItemComponent from './Item';
import BoardStore from '../store/BoardStore';

@observer
export default class Board extends Component<{
    boardStore: BoardStore
}> {
    render() {
        const boardStyle = {
            height: this.props.boardStore.rowLength * 50,
            width: this.props.boardStore.colLength * 50,
        }

        return (
            <div className="board" style={boardStyle}>
                <div className="item-container">
                    {this.props.boardStore.board.map((item) =>
                        <ItemComponent key={item.id} item={item}
                            boardStore={this.props.boardStore}></ItemComponent>
                    )}
                </div>
            </div>
        )
    }
}
