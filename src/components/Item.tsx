import React, { Component } from 'react';
import { Item } from '../type';
import { observer } from "mobx-react";
import { ItemStatusEnum, ItemTypeEnum } from '../enums';
import { timeout } from 'q';

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

        let content;
        const itemClassList = [
            'item',
            `item-status_${item.status}`,
            `item-type-${item.type}`,
        ];

        let currentAnimate = 'fadeIn';

        if (item.status == ItemStatusEnum.REMOVED) {
            content = '';
            currentAnimate = '';
        } else if (item.status == ItemStatusEnum.REMOVING && item.ttl == 0) {
            itemClassList.push('remove-immediately');

            if (item.type == ItemTypeEnum.NORMAL) {
                content = '💢';
            } else {
                content = '💥'

                currentAnimate = 'flash';
            }
        } else {
            if (item.type == ItemTypeEnum.NORMAL) {
                content = '🍎';
            } else if (item.type == ItemTypeEnum.ROW_BOOM) {
                content = '🍌';
            } else if (item.type == ItemTypeEnum.COL_BOOM) {
                content = '🍉';
            } else if (item.type == ItemTypeEnum.BLOCK_BOOM) {
                content = '🍒';
            }
        }

        if (currentAnimate) {
            itemClassList.push('animated');
            itemClassList.push(currentAnimate);
        }

        return (
            <div key={item.id} className={itemClassList.join(' ')}
                style={itemStyle}
                onClick={() => this.props.removeItem(item.coord.rowIdx, item.coord.colIdx)}
            >
                {content}
            </div>
        );
    }
}
