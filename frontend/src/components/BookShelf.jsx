import { useContext, useEffect, useState } from "react";
import TokenContext from "./TokenContext";
import { Link } from "react-router-dom";
import Loader from "./Loader";
import toast from "react-hot-toast"
import { MdOutlineDelete, MdOutlineWatchLater } from "react-icons/md";
import { IoBookOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
const BookShelf = () => {
	const { accessToken } = useContext(TokenContext);
    const [shelf,setShelf] = useState(0)
    const [bookData,setBookData] = useState([])
    const [loading,setLoading] = useState(false)

    const fetchData = (shelfId) => {
        console.log("fetching book favourite data")
        setShelf(shelfId)
        setLoading(true)
        fetch(`http://localhost:8000/user/bookshelf/${shelfId}`,{
            method:'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
        }).then(response => {
            return response.json()
        }).then(data => {
            setBookData(data)
            setLoading(false)
        })
        .catch(() => {
            setLoading(false)
            toast.error("Please try again")
            console.log("Error in getting books data")
        })
    }
    console.log(bookData.length)
    useEffect(() => {
        fetchData(0)
    },[])

    const handleRemoveBook = (volumeId, shelfId) => {
        const removeBook = async () => {
            try {
                await fetch(`http://localhost:8000/user/remove/book/${shelfId}`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        volumeId: volumeId
                    })
                });
    
                toast.success("Successfully removed from your list");
                setLoading(false);
                fetchData(shelfId);
            } catch (error) {
                console.error("Error removing book:", error);
                setLoading(false);
                toast.error("Please login to remove");
            }
        };  
        setLoading(true);
        removeBook();
    };
    

	return <div className="flex">
        <div className="min-w-60 bg-gray-100 p-4 border-r min-h-screen overflow-y-hidden">
            <ul>
                <li className="flex items-center gap-2 py-2 px-3 rounded-lg cursor-pointer font-medium hover:bg-gray-50 my-2" onClick={() => fetchData(0)}>
                <FaRegHeart/>
                    Favourites</li>
                <li className="flex items-center gap-2 py-2 px-3 rounded-lg cursor-pointer font-medium hover:bg-gray-50 my-2" onClick={() => fetchData(3)}>
                <IoBookOutline />
                    To read</li>
                <li className="flex items-center gap-2 py-2 px-3 rounded-lg cursor-pointer font-medium hover:bg-gray-50 my-2" onClick={() => fetchData(2)}>
                <MdOutlineWatchLater />
                    Currently reading</li>
            </ul>
        </div>
        <div className="px-10 py-6 w-full">
            <h1 className="text-lg px-6 pb-4 font-medium">Your books:</h1>
            {loading ? (
                <div className="pl-24 py-16"><Loader/></div>
            ) : (
                !bookData.length? (
                    <h1 className="flex items-center justify-center pt-32 text-xl">Add books to see your bookshelf</h1>
                ) : (
                    <div className="flex flex-wrap gap-10">
                    {
                        bookData?.data?.items?.map((book) => (
                            <div className='min-h-52 w-48 px-6 py-4 ' key={book.id}>
                                <Link to={`/${book.id}`}>
                                    <img alt="thumbnail" className="object-cover rounded-2xl h-48 shadow-xl " src={book?.volumeInfo?.imageLinks?.thumbnail}/>
                                </Link>
                                <div className="py-2 w-full text-gray-700">
                                    <p className="font-semibold text-md text-gray-700 text-wrap">{book.volumeInfo?.title}</p>
                                    {/* <p className="text-sm truncate">{book?.volumeInfo?.authors[0]}</p> */}
                                    <p className="text-sm">{book?.volumeInfo?.averageRating}</p>
                                    <p className="text-sm">{book?.volumeInfo?.categories}</p>
                                    <p className="text-sm">{book?.volumeInfo?.pageCount} pages</p>
                                    <p className="text-sm">{book?.volumeInfo?.publishedDate}</p>
                                    <p className="underline text-sm cursor-pointer" onClick={() => handleRemoveBook(book.id,shelf)}>remove</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
                ) 
            )}
        </div>
    </div>;
};

export default BookShelf;
