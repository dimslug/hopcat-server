
import "tw-elements-react/dist/css/tw-elements-react.min.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css";
import Auth from "./components/auth/Auth";
import { useEffect, useState  } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Footer from "./components/footer/Footer";
import CreatorIndex from "./components/creator/CreatorIndex";

// import DrinkCreate from "./components/createforms/DrinkCreate";
// import PromoCreate from "./components/createforms/PromoCreate";
// import DrinkEdit from "./components/editforms/DrinkEdit";
// import PromoEdit from "./components/editforms/PromoEdit";
import CreateIndex from "./components/createforms/CreateIndex";
import EditIndex from "./components/editforms/EditIndex";

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

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const currentPageProp = queryParams.get('currentPage');

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
    
    {/* </Routes>
    
    <Routes> */}
    <Route path="/creator/frontpage" element={<CreatorIndex 
    setSessionToken={setSessionToken}
    sessiontoken={sessiontoken} 
    setCreatorID={setCreatorID}
    creatorID={creatorID}
    />
    }
    />
    {/* </Routes>
    <Routes> */}
    <Route path="/creator/drinks" element={<CreatorIndex 
    setSessionToken={setSessionToken}
    sessiontoken={sessiontoken}
    setCreatorID={setCreatorID} 
    creatorID={creatorID}
    currentPage={'drinks'}
    />
    }
    />
    {/* </Routes>
    <Routes> */}
    <Route path="/creator/promos" element={<CreatorIndex 
    setSessionToken={setSessionToken}
    sessiontoken={sessiontoken}
    setCreatorID={setCreatorID} 
    creatorID={creatorID}
    currentPage={'promos'}
    />
    }
    />
    {/* </Routes>
    <Routes> */}
         <Route path="/creator/create" element={<CreateIndex 
    setSessionToken={setSessionToken}
    sessiontoken={sessiontoken}
    setCreatorID={setCreatorID} 
    creatorID={creatorID}
    currentPage={currentPageProp}
    />
    }
    />
             <Route path="/creator/edit" element={<EditIndex 
    setSessionToken={setSessionToken}
    sessiontoken={sessiontoken}
    setCreatorID={setCreatorID} 
    creatorID={creatorID}
    currentPage={currentPageProp}
    />
    }
    />
    {/* <Route path="/drink/create" element={<DrinkCreate 
    setSessionToken={setSessionToken}
    sessiontoken={sessiontoken}
    setCreatorID={setCreatorID} 
    creatorID={creatorID}
    currentPage={'drinks'}
    />
    }
    />
    <Route path="/promo/create" element={<PromoCreate 
    setSessionToken={setSessionToken}
    sessiontoken={sessiontoken}
    setCreatorID={setCreatorID} 
    creatorID={creatorID}
    currentPage={'promos'}
    />
    }
    /> */}
        {/* <Route path="/drink/update" element={<DrinkEdit 
    setSessionToken={setSessionToken}
    sessiontoken={sessiontoken}
    setCreatorID={setCreatorID} 
    creatorID={creatorID}
    currentPage={'drinks'}
    />
    }
    />
    <Route path="/promo/update" element={<PromoEdit 
    setSessionToken={setSessionToken}
    sessiontoken={sessiontoken}
    setCreatorID={setCreatorID} 
    creatorID={creatorID}
    currentPage={'promos'}
    />
    }
    /> */}
    </Routes>
    {/* <Routes>
      <Route path="/influencer/frontpage" element={<InfluencerIndex />}/>
    </Routes> */}

    <Footer />
  </div>
  );
}

export default App;
