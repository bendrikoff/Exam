import {Context} from './index';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import PlanPage from './pages/PlanPage'
import Errors from "./pages/Errors";
import Variant from "./pages/Variant";
import Profile from "./pages/Profile";
import Auth from "./pages/Auth";
import Theme from "./pages/Theme";
import {React, useContext, useEffect, useState} from "react";
import {check} from "./http/userAPI";
import {Spinner} from "react-bootstrap";



function App() {
  const {user} = useContext(Context);

  const [loading, setLoading] = useState(true)

    useEffect(() => {
            check()
            .then(data => {
                user.setUser(data)
                user.setIsAuth(true)
                user.setId(data.id)
            })
            .finally(() => setLoading(false))
            .catch(()=>console.log('Cant login'))
    },  [user._isAuth])



    if (loading) {
        return <Spinner animation={"grow"}/>
    }

    const PrivateRoute = ({ element }) => {
      return user._isAuth ? (
        <>{element}</>
      ) : (
        <Navigate to="/login" replace={true} />
      );
    };
    
    return (
      <Router>
        <Routes>
          <Route path="*" element={<PrivateRoute element={<Navigate to ="/" />} />}/>
          <Route exact path="/" element={<PrivateRoute element={<PlanPage/>} />}/>
          <Route exact path="/errors" element={<PrivateRoute element={<Errors/>} />} />
          <Route exact path="/variant/:themeId" element={<PrivateRoute element={<Variant/>} />} />
          <Route exact path="/variant" element={<PrivateRoute element={<Variant/>} />} />
          <Route exact path="/profile" element={<PrivateRoute element={<Profile/>} />} />
          <Route exact path="/theme/:id" element={<PrivateRoute element={<Theme/>} />} />

          <Route path="/login" element={<Auth />} /> 
        </Routes>
    </Router>
   );

    

}

export default App;
