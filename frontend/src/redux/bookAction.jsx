import { fetchGenresDataStart, fetchGenresDataSuccess, fetchGenresDataFailure } from './bookSlice';

const fetchGenreData = async (genre) => {
    try {
        const response = await fetch(`/books/genre?q=${genre}`);

        const data = await response.json();
        console.log(data)
        return data?.genreBooks?.items; 
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
