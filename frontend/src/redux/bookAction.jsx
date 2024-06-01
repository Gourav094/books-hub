import { backend_API } from '../utils/constant';
import { fetchGenresDataStart, fetchGenresDataSuccess, fetchGenresDataFailure } from './bookSlice';
import axios from "axios"

const fetchGenreData = async (genre) => {
    try {
        const response = await axios.get(`${backend_API}/books/genre?q=${genre}`);

        return response.data?.genreBooks?.items; 
    } catch (error) {
        throw new Error(`Error fetching data for ${genre}: ${error.message}`);
    }
};
export const fetchAllGenresData = () => {
    return async (dispatch) => {
        dispatch(fetchGenresDataStart());
        try {
            const genres = ['Fiction', 'novel', 'mystery', 'horror', 'selfHelpBook', 'spirituality', 'fantasy', 'non-Fiction', 'historical-Fantasy', 'thriller', 'romance'];
            const genresData = {}

            for (const genre of genres) {
                const data = await fetchGenreData(genre);
                genresData[genre] = data;
            }
            dispatch(fetchGenresDataSuccess(genresData));
        } catch (error) {
            dispatch(fetchGenresDataFailure(error.message));
        }
    };
};
