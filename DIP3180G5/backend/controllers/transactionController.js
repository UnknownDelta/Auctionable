// const { json } = require('express')
const Transaction = require('../models/TransactionModel')
const mongoose = require('mongoose')

const transactionController = {
    getTransaction: async(req, res) =>{
        const {item_id} = req.params
        const transactionList = await Transaction.find({item_id : item_id}).sort({createdAt:-1})
    
        res.status(200).json(transactionList)
    },
    createTransaction: async (req, res) =>{
        const {item_id, user_id, user_name, bid_price} = req.body
    
        try {
            const transactionList = await Transaction.create({item_id, user_id, user_name, bid_price})
            res.status(200).json(transactionList)
            console.log(json(transactionList))
        } catch (error) {
            res.status(400).json({error: error.message})
            console.log(error.message)
        }
    }
}

module.exports = transactionController