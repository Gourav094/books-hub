import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"

const Header = (userDetail) => {
    const [showDropDown,setShowDropDown] = useState(false)
    const user = userDetail.user
    const dropDownRef = useRef(null);
    const handleLogout = () => {
        window.open('http://localhost:8000/auth/logout',"_self")
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
            <div className="relative max-w-[1300px] mx-auto flex justify-between">
                <p className="text-white text-xl">BooksHub</p>
                <ul className="flex items-center text-white gap-8">
                <Link to={"/"}><li className="cursor-pointer py-1 ">Home</li></Link>
                    <Link to={"/search"}><li className="cursor-pointer py-1 ">search</li></Link>
                    <li className="cursor-pointer py-1 ">Favourites</li>
                    {!user && <Link to="/login"><li className="cursor-pointer py-1 ">Sign in</li></Link>}
                    {user && <li ref={dropDownRef} className="cursor-pointer" onClick={handleDropDown}>{user?.profile?.displayName}</li>}
                </ul>
                {showDropDown && <div className="absolute right-0 z-10 mt-14 pb-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                    <div className="py-1" role="none">
                        <a href="#" className="text-gray-700 block px-6 py-3 text-sm border-b">Currently Reading</a>
                        <a href="#" className="text-gray-700 block px-6 py-3 text-sm border-b">To Read</a>
                        <a href="#" className="text-gray-700 block px-6 py-3 text-sm border-b">BookSelf</a>
                        <a href="#" className="text-gray-700 block px-6 py-3 text-sm border-b">Favourites</a>
                        <button className="text-gray-700 block w-full px-6 pt-2 text-left text-sm" onClick={handleLogout}>Log out</button>
                    </div>
                </div>}
            </div>
        </div>
    )
}

export default Header

// make a nnote on using passport verion something for protecting from error