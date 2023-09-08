import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/pages/Login';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './components/pages/Dashboard';
import Register from './components/pages/Register';
import FBIntegrate from './components/pages/FBIntegrate';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<Navigate to="/login" />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/fbIntegrate" element={<FBIntegrate />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
