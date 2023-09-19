import { useEffect, useState } from 'react'

import ItemsDetail from '../components/ItemsDetails'

const Home = () => {
    const [items, setItems] = useState(null)
    useEffect(() => {
        const fetchItems = async () => {
            const response = await fetch('/list')
            const json = await response.json()

            if (response.ok) {
                setItems(json)
            }
        }

        fetchItems()
    },[])

    return (
        <div className="home">
            <div className="items">
                {items && items.map((items) => (
                    <ItemsDetail key={items._id} items = {items} pic = {items.images} />
                    
                ))}
            </div>
        </div>
    )
}

export default Home