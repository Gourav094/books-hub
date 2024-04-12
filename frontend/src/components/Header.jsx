import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import toast,{Toaster} from "react-hot-toast"
import logo from "../assets/book.png"
import { backend_API } from "../utils/constant"

const Header = (userDetail) => {
    const [showDropDown,setShowDropDown] = useState(false)
    const user = userDetail.user
    const dropDownRef = useRef(null);
    const handleLogout = () => {
        window.open(`${backend_API}/auth/logout`,"_self")
    }

    const handleDropDown = () => {
        setShowDropDown(!showDropDown)
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
                setShowDropDown(false);
            }
        };

        if (showDropDown) {
            document.addEventListener('click', handleClickOutside);
        } else {
            document.removeEventListener('click', handleClickOutside);
        }

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [showDropDown]);

    return (
        <div className="bg-slate-800 py-6">
            <div><Toaster/></div>
            <div className="relative max-w-[1300px] mx-auto flex justify-between">
                <div className="flex items-center gap-2">
                    <img className="h-10" src={logo} />
                    <p className="text-white text-xl font-medium">BooksHub</p>
                </div>
                <ul className="flex items-center text-white gap-8">
                    <Link to={"/"}><li className="cursor-pointer py-1 hover:border-b transition-all">Home</li></Link>
                    <Link to={"/search"}><li className="cursor-pointer py-1 hover:border-b transition-all">search</li></Link>
                    { user ? (<Link to={"/bookshelf"}><li className="cursor-pointer py-1 hover:border-b transition-all">BookShelf</li></Link>):
                    (<li className="cursor-pointer py-1 " onClick={() => toast.error("Please login first")}>BookShelf</li>)}
                    {!user && <Link to="/login"><li className="cursor-pointer py-1 hover:border-b transition-all">Sign in</li></Link>}
                    {user && <li ref={dropDownRef} className="cursor-pointer transition-all py-1 bg-slate-700 rounded-full px-3" onClick={handleDropDown}>{user?.profile?.displayName[0]}</li>}
                </ul>
                {showDropDown && <div className="absolute right-0 z-10 mt-16 pb-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                    <div className="py-1" role="none">
                        <Link to={"/bookshelf"} className="text-gray-700 block px-6 py-3 text-sm border-b">Favourites</Link>
                        <Link to={"/bookshelf"} className="text-gray-700 block px-6 py-3 text-sm border-b">To Read</Link>
                        <Link to={"/bookshelf"} className="text-gray-700 block px-6 py-3 text-sm border-b">Currently Reading</Link>
                        <button className="text-gray-700 block w-full px-6 pt-2 text-left text-sm" onClick={handleLogout}>Log out</button>
                    </div>
                </div>}
            </div>
        </div>
    )
}

export default Header

// make a nnote on using passport verion something for protecting from error