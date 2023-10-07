import { useState } from 'react'
import { useItemsContext } from "../hooks/useItemsContext"

const ItemForm = () => {
  const { dispatch } = useItemsContext()
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    const item = {name, price, description, image}
    const response = await fetch('/api/items', {
      method: 'POST',
      body: JSON.stringify(item),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)

    }
    if (response.ok) {
      setName('')
      setPrice('')
      setDescription('')
      setImage('')
      setError(null)
      setEmptyFields([])
      console.log('new item added:', json)
      dispatch({type: 'CREATE_ITEM', payload: json})
    }

  }
  return (
    <form className="create" onSubmit={handleSubmit}> 
      <h3>Add a New Item</h3>

      <label>Product Name:</label>
      <input 
        type="text" 
        onChange={(e) => setName(e.target.value)} 
        value={name}
        className={emptyFields.includes('name') ? 'error' : ''}
      />
      <label>Price ($):</label>
      <input 
        type="number" 
        onChange={(e) => setPrice(e.target.value)} 
        value={price}
        className={emptyFields.includes('price') ? 'error' : ''}
      />
      <label>Description:</label>
      <input 
        type="text" 
        onChange={(e) => setDescription(e.target.value)} 
        value={description}
        className={emptyFields.includes('description') ? 'error' : ''}
      />
      <label>Image:</label>
      <input 
        type="text" 
        onChange={(e) => setImage(e.target.value)} 
        value={image}
        className={emptyFields.includes('image') ? 'error' : ''}
      />
      <button>Add Item</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}
export default ItemForm