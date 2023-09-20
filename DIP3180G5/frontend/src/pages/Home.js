// import { useEffect, useState } from "react"
import { useEffect, useState } from "react"
import { useItemsContext } from "../hooks/useItemsContext"

// components
import ItemDetails from "../components/ItemDetails"
import ItemForm from "../components/ItemForm"
import Search from "../components/Search"; // Import the Search component

const Home = () => {
  const { items, dispatch } = useItemsContext()
  const [filteredItems, setFilteredItems] = useState([]);
  useEffect(() => {
    const fetchItems = async () => {
      const response = await fetch('/api/items')
      const json = await response.json()
      console.log("json: ", json);

      if (response.ok) {
        dispatch({type: 'SET_ITEMS', payload: json})
        setFilteredItems(json); // Initialize filteredItems with all items
      }
    }
    fetchItems()
  }, [dispatch])

  // Handle the search function
  const handleSearch = (searchTerm) => {
    const filtered = items.filter((item) => {
      return (
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    setFilteredItems(filtered);
  };

  return (
    <div className="home">
      <div className="search-container">
        <Search handleSearch={handleSearch} /> {/* Render the Search component */}
      </div>
      <div className="items-container">
        {filteredItems && filteredItems.map((item) => (
          <ItemDetails key={item._id} item={item} />
        ))}
      </div>
      <div className="form-container">
        <ItemForm />
      </div>
    </div>
  )
}
export default Home