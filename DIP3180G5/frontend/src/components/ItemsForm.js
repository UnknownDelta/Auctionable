import { useState } from "react"

const ItemsForm = () => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [condition, setCondition] = useState('Factory New')
    const [years_used, setYears] = useState('')
    const [category, setCategory] = useState('Car')
    const [new_used, setUsed] = useState(false)
    const [images, setImage] = useState('')
    const [seller, setSeller] = useState('65070b8a410abaed8ffe4d50')
    const [sold, setSold] = useState(false)
    const [qty, setQty] = useState('')
    const [error, setError] = useState(null)
    const [selectedFile, setSelectedFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);


    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
          setSelectedFile(file);
    
          // You can also show a preview of the selected image here if needed
          const reader = new FileReader();
          reader.onload = () => {
            setImageUrl(reader.result);
            const base64String = reader.result.split(',')[1]; // Extract the base64 part
            setImage(base64String);
          };
          reader.readAsDataURL(file);
        }
      };
    
      const handleUpload = async () => {
        if (!selectedFile) {
          alert('Please select an image to upload.');
          return;
        }
    }
    const handleCheckboxChange = (e) =>{
        setUsed(e.target.checked)
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        
        const items = {name, price, description, condition, years_used, category, new_used, images, seller, sold, qty}
    
        const response = await fetch('/createlist', {
            method: 'POST',
            body: JSON.stringify(items),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()
    try{
        if (!response.ok) {
            const responseBody = await response.text()
            console.error('Server response:', responseBody)
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
            setImage(null)
            setSeller('65070b8a410abaed8ffe4d50')
            setSold(false)
            setQty('')
            setError(null)
            console.log('new item added')
        }
    }catch(error) {
        console.error('Error:', error)
    setError('Error')
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
            <input type ="checkbox" checked={new_used} onChange={handleCheckboxChange}
            />

            <input type="file" accept="image/*" onChange={handleFileChange} />
          {selectedFile && <button onClick={handleUpload}>Upload</button>}
          {imageUrl && (
            <div>
              <h2>Selected Image:</h2>
              <img src={imageUrl} alt="Selected" style={{ maxWidth: '100%' }} />
            </div>
          )}
            <label>qty</label>
            <input type ="number" onChange={(e) => setQty(e.target.value)}
            />
            
            <button onClick ={handleSubmit}>Add Item</button>
            {error && <div className="error">{error}</div>}

        </form>
    )
}

export default ItemsForm 