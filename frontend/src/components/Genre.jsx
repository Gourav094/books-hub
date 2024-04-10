import BooksCard from "./BooksCard";
import useGenreList from "./useGenreList";
import { useSelector } from "react-redux";
const Genre = () => {
    const loading = useSelector((state) => state.bookData.isLoading);
    const booksData = useGenreList();

    console.log("rendering genre ",booksData)
    return loading? (
        <>
            <p className="text-center font-medium pb-10">Please wait, while we are fetching all data</p>
            <div className="w-10 h-10 ml-[50%] rounded-full border-[3px] border-indigo-600 border-b-transparent animate-spin"></div>
        </>
    ) :(
        <div className="my-4">
            {Object.entries(booksData).map(([genre, books]) => (
                <div key={genre}>
                    <h2 className="text-xl font-semibold my-8 tracking-wider">{genre}</h2>
                    <div className="grid grid-cols-5 gap-10">
                        <BooksCard booksData={books} />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Genre;
