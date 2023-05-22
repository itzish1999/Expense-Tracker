const User = require('../models/Users');
const { isEmptyObject, isUserExist } = require('../utils');

async function getUser(req, res) {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);
        isEmptyObject(user);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error: CANNOT GET USER' });
    }
}

async function createUser(req, res) {
    try {
        const { name, email, password } = req.body;
        const newUser = await User.create(name, email, password);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error: CANNOT CREATE USER' });
    }
}

async function updateUser(req, res) {
    try {
        const userId = req.params.id;
        const { name, email, password } = req.body;

        const user = await User.findById(userId);
        isExist(user);

        user.name = name;
        user.email = email;
        user.password = password;

        await user.update();
        res.json({ message: 'User Successfully Updated' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error Updating User: CANNOT UPDATE USER' });
    }
}

async function deleteUser(req, res) {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);
        isExist(user);
        await User.delete();
        res.json({ message: 'User Successfully Deleted' });

    } catch (error) {
        res.status(500).json({ error: 'Internal Servor Error Deleting User: CANNOT DELETE USER' });
    }
}

module.exports = {
    getUser,
    createUser,
    updateUser,
    deleteUser
};