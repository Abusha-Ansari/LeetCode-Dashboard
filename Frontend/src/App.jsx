import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
import Home from './pages/Home';
import About from './pages/About';
import AddProfile from "./pages/AddProfile";
import Page from './app/dashboard/page';

function App() {

  return (
    <>
     <Router>
      <Routes>
        <Route path="/" element={<Page />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/page" element={<Page />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signin" element={<SignupPage />} />
          <Route path="/addprofile" element={<AddProfile />} />
        </Route>
      </Routes>
    </Router>
    </>
  );
}

export default App;