import { useEffect, useRef, useState } from "react";
import searchImage from "../assets/book-background.jpg"
import BooksCard from "./BooksCard"
import {SEARCH_API} from "../utils/constant"
import { IoIosSearch } from "react-icons/io";
import Loader from "./Loader";
import axios from "axios";
const Search = () => {
  const [query,setQuery] = useState('')
  const searchResultsRef = useRef(null);
  const [booksData,setBooksData] = useState()
  const [loading,setLoading] = useState(false)

  const handleSearchScroll = () => {
      if (searchResultsRef.current) {
          searchResultsRef.current.scrollIntoView({ behavior: 'smooth' });
      }
  };

  const handleSearch = async(e) => {
    setLoading(true)
    e.preventDefault()
    await fetchData()
    setLoading(false)
  }

  useEffect(() => {
    handleSearchScroll();
  }, [booksData]);

  const fetchData = async () => {
      const response = await axios.get(SEARCH_API+query)
      // const jsonData = await data.json()
      setBooksData(response.data?.items)
  }

  return (
    <div className="bg-neutral-200">
        <div className="relative h-screen">
          <div className="absolute inset-0 bg-black opacity-90"></div>
          <img src={searchImage} alt="search" className="w-full h-full object-cover opacity-95"/>
          <div className="absolute font-semibold max-w-2xl mx-auto flex flex-col items-center py-24 text-white inset-0">
              <h1 className="text-3xl font-bold">Find book of your choice</h1>
              <p className="py-6 text-center font-bold">Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti veritatis non similique velit molestiae doloremque excepturi </p>
              <form className="flex items-center justify-between rounded-3xl overflow-hidden w-3/5 bg-white" onSubmit={handleSearch}>
                <input className="py-2 px-5 w-full border-2 outline-none text-black" value={query} onChange={(e) => setQuery(e.target.value)} type="text" placeholder="Search" />
                {loading ?  (<span className=""><Loader/></span>):(<IoIosSearch className="mx-4 text-black text-2xl cursor-pointer " onClick={handleSearch}/>)}
              </form>
          </div>
        </div>
        {booksData &&<div ref={searchResultsRef} className="max-w-7xl mx-auto py-8">
            <h1 className="font-semibold text-2xl">Search Result for <i>`{query}`</i></h1>
            <div className="my-8 grid grid-cols-5 gap-10">
              <BooksCard booksData = {booksData}/>
            </div>
        </div>}
    </div>
  )
}

export default Search
