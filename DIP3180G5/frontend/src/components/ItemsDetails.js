const ItemsDetails = ({items}) =>{
    return(
        <div className="item-details">
            <h4>{items.name}</h4>
            <p>price: {items.price}</p>
            <p>condition: {items.condition}</p>
            <p>years used: {items.years_used}</p>
            <p>category:{items.category}</p>
            <p>images:</p> <p>test</p>
            <img src={`data:image/png;base64,${items.images}`} alt="pic"/>
            <p>{items.createdAt}</p>
        </div>
    )
    
}

export default ItemsDetails