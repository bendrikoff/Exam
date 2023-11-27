import {Context} from './index';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import PlanPage from './pages/PlanPage'
import Errors from "./pages/Errors";
import Variant from "./pages/Variant";
import Profile from "./pages/Profile";
import Auth from "./pages/Auth";
import {useContext, useEffect, useState} from "react";
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
    }, [])



    if (loading) {
        return <Spinner animation={"grow"}/>
    }

    if(user._isAuth) {
      return (
        <Router>
          <Routes>
            <Route path="*" element={<Navigate to ="/" />}/>
            <Route exact path="/" element={<PlanPage/>}/>
            <Route exact path="/errors" element={<Errors/>}/>
            <Route exact path="/variant" element={<Variant/>}/>
            <Route exact path="/profile" element={<Profile/>}/>
            <Route exact path="/login" element={<Auth/>}/>
          </Routes>
      </Router>
     );
    } else {
      return (
        <Router>
          <Navigate to="/login" />
          <Routes>
            <Route exact path="/login" element={<Auth/>}/>
          </Routes>
        </Router>
        );
    }

    

}

export default App;
