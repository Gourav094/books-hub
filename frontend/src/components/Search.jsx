import { useEffect, useRef, useState } from "react";
import BooksCard from "./BooksCard";
import { SEARCH_API } from "../utils/constant";
import { IoIosSearch } from "react-icons/io";
import Loader from "./Loader";
import axios from "axios";
import Banner from "./Banner";

const Search = () => {
	const [query, setQuery] = useState("");
	const searchResultsRef = useRef(null);
	const [booksData, setBooksData] = useState();
	const [loading, setLoading] = useState(false);

	const handleSearchScroll = () => {
		if (searchResultsRef.current) {
			searchResultsRef.current.scrollIntoView({ behavior: "smooth" });
		}
	};

	const handleSearch = async (e) => {
		e.preventDefault();
    if(!query){
      return
    }
		setLoading(true);
		await fetchData();
		setLoading(false);
	};

	useEffect(() => {
		handleSearchScroll();
	}, [booksData]);

	const fetchData = async () => {
		const response = await axios.get(SEARCH_API + query);
		// const jsonData = await data.json()
		setBooksData(response.data?.items);
	};
  console.log(booksData)
	return (
		<div className="bg-violet-100 min-h-screen">
			<div className="relative ">
				{/* <div className="absolute inset-0 bg-black opacity-90"></div> */}
				{/* <img src={searchImage} alt="search" className="w-full h-full object-cover opacity-95"/> */}
				<Banner />
				<div className="font-semibold max-w-2xl mx-auto flex flex-col items-center py-24 text-black inset-0">
					<h1 className="text-3xl font-semibold pb-3 tracking-wider">
						Find book of your choice
					</h1>
					<p className="text-center font-medium my-4 ">
              &quot;Once you learn to read, you will be forever free&quot;
					</p>
					<form
						className="flex items-center justify-between rounded-3xl border-2 my-2 border-gray-500 overflow-hidden w-3/5 "
						onSubmit={handleSearch}
					>
						<input
							className="py-2 px-5 w-full border-r border-black outline-none text-black"
							value={query}
							onChange={(e) => setQuery(e.target.value)}
							type="text"
							placeholder="Search"
						/>
						{loading ? (
							<span className="">
								<Loader />
							</span>
						) : (
							<IoIosSearch
								className="mx-3 my-2 text-black text-2xl cursor-pointer "
								onClick={handleSearch}
							/>
						)}
					</form>
				</div>
				{booksData && (
					<div
						ref={searchResultsRef}
						className="max-w-7xl mx-auto py-8"
					>
						<h1 className="font-semibold text-2xl">
							Search Result for <i>`{query}`</i>
						</h1>
						<div className="my-8 grid grid-cols-5 gap-10">
							<BooksCard booksData={booksData} />
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Search;
