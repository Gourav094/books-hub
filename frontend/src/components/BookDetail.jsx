import { useContext, useEffect, useState } from "react"
import {  FaRegHeart } from "react-icons/fa";
import { MdOutlineWatchLater } from "react-icons/md"
import { IoBookOutline } from "react-icons/io5";
import { useParams } from "react-router-dom";
import BookShimmer from "./BookShimmer"
import TokenContext from "./TokenContext";
import toast,{Toaster} from 'react-hot-toast';
import { backend_API } from "../utils/constant";
import axios from "axios";

const BookDetail = () => {
    const bookId = useParams().bookId
    const [bookData,setBookData] = useState([])
    const [loading,setLoading] = useState(true)
    const {accessToken} = useContext(TokenContext)

    const fetchBook = async() => {
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes/${bookId}`)
        const json = response.data
        setBookData(json)
    }

    useEffect(() => {
        fetchBook()
    },[bookId])

    const handleBookShelf = (shelf) => {
        const addBook =async () => {
            await axios.post(`${backend_API}/user/add/book/${shelf}`, {
                volumeId: bookId
            }, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json' 
                }
            }).then(response => {
                setLoading(false);
                toast.success("Successfully added data to your list");
                console.log(response)
            }).catch(error => {
                setLoading(false);
                toast.error("Please login to add");
            });
        }
        setLoading(true)
        addBook()
    } 

    if(!bookData)return <BookShimmer/>

  return (
    <div className="max-w-6xl mx-auto">
        <div><Toaster/></div>
        <div className="grid grid-flow-col gap-8 py-10">
            <div className="flex flex-col gap-4">
                <img alt="bookImage" className='w-52 rounded-lg shadow' src={bookData?.volumeInfo?.imageLinks?.thumbnail} />
                {/* <Image src={bookData?.volumeInfo?.imageLinks?.large}/> */}
                <button className="text-center py-3 px-6 rounded-md text-white bg-black text-sm font-semibold">
                            <a href={bookData?.saleInfo?.buyLink} target="_blank">Get this book</a> </button>
            </div>
            <div className="text-sm">
                <h3 className="text-2xl font-semibold">{bookData?.volumeInfo?.title}</h3>
                <p className="py-1"><i>by {bookData?.volumeInfo?.authors[0]}</i></p>
                <p className="py-1">published on {bookData?.volumeInfo?.publishedDate}</p>
                <p className="py-1">Total pages: {bookData?.volumeInfo?.pageCount}</p>
                {
                    bookData?.volumeInfo?.categories.map((cat,index) => (<span className="bg-slate-200 px-1 rounded text-sm" key={index}>{cat}</span>))
                } 
                {
                    bookData?.saleInfo?.isEbook === "true" && <p>Ebook is available</p>     
                }
                
                <p className="py-2 tracking-wider">{bookData?.volumeInfo?.description?.replace(/<\/?[^>]+(>|$)/g, "")}</p>
                <div className="flex gap-6 py-6">
                    {/* <button className="flex gap-1 items-center border border-black py-3 px-6 rounded-md text-black font-semibold" onClick={() => handleBookShelf(0)}>
                    <FaRegBookmark />
                    Add to my bookshelf {loading&& "loading"}</button> */}
                    <button className="flex gap-2 items-center border border-black py-3 px-6 rounded-md text-black" onClick={() => handleBookShelf(0)}>
                        <FaRegHeart/>
                        <span className="font-semibold">Add to Favourates</span> </button>
                    <button className="flex gap-2 items-center border border-black py-3 px-6 rounded-md text-black" onClick={() => handleBookShelf(3)}>
                    <IoBookOutline />
                        <span className="text-sm font-semibold">currently Reading</span> </button>
                    <button className="flex gap-2 items-center border border-black py-3 px-6 rounded-md text-black" onClick={() => handleBookShelf(2)}>
                    <MdOutlineWatchLater />
                        <span className="font-semibold">Read later</span> </button>
                    
                </div>
            </div>
        </div>
    </div>
  )
}

export default BookDetail
