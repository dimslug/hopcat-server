import "./App.css";
import Auth from "./components/auth/Auth";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/footer/Footer";
import 'bootstrap/dist/css/bootstrap.min.css';
import CreatorIndex from "./components/creator/CreatorIndex";

function App() {
  // Token use state set up
  const [sessiontoken, setSessionToken] = useState("");
  const [creatorID, setCreatorID] = useState("");

    console.log("Token: ", sessiontoken);
  
    const updateToken = (newToken) => {
      localStorage.setItem("token", newToken);
      setSessionToken(newToken);
    };

    const updateCreatorID = (newCreatorID) => {
      localStorage.setItem('creatorID', newCreatorID)
      setCreatorID(newCreatorID);
    }
  
    // Token use ref set up
    useEffect(() => {
      if (localStorage.getItem("token")) {
   
        setSessionToken(localStorage.getItem("token"));
      }
    }, []);

  return (
    <div className="App">
   

    {/* {sessiontoken !== "" ? (
      <Logout setSessionToken={setSessionToken} />
    ) : null} */}
    
    <Routes>
      <Route path="/" element={<Auth 
      updateToken={updateToken} 
      updateCreatorID={updateCreatorID}
        />} />
    
    </Routes>
    
    <Routes>
    <Route path="/creator/frontpage" element={<CreatorIndex 
    setSessionToken={setSessionToken}
    sessiontoken={sessiontoken} 
    setCreatorID={setCreatorID}
    creatorID={creatorID}
    />
    }
    />
    </Routes>
    <Routes>
    <Route path="/creator/drinks" element={<CreatorIndex 
    setSessionToken={setSessionToken}
    sessiontoken={sessiontoken}
    setCreatorID={setCreatorID} 
    creatorID={creatorID}
    currentPage={'drinks'}
    />
    }
    />
    </Routes>
    <Routes>
    <Route path="/creator/promos" element={<CreatorIndex 
    setSessionToken={setSessionToken}
    sessiontoken={sessiontoken}
    setCreatorID={setCreatorID} 
    creatorID={creatorID}
    currentPage={'promos'}
    />
    }
    />
    </Routes>
    {/* <Routes>
      <Route path="/influencer/frontpage" element={<InfluencerIndex />}/>
    </Routes> */}

    <Footer />
  </div>
  );
}

export default App;
