import { fetchGenresDataStart, fetchGenresDataSuccess, fetchGenresDataFailure } from './bookSlice';

const fetchGenreData = async (genre) => {
    try {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=+subject=${genre}`);
        const data = await response.json();
        console.log(data.items)
        return data.items; 
    } catch (error) {
        throw new Error(`Error fetching data for ${genre}: ${error.message}`);
    }
};
export const fetchAllGenresData = () => {
    return async (dispatch) => {
        dispatch(fetchGenresDataStart());
        try {
            const genres = ['Fiction', 'novel', 'mystery', 'horror', 'selfHelpBook', 'spirituality', 'fantasy', 'non-Fiction', 'historical-Fantasy', 'thriller', 'romance'];
            const genresData = {};
            console.log("bookaction")

            for (const genre of genres) {
                const data = await fetchGenreData(genre);
                console.log(data)
                genresData[genre] = data;
            }
            console.log(genresData)
            dispatch(fetchGenresDataSuccess(genresData));
        } catch (error) {
            dispatch(fetchGenresDataFailure(error.message));
        }
    };
};
