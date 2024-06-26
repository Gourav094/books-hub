import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import Body from "./components/Body";
import Header from "./components/Header";
import Search from "./components/Search";
import BookDetail from "./components/BookDetail";
import Login from "./components/Login";
import { useEffect, useState } from "react";
import TokenContext from "./components/TokenContext";
import BookShelf from "./components/BookShelf";
import toast, { Toaster } from "react-hot-toast";
import { backend_API } from "./utils/constant";
import axios from "axios";
import Cookies from "js-cookie";
function App() {
	const [user, setUser] = useState();
	const [token, setToken] = useState();
	const userCookie = Cookies.get("user-data");
	// console.log(JSON.parse(userCookie));
	useEffect(() => {
		const getUser = async () => {
			try {
				const response = await axios.get(`${backend_API}/login/success`,{ withCredentials: true });
				if (response.status === 401) {
					toast.error("Session timeout! Please login again");
				} else if (response.status === 200) {
					console.log(response.data);
					setUser(response.data.user);
					setToken(response.data.user?.accessToken);
				} else throw new Error("Authentication failed");
			} catch (error) {
				console.log("error occurred in authentication", error);
			}
		};
		if(!user){
			getUser();
		}
		if(userCookie){
			const userDataFromCookie = JSON.parse(userCookie);
			setToken(userDataFromCookie.accessToken);
			setUser(userDataFromCookie.profile);
		}
		console.log(user)
	}, []);
	return (
		<TokenContext.Provider value={{ accessToken: token, setToken }}>
			<Router>
				{<Header user={user} />}
				<Toaster />
				<Routes>
					<Route path="/" element={<Body />} />
					<Route
						path="/login"
						element={user ? <Navigate to="/" /> : <Login />}
					/>
					<Route path="/search" element={<Search />} />
					<Route
						path="/bookshelf"
						element={!user ? <Navigate to="/" /> : <BookShelf />}
					/>
					<Route path="/:bookId" element={<BookDetail />} />
				</Routes>
			</Router>
		</TokenContext.Provider>
	);
}

export default App;
