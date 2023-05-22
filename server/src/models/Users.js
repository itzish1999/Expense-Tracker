const { pool } = require('../config/index');

class User {
    constructor(id, name, email, password) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }

    static async create(name, email, password) {
        try {
            const result = await pool.query(
                'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id',
                [name, email, password]
            )
            const userId = result.rows[0].id;
            return new User(userId, name, email, password);
        } catch (error) {
            throw new Error('Failed to create new user')
        }
    }

    static async findById(id) {
        try {
            const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
            const user = result.rows[0];
            user.length !== 0 ? new User(user.id, user.name, user.email, user.password) : null;
        } catch (error) {
            throw new Error('Failed to find user by id');
        }
    }

    async update() {
        try {
            await pool.query(
                'UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4',
                [this.name, this.email, this.password]
            );
        } catch (error) {
            throw new Error('Failed to update user');
        }
    }

    async delete() {
        try {
            await pool.query('DELETE FROM users WHERE id = $1', [this.id]);
        } catch (error) {
            throw new Error('Failed to delete user');
        }
    }
}

module.exports = User;