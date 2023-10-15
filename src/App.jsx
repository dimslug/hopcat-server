import "./App.css";
import Auth from "./components/auth/Auth";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Nav from "./components/nav/Nav";
import InflHome from "./components/inflhome/InflHome";


function App() {
  // Token use state set up
  const [sessionToken, setSessionToken] = useState("");

  console.log("Token: ", sessionToken);

  const updateToken = (newToken) => {
    localStorage.setItem("token", newToken);
    setSessionToken(newToken);
  };

  // Token use ref set up
  useEffect(() => {
    if (localStorage.getItem("token")) {

      setSessionToken(localStorage.getItem("token"));
    }
  }, []);

  return (
    <div className="App">
      <Nav setSessionToken={setSessionToken}
        sessionToken={sessionToken} />
        
      <Routes>
        <Route path="/" element={<Auth updateToken={updateToken} />} />
        <Route path="/inflHome" element={<InflHome updateToken={updateToken} />} />

      </Routes>

      <Footer />
    </div>
  );
}

export default App;