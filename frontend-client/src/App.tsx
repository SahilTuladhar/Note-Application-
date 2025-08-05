import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/register";
import LoginPage from "./pages/login";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<RegisterPage/>} />
          <Route path="/login-page" element ={<LoginPage />}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
