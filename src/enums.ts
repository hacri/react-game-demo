enum ItemTypeEnum {
    NORMAL = 0,
    ROW_BOOM = 1,
    COL_BOOM = 2,
    BLOCK_BOOM = 3,
}

enum ItemStatusEnum {
    NORMAL = 0,
    REMOVED = -1,
    PENDING = 1,
    REMOVING = 2,
    
}

export {
    ItemTypeEnum,
    ItemStatusEnum,
}
