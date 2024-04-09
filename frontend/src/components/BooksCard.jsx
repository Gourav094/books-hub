import { useEffect, useState } from "react"
import {SEARCH_API} from "../utils/constant"
import { Link } from "react-router-dom"

const BooksCard = (search) => {
    const query = search.query
    const [booksData,setBooksData] = useState()
    useEffect(() => {
        if(!query){
            return
        }
        fetchData()
    },[query])

    const fetchData = async () => {
        const data = await fetch(SEARCH_API+query)
        const jsonData = await data.json()
        setBooksData(jsonData?.items)
        console.log(booksData)
    }
    if(!booksData)return 

  return (
    <div className="my-8 grid grid-cols-5 gap-10">
        {
            booksData.map((book) => (
                <div className='min-h-52 max-w-48  px-6 py-4' key={book.id}>
                    <Link to={`/${book.id}`}>
                    <img alt="thumbnail" className=" rounded-2xl h-48 shadow-xl " src={book?.volumeInfo?.imageLinks?.thumbnail}/>
                    </Link>
                    <div className="py-2 text-gray-700">
                        <p className="font-semibold text-md text-gray-700 truncate">{book.volumeInfo?.title}</p>
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
  )
}

export default BooksCard
