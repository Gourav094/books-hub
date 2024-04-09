import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllGenresData } from "../redux/bookAction";

const useGenreList = () => {
    const dispatch = useDispatch();
    const genresData = useSelector((state) => state.bookData.genresData);
    console.log(genresData)
    useEffect(() => {
        dispatch(fetchAllGenresData());
    }, []);
    return genresData;

};

export default useGenreList;