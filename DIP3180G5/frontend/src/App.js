import { BrowserRouter, Routes, Route} from 'react-router-dom'

import Home from './pages/Home'
import Current from './pages/Current'
import Past from './pages/Past'
import Navbar from './components/Navbar'
import Profile from './pages/Profile'
import CreateItems from './pages/CreateItems'
import CreateUser from './pages/CreateUser'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route 
            path="/"
            element={<Home />}
            />
            <Route path="/current"
            element={<Current />}
            />
            <Route path="/past"
            element={<Past />}
            />
            <Route path="/profile"
            element={<Profile />}
            />
            <Route path="/create"
            element={<CreateItems />}
            />
            <Route path="/signup"
            element={<CreateUser />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
