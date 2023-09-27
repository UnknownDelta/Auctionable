const Items = require('../models/ItemsModel')
const mongoose = require('mongoose')
const multer = require('multer')

const storage = multer.memoryStorage()
const upload = multer({storage: storage})


const getItems = async(req, res) =>{
    const itemList = await Items.find({}).sort({createdAt:-1})

    res.status(200).json(itemList)
}

//works partially, the case where there is 0 past items is glitchy
const getSoldItems = async(req, res) =>{
    const soldItems = await Items.find({sold: true}).sort({createdAt:-1})

    if (!soldItems) {
        return res.status(400).json({error: 'No previous items'})
    }

    res.status(200).json(soldItems)
}
const createItem = (upload.single('image'), async (req, res) =>{
    const {name, price, description, condition, years_used, category, new_used, seller, sold, qty} = req.body

    try {
        const images = req.file.buffer.toString('base64')
        const item_list = await Items.create({name, price, description, condition, years_used, category, new_used, images, seller, sold, qty})
        res.status(200).json(item_list)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

const updateItem = async(req, res) =>{
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such id'})
    }
    const item_list = await Items.findOneAndUpdate({_id: id},{
        ...req.body
    })
    if (!item_list) {
        return res.status(400).json({error: 'No previous items'})
    }
    res.status(200).json(item_list)
}

module.exports = {
    createItem,
    getItems,
    getSoldItems,
    updateItem
}