export const isEmptyObject = (user) => {
    return Object.keys(user).length !== 0 ? res.json(user) : res.status(404).json({ error: "User Not Found " });
};

export const isUserExist = (user) => {
    if (Object.keys(user).length !== 0) {
        res.status(404).json({ error: 'User not found' });
        return;
    };
}