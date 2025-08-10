import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/register";
import LoginPage from "./pages/login";
import {Toaster} from "sonner"
import HomePage from "./pages/home";
import LandingPage from "./pages/landing";


function App() {
  return (
    <>
    <Toaster richColors position="top-right" />
      <>
        <Routes>
          <Route path="/" element={<RegisterPage/>} />
          <Route path="/login-page" element ={<LoginPage />}/>
          <Route path="/home-page" element ={<HomePage/>}/>
          <Route path="/landing-page" element = {<LandingPage />}/>
        </Routes>
      </>
    </>
  );
}

export default App;
