import { useContext, useEffect, useState } from "react";
import TokenContext from "./TokenContext";
import { Link } from "react-router-dom";
import Loader from "./Loader";
import toast from "react-hot-toast"
const BookSelf = () => {
	const { accessToken } = useContext(TokenContext);
    const [bookData,setBookData] = useState([])
    const [loading,setLoading] = useState(false)
    const fetchData = (shelfId) => {
        setLoading(true)
        fetch(`http://localhost:8000/user/bookself/${shelfId}`,{
            method:'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
        }).then(response => {
            return response.json()
        }).then(data => {
            console.log(data)
            setBookData(data)
            console.log(bookData)
            setLoading(false)
        })
        .catch(() => {
            setLoading(false)
            toast.error("Please try again")
            console.log("Error in getting books data")
        })
    }

    useEffect(() => {
        fetchData(0)
    },[])
    if(!bookData)return
    console.log(bookData?.data?.items)
    

	return <div className="flex">
        <div className="min-w-60 bg-gray-100 p-4 border-r min-h-screen overflow-y-hidden">
            <ul>
                <li className="py-2 px-3 rounded-lg cursor-pointer font-medium hover:bg-gray-50 my-2" onClick={() => fetchData(0)}>Favourites</li>
                <li className="py-2 px-3 rounded-lg cursor-pointer font-medium hover:bg-gray-50 my-2" onClick={() => fetchData(0)}>To read</li>
                <li className="py-2 px-3 rounded-lg cursor-pointer font-medium hover:bg-gray-50 my-2" onClick={() => fetchData(0)}>Currently reading</li>
                <li className="py-2 px-3 rounded-lg cursor-pointer font-medium hover:bg-gray-50 my-2" onClick={() => fetchData(0)}>Currently reading</li>
            </ul>
        </div>
        <div className="px-10 py-6 w-full">
            <h1 className="text-lg px-6 pb-4 font-medium">Your books:</h1>
            {loading ? (
                <Loader/>
            ) : (
                <div className="flex flex-wrap gap-10">
                    {
                        bookData?.data?.items?.map((book) => (
                            <div className='min-h-52 w-48 px-6 py-4' key={book.id}>
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
                                </div>
                            </div>
                        ))
                    }
                </div>
            )}
        </div>
    </div>;
};

export default BookSelf;
