interface Item {
    id: number,

    type: ItemTypeEnum,
    status: ItemStatusEnum,
    ttl: number,

    coord: Coord,
}

interface Coord {
    rowIdx: number,
    colIdx: number,
}

export {
    Item,
    Coord,
}
