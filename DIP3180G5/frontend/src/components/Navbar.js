import { Link, NavLink } from 'react-router-dom'

const Navbar = () => {
    return (
        <header>
            <div className="container">
                <div className='links'>
                    <Link to="/">Home</Link>
                </div>
                <div className='links'>
                    <NavLink to="/profile">User</NavLink>
                </div>
                <div className='links'>
                    <NavLink to="/create">Create New</NavLink>
                </div>
                <div className='links'>
                    <NavLink to="/signup">Sign Up</NavLink>
                </div>
                <div className='links'>
                    <NavLink to="/past">Past List</NavLink>
                </div>
                <div className='links'>
                    <NavLink to="/current">Listing</NavLink>
                </div>
                <div className='links'>
                    <NavLink to="/update">Update List</NavLink>
                </div>
            </div>
        </header>
    )
}

export default Navbar