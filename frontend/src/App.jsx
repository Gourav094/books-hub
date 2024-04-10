import { BrowserRouter as Router, Routes, Route,Navigate } from "react-router-dom";
import Body from "./components/Body";
import Header from "./components/Header";
import Search from "./components/Search";
import BookDetail from "./components/BookDetail";
import Login from "./components/Login";
import { useEffect, useState } from "react";
import TokenContext from "./components/TokenContext";
import BookShelf from "./components/BookShelf";
import toast,{Toaster} from "react-hot-toast"

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
        console.log(response)
        if(response.status === 200){
          return response.json()
        }
        else if(response.status === 401){
          toast.error("session timeout! Please login again")
        }
        else throw new Error("Authentication failed")
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
      <Toaster/>
      <Routes>
        <Route p ath="/" element={<Body />} />
        <Route path="/login" element={user ? <Navigate to="/"/> : <Login />} />
        <Route path="/search" element={<Search />} />
        <Route path="/bookshelf" element={!user ? <Navigate to="/"/> : <BookShelf />} />
        <Route path="/:bookId" element={<BookDetail/>} />
      </Routes>
    </Router>
    </TokenContext.Provider>
  );
}

export default App;