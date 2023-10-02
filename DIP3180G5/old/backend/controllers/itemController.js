const Item = require('../models/itemModel')
const express = require('express')
const mongoose = require('mongoose')

// get all items
const getItems = async (req, res) => {
  const items = await Item.find({}).sort({createdAt: -1})
  res.status(200).json(items)
}

// get a single item
const getItem = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such item'})
  }
  const item = await Item.findById(id)

  if (!item) {
    return res.status(404).json({error: 'No such item'})
  }
  res.status(200).json(item)
}

// create a new item
const createItem = async (req, res) => {
  const {name, price, description, image} = req.body

  let emptyFields = []

  if (!name) {
    emptyFields.push('name')
  }
  if (!price) {
    emptyFields.push('price')
  }
  if (!description) {
    emptyFields.push('description')
  }
  if (!image) {
    emptyFields.push('image')
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
  }
  // add document to the database
  try {
    const item = await Item.create({ name, price, description, image })
    res.status(200).json(item)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// delete a item
const deleteItem = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such item'})
  }
  const item = await Item.findOneAndDelete({_id: id})

  if (!item) {
    return res.status(400).json({error: 'No such item'})
  }
  res.status(200).json(item)
}
// update a item
const updateItem = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such item'})
  }
  const item = await Item.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!item) {
    return res.status(400).json({error: 'No such item'})
  }
  res.status(200).json(item)
}

const searchItems = async (req, res) => {
  res.status(200).json("hi"); // this line will show in postman if use localhost:4000/api/items/search?q=mario
  // like if u close the terminals and restart the frontend and backend postman will show hi,
  // then after that if u send the same request again it error alrd until u restart terminals
  // in browser, code did not even reach here, did not print out hi
  // this line from Search.js has this q thing : const response = await fetch(`/api/items/search?q=${term}`);
  const searchTerm = req.query.q; // Access this query parameter from Search.js using req.query.q
  console.log("this is searchTerm in itemController.js", searchTerm); // this part does not get printed out
  // if pipeline only 1 stage no need array // TRY THIS LATER, tried..
  try {
    // most prob something wrong here, but not just here it does not go to searchItems at all from browser
    console.log("enters try block");
    const pipeline = {
      $search: {
        index: 'autocomplete_items', // Replace with the name of your search index
        text: {
          query: searchTerm,
          path: {
            wildcard: '*',
          },
        },
      },
    };
    // Perform the search and return the results
    //console.log("CODE IS NOT WORKING HERE");
    const results = await Item.aggregate(pipeline); // Assuming 'Item' is your MongoDB model
    // console.log("pipeline results in itemController.js", results);
    // const suggestions = results.map((result) => [result.name, result.description]).flat(); // flat method to flatten the array of arrays into a single array of suggestions 
    // console.log("suggestions: ", suggestions);
    // console.log("hi");
    res.status(200).json(pipeline); // whether i put this line currently makes no difference cause i think the lines above this in the try block has errors already, it goes to the catch block before reaching here
    // // res.status(200).json(results);
  } catch (error) {
    console.error('Error executing Atlas Search query:', error);
    res.status(500).json({ error: 'Internal server error' }); // what postman shows
  }
};


module.exports = {
  getItems,
  getItem,
  createItem,
  deleteItem,
  updateItem,
  searchItems
}