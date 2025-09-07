import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './page/Home'
import Login from './page/Login'
import Verify from './page/Verify'
import { UserData } from './context/UserContext'
import { LoadingBig } from './components/Loading'

const App = () => {
  const { user, isAuth, loading } = UserData();

  // if (loading) {
  //   return <h1 className='text-3xl text-white'>Loading...</h1>;
  // }

  return (
    <>
    {loading ?(
   <LoadingBig/>
    ):(

<BrowserRouter>
      <Routes>
        <Route path='/' element={isAuth ? <Home /> : <Login />} />
        <Route path='/login' element={isAuth ? <Home /> : <Login />} />
        <Route path='/verify' element={isAuth ? <Home /> : <Verify />} />
      </Routes>
    </BrowserRouter>
    )}
    
    </>
    
  )
}

export default App;
