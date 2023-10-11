import { useState } from "react"

const ItemsForm = () => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [condition, setCondition] = useState('')
    const [years_used, setYears] = useState('')
    const [category, setCategory] = useState('')
    const [new_used, setUsed] = useState('')
    const [images, setImage] = useState('')
    const [seller, setSeller] = useState('')
    const [sold, setSold] = useState('')
    const [qty, setQty] = useState('')
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        setSeller('65070b8a410abaed8ffe4d50')
        setSold('false')
        const items = {name, price, description, condition, years_used, category, new_used, images, seller, sold, qty}
        
        const response = await fetch('/createitem', {
            method: 'POST',
            body: JSON.stringify(items),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
        }
        if (response.ok) {
            setName('')
            setPrice('')
            setDescription('')
            setCondition('')
            setYears('')
            setCategory('')
            setUsed('')
            setImage('')
            setSeller('')
            setSold('')
            setQty('')
            setError(null)
            console.log('new item added')
        }
    }
    return (
        <form className="createItems" onSubmit={handleSubmit}>
            <h3>Add a new Item</h3>

            <label>Name</label>
            <input type ="text" onChange={(e) => setName(e.target.value)}
            />

            <label>Price</label>
            <input type ="number" onChange={(e) => setPrice(e.target.value)}
            />

            <label>description</label>
            <input type ="text" onChange={(e) => setDescription(e.target.value)}
            />

            <label>condition</label>
            <select name = "condition" onChange={(e) => setCondition(e.target.value)}>
                <option value = "Factory New">Factory New</option>
                <option value = "Good">Good</option>
                <option value = "Decent">Decent</option>
                <option value = "Poor">Poor</option>
                <option value = "Bad">Bad</option>
            </select>
            
            <label>Years used</label>
            <input type ="number" onChange={(e) => setYears(e.target.value)}
            />

            <label>Category</label>
            <select name = "category" onChange={(e) => setCategory(e.target.value)}>
                <option value = "Car">Car</option>
                <option value = "Motorbike">Motorbike</option>
                <option value = "Van">Van</option>
            </select>

            <label>New</label>
            <input type ="radio" id="true" value = "true" onChange={(e) => setUsed(e.target.value)}
            />
            <label>Used</label>
            <input type ="radio" id="false" value = "true" onChange={(e) => setUsed(e.target.value)}
            />

            <label>Images</label>
            <input type ="file" onChange={(e) => setImage(e.target.value)}
            />
                        
            <label>qty</label>
            <input type ="number" onChange={(e) => setQty(e.target.value)}
            />
            
            <button>Add Item</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default ItemsForm 