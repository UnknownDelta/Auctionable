import { useItemsContext } from '../hooks/useItemsContext'
// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
const ItemDetails = ({ item }) => {
  const { dispatch } = useItemsContext()
  const handleClick = async () => {
    const response = await fetch('/api/items/' + item._id, {
      method: 'DELETE'
    })
    const json = await response.json()
    if (response.ok) {
      dispatch({type: 'DELETE_ITEM', payload: json})
    }
  }
  return (
    <div className="products-container">
      <div className="item-details">
        <img src={item.image} alt={item.name} className="item-image" />
        <h4>{item.name}</h4>
        <p><strong>Price ($): </strong>{item.price}</p>
        <p><strong>Description: </strong>{item.description}</p>
        <p><strong>{formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}</strong></p>
        <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
      </div>
    </div>
  )
}
  
export default ItemDetails