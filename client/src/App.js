import { useContext } from 'react';
import {Context} from './index';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import PlanPage from './pages/PlanPage'
import Errors from "./pages/Errors";
import Variant from "./pages/Variant";
import Profile from "./pages/Profile";


function App() {
  const {user} = useContext(Context);
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<PlanPage/>}/>
        <Route exact path="/errors" element={<Errors/>}/>
        <Route exact path="/variant" element={<Variant/>}/>
        <Route exact path="/profile" element={<Profile/>}/>
      </Routes>
  </Router>
  );
}

export default App;
