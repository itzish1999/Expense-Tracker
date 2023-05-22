const Categories = require('../models/Categories');
const { isEmptyObject, isExist } = require('../utils');

async function getCategory(req, res) {
    try {
        const categoryId = req.params.id;
        const category = await Categories.getCategoryById(categoryId);
        isEmptyObject(category);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error: CANNOT GET CATEGORY' });
    }
}

async function createCategory(req, res) {
    try {
        const { name } = req.body;
        const newCategory = await Categories.create(name);
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error: CANNOT CREATE CATERGORY' });
    }
}

async function updateCategory(req, res) {
    try {
        const categoryId = req.params.id;
        const { name } = req.body;

        const category = await Categories.getCategoryById(categoryId);
        isExist(category);

        category.name = name;

        await category.update();

        res.json({ message: 'Category was updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error: CANNOT UPDATE CATEGORY' })
    }
}

async function deleteCategory(req, res) {
    try {
        const categoryId = req.params.id;
        const category = await Categories.getCategoryById(categoryId);

        isExist(category);

        await Categories.delete();
        res.json({ message: 'Category Was Deleted Successfully' });

    } catch (error) {
        res.status(500).json({ message: 'Internal server error: CANNOT DELETE CATEGORY' });
    }
}

module.exports = {
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory
}