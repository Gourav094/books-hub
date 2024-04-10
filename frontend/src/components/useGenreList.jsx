import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllGenresData } from "../redux/bookAction";

const useGenreList = () => {
    const [data, setData] = useState([]);
    const dispatch = useDispatch();
    const genresData = useSelector((state) => state.bookData.genresData);

    useEffect(() => {
        if (Object.keys(genresData).length === 0) {
            dispatch(fetchAllGenresData());
        } else {
            setData(genresData);
        }
    }, [dispatch, genresData]); 
    return data;
};

export default useGenreList;
