import { useState } from "react"

const UserForm = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [contact_number, setContactNumber] = useState('')
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const users = {name, email, contact_number}
        
        const response = await fetch('/createuser', {
            method: 'POST',
            body: JSON.stringify(users),
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
            setEmail('')
            setContactNumber('')
            setError(null)
            console.log('new item added')
        }
    }
    return (
        <form className="createUser" onSubmit={handleSubmit}>
            <h3>Add a new User</h3>

            <label>Name</label>
            <input type ="text" onChange={(e) => setName(e.target.value)}
            />

            <label>Email</label>
            <input type ="email" onChange={(e) => setEmail(e.target.value)}
            />

            <label>Contact Number</label>
            <input type ="tel" pattern="[0-9]{8}" onChange={(e) => setContactNumber(e.target.value)}
            />
 
            <button>Add User</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default UserForm 