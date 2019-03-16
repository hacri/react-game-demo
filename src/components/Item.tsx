import React, { Component } from 'react';
import { Item } from '../type';
import { observer } from "mobx-react";
import { ItemStatusEnum } from '../enums';

@observer
export default class ItemComponent extends Component<{
    item: Item,
    removeItem: Function,
}>{
    render() {
        const item = this.props.item;

        const itemStyle = {
            left: item.coord.colIdx * 50,
            top: item.coord.rowIdx * 50
        };

        return (
            <div key={item.id} className={[
                'item',
                `item-status_${item.status}`,
                `item-type-${item.type}`,
                item.status == ItemStatusEnum.REMOVING && item.ttl === 0 ? 'remove-immediately' : null,
                'animated',
                'fadeIn'
            ].join(' ')}
                style={itemStyle}
                onClick={() => this.props.removeItem(item.coord.rowIdx, item.coord.colIdx)}
            >
                {item.status == ItemStatusEnum.NORMAL && item.type}
                {item.status == ItemStatusEnum.REMOVING && <span>{item.type} * {item.ttl}</span>}
                {item.status == ItemStatusEnum.PENDING && <span>{item.type} -</span>}
            </div>
        );
    }
}
