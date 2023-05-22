const User = require('../models/Users');

async function getUser(req, res) {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);
        Object.keys(user).length !== 0 ? res.json(user) : res.status(404).json({ error: "User Not Found " });
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
        if (Object.keys(user).length !== 0) {
            res.status(404).json({ error: 'User not found' });
            return;
        }

        user.name = name;
        user.email = email;
        user.password = password;

        await user.update();
        res.json({ message: 'User Successfully Updated' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error Updating User: CANNOT UPDATE USER' });
    }
}

async function DeleteUser(req, res) {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);
        if (Object.keys(user).length !== 0) {
            res.status(404).json({ error: 'User Not Found' });
            return;
        }
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
    DeleteUser
};