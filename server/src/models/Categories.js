const { pool } = require("../config/index");

class Categories {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }

    static async create(name) {
        try {
            const result = await pool.query(
                'INSERT INTO categories (name) VALUES ($1) RETURNING id',
                [name]
            )
            const categoryId = result.rows[0].id;
            return new Categories(categoryId, name);
        } catch (error) {
            throw new Error('Failed to create a new Category');
        }
    }

    static async findCategoryById(id) {
        try {
            const result = await pool.query('SELECT * FROM categories WHERE id = $1', [id]);
            const category = result.rows[0];
            category.length !== 0 ? new Categories(category.id, category.name) : null;
        } catch (error) {
            throw new Error('Invalid Category id')
        }
    }

    static async update() {
        try {
            await pool.query(
                'UPDATE categories SET name = $1 WHERE id = $2',
                [this.name]
            );
        } catch (error) {
            throw new Error('Failed to update category');
        }
    }

    static async delete() {
        try {
            await pool.query('DELETE FROM categories WHERE id = $1', [this.id])
        } catch (error) {
            throw new Error('Failed to delete category');
        }
    }
}

module.exports = Categories;