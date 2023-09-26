const ProfileDetails = ({users}) =>{
    return(
        <div className="user-details">
            <h4>{users.name}</h4>
            <p>email: {users.email}</p>
            <p>contact No: {users.contact_number}</p>
            <p>{users.createdAt}</p>
        </div>
    )
    
}

export default ProfileDetails