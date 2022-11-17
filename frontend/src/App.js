import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './pages/home.js';
import AccountPage from './pages/account.js';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element = {<HomePage/>} />
        <Route path="/account" element = {<AccountPage/>} />

      </Routes>
    </Router>
  );
}

export default App;

