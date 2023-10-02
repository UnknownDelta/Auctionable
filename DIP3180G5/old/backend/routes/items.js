const express = require('express')
const {
    createItem,
    getItems,
    getItem,
    deleteItem,
    updateItem,
    searchItems
} = require('../controllers/itemController')

const router = express.Router()

// SEARCH for items
router.get('/search', searchItems)

// GET all items
router.get('/', getItems);

// GET a single item
router.get('/:id', getItem)

// POST a new item
router.post('/', createItem)

// DELETE a item
router.delete('/:id', deleteItem)

// UPDATE a item
router.patch('/:id', updateItem)



module.exports = router