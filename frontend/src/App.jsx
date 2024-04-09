import { BrowserRouter as Router, Routes, Route,Navigate } from "react-router-dom";
import Body from "./components/Body";
import Header from "./components/Header";
import Search from "./components/Search";
import BookDetail from "./components/BookDetail";
import Login from "./components/Login";
import { useEffect, useState } from "react";
import TokenContext from "./components/TokenContext";
import BookSelf from "./components/BookSelf";

function App() {
  const [user,setUser] = useState()
  const [token,setToken]  = useState()
  useEffect(() => {
    const getUser = () => {
      fetch('http://localhost:8000/login/success',{
        method:'GET',
        credentials:'include',
        headers:{
          Accept: "application/json",
          "Content-Type":"application/json",
          "Access-Control-Allow-Credentials":true
        }
      }).then((response) => {
        if(response.status === 200){
          return response.json()
        }
        else throw new Error("Authentication failed! Please try again")
      }).then(res => {
        setUser(res.user)
        setToken(res.user?.accessToken);
      }).catch(err => {
        console.log(err)
      })
    }
    getUser()
  },[]) 

  return (
    <TokenContext.Provider value={{ accessToken: token, setToken }}>
    <Router>
      {<Header user={user}/>}
      <Routes>
        <Route path="/" element={<Body />} />
        <Route path="/login" element={user ? <Navigate to="/"/> : <Login />} />
        <Route path="/search" element={<Search />} />
        <Route path="/bookself" element={<BookSelf />} />
        <Route path="/:bookId" element={<BookDetail/>} />
      </Routes>
    </Router>
    </TokenContext.Provider>
  );
}

export default App;