export const isEmptyObject = (obj) => {
    return Object.keys(obj).length !== 0 ? res.json(obj) : res.status(404).json({ error: `${obj} not found` });
};

export const isExist = (obj) => {
    if (Object.keys(obj).length !== 0) {
        res.status(404).json({ error: `${obj} not found` });
        return;
    };
}