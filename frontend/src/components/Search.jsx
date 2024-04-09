import { useRef, useState } from "react";
import searchImage from "../assets/book-background.jpg"
import BooksCard from "./BooksCard"
import { IoIosSearch } from "react-icons/io";
const Search = () => {
  const search = useRef(null)
  const [query,setQuery] = useState('')
  const searchResultsRef = useRef(null);
  
    const handleSearchScroll = () => {
        if (searchResultsRef.current) {
            searchResultsRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

  const handleSearch = (e) => {
    e.preventDefault()
    setQuery(search.current.value)
    handleSearchScroll()
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
                <input className="py-2 px-5 w-full border-2 outline-none text-black" ref={search} type="text" placeholder="Search" />
                <IoIosSearch className="mx-4 text-black text-2xl cursor-pointer " onClick={handleSearch}/>
              </form>
          </div>
        </div>
        {query &&<div ref={searchResultsRef} className="max-w-7xl mx-auto py-8">
            <h1 className="font-semibold text-2xl">Search Result for <i>`{query}`</i></h1>
            <BooksCard query = {query}/>
        </div>}
    </div>
  )
}

export default Search
