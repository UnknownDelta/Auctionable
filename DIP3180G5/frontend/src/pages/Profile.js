import { useEffect, useState } from 'react'

import ProfileDetails from '../components/ProfileDetails'

const Profile = () => {
    const [users, setusers] = useState(null)
    useEffect(() => {
        const fetchProfile = async () => {
            const response = await fetch('/user/65070b8a410abaed8ffe4d50')
            const json = await response.json()

            if (response.ok) {
                setusers(json)
            }
        }

        fetchProfile()
    },[])
    
    if (users === null) {
        // Render a loading state or return null if you prefer
        return <div>Loading...</div>;
    }
    
    return (
        <div className="Profile">
            <div className="users">
                <ProfileDetails key={users._id} users = {users} />
            </div>
        </div>
    )
}

export default Profile