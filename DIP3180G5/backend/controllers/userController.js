const User = require('../models/UserModel')
const mongoose = require('mongoose')

const userController = {
    getUser: async(req, res) => {
        const {id} = req.params
    
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({error: 'No User'})
        }
    
        const user = await User.findById(id)
    
        if(!user) {
            return res.status(404).json({error: 'No User'})
        }
    
        res.status(200).json(user)
    
    },
    createUser: async (req, res) =>{
        const {name, contact_number, email} = req.body
    
        try {
            const user = await User.create({name, contact_number, email})
            res.status(200).json(user)
        } catch (error) {
            res.status(400).json({error: error.message})
        }
    }
};

module.exports = userController;

/* module.exports = {
    getUser,
    createUser
} */