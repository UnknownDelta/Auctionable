import { useEffect, useState } from 'react'

import ItemsDetail from '../components/ItemsDetails'

const Past = () => {
    const [items, setItems] = useState(null)
    useEffect(() => {
        const fetchItems = async () => {
            const response = await fetch('/65070b8a410abaed8ffe4d50/pastlist')
            const json = await response.json()

            if (response.ok) {
                setItems(json)
            }
        }

        fetchItems()
    },[])
    

    if (items === null) {
        // Render a loading state or return null if you prefer
        return <div>Loading...</div>;
    }

    return (
        <div className="past">
            <div className="items">
                {items && items.map((items) => (
                    <ItemsDetail key={items._id} items = {items} pic = {items.images} />
                    
                ))}
            </div>
        </div>
    )
}

export default Past