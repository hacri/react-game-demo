import { observable, autorun, computed, action, runInAction } from 'mobx';
import { Item, Coord } from '../type';
import { ItemStatusEnum, ItemTypeEnum } from '../enums';
import Timeout from 'await-timeout';

export default class BoardStore {
    @observable board: Array<Item> = []

    readonly rowLength = 8
    readonly colLength = 8
    readonly waitTime = 500

    increseId = 1
    private inProcess = true;
    dirtyList: Array<Coord> = [];

    constructor() {
        autorun(this.report.bind(this), { delay: 300 })

        // for (let i = 0; i < this.rowLength; i++) {
        //     for (let j = 0; j < this.colLength; j++) {
        //         this.generateItem(i, j);
        //     }
        // }

        this.initBoard().then(() => {
            this.inProcess = false;
        })
    }

    async initBoard() {
        while (this.isNeedFillItem()) {
            runInAction(() => {
                this.fillItem();
            })
            await Timeout.set(this.waitTime);
        }
    }

    generateItem(rowIdx: number, colIdx: number) {
        this.board.push({
            id: this.increseId++,
            type: Math.floor(Math.random() * 4),
            status: ItemStatusEnum.NORMAL,
            ttl: 0,
            coord: {
                rowIdx,
                colIdx,
            },
        });
    }

    report() {

    }

    private getItem(rowIdx: number, colIdx: number): Item | undefined {
        return this.board.find(item => item.coord.rowIdx == rowIdx && item.coord.colIdx == colIdx);
    }

    private removeRowItem(rowIdx: number, ttl: number) {
        for (let colIdx = 0; colIdx < this.colLength; colIdx++) {
            this.markRemoveStatus(rowIdx, colIdx, ttl);
        }
    }

    private removeColItem(colIdx: number, ttl: number) {
        for (let rowIdx = 0; rowIdx < this.rowLength; rowIdx++) {
            this.markRemoveStatus(rowIdx, colIdx, ttl);
        }
    }

    private removeAroundItem(rowIdx: number, colIdx: number, ttl: number) {
        for (let rowOffset = -1; rowOffset <= 1; rowOffset++) {
            if (rowIdx + rowOffset < 0) continue;
            if (rowIdx + rowOffset >= this.rowLength) continue;

            for (let colOffset = -1; colOffset <= 1; colOffset++) {
                if (colIdx + colOffset < 0) continue;
                if (colIdx + colOffset >= this.colLength) continue;

                this.markRemoveStatus(rowIdx + rowOffset, colIdx + colOffset, ttl);
            }
        }
    }

    private processBoom(ttl: number) {
        const processList = this.dirtyList;
        this.dirtyList = [];

        processList.map(coord => {
            const waitRemovedItem = this.getItem(coord.rowIdx, coord.colIdx);
            if (!waitRemovedItem || waitRemovedItem.status != ItemStatusEnum.PENDING) {
                return;
            }

            waitRemovedItem.status = ItemStatusEnum.REMOVING;

            switch (waitRemovedItem.type) {
                case ItemTypeEnum.ROW_BOOM:
                    this.removeRowItem(coord.rowIdx, ttl);
                    break;
                case ItemTypeEnum.COL_BOOM:
                    this.removeColItem(coord.colIdx, ttl);
                    break;
                case ItemTypeEnum.BLOCK_BOOM:
                    this.removeAroundItem(coord.rowIdx, coord.colIdx, ttl);
                    break;
            }
        });
    }

    markRemoveStatus(rowIdx: number, colIdx: number, ttl: number = 0) {
        const waitRemovedItem = this.getItem(rowIdx, colIdx);

        if (!waitRemovedItem || waitRemovedItem.status != ItemStatusEnum.NORMAL) {
            // already removed
            return
        }

        waitRemovedItem.status = ItemStatusEnum.PENDING;
        waitRemovedItem.ttl = ttl;

        if (waitRemovedItem.type == ItemTypeEnum.NORMAL) {
            waitRemovedItem.status = ItemStatusEnum.REMOVING;
        } else {
            this.dirtyList.push({
                rowIdx,
                colIdx,
            });
        }
    }

    isNeedFillItem() {
        if (this.board.length < this.rowLength * this.colLength) {
            return true;
        }
        for (let i = 0; i < this.board.length; i++) {
            if (this.board[i].status != ItemStatusEnum.NORMAL) {
                return true;
            }
        }
        return false;
    }

    fillItem() {
        for (let colIdx = 0; colIdx < this.colLength; colIdx++) {
            for (let rowIdx = this.rowLength - 1; rowIdx >= 0; rowIdx--) {
                const currentItem = this.getItem(rowIdx, colIdx);
                if (currentItem && currentItem.status == ItemStatusEnum.NORMAL) {
                    continue;
                }

                if (currentItem) {
                    this.board.splice(this.board.indexOf(currentItem), 1);
                }

                let startFillRowIdx = rowIdx - 1;
                for (; startFillRowIdx >= 0; startFillRowIdx--) {
                    const upItem = this.getItem(startFillRowIdx, colIdx);
                    if (upItem) {
                        upItem.coord.rowIdx++;
                    }
                }

                this.generateItem(0, colIdx);

                break; // one block per tick;
            }
        }
    }

    @action
    async removeItem(rowIdx: number, colIdx: number) {
        if (this.inProcess) {
            return;
        }
        this.inProcess = true;

        console.log('start remove')
        this.markRemoveStatus(rowIdx, colIdx);
        let ttl = 1;

        while (this.dirtyList.length) {
            this.processBoom(ttl);
            ttl++;
        }

        let hasInRemoving = true;
        let firstFlag = true;
        while (hasInRemoving) {
            hasInRemoving = false;

            if (!firstFlag) {
                await Timeout.set(this.waitTime);
            } else {
                firstFlag = false;
            }

            runInAction(() => {
                this.board.map(item => {
                    if (item.status != ItemStatusEnum.REMOVING) {
                        return
                    }
                    if (item.ttl > 0) {
                        item.ttl--;
                        hasInRemoving = true;
                    } else {
                        item.status = ItemStatusEnum.REMOVED;
                    }
                });
            });
        }

        console.log('start fill')
        firstFlag = true;
        while (this.isNeedFillItem()) {

            if (!firstFlag) {
                await Timeout.set(this.waitTime);
            } else {
                firstFlag = false;
            }

            runInAction(() => {
                this.fillItem();
            })
        }

        this.inProcess = false;
        console.log('finish')
    }
}
