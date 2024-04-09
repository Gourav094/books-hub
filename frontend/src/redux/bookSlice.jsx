import { createSlice } from "@reduxjs/toolkit";

const bookSlice = createSlice({
    name: "bookData",
    initialState: {
        genresData: {}, 
        isLoading: false,
        error: null,
    },
    reducers: {
        fetchGenresDataStart(state) {
            state.isLoading = true;
            state.error = null;
        },
        fetchGenresDataSuccess(state, action) {
            state.isLoading = false;
            state.error = null;
            state.genresData = action.payload;
        },
        fetchGenresDataFailure(state, action) {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
});

export const {fetchGenresDataStart,fetchGenresDataSuccess,fetchGenresDataFailure,} = bookSlice.actions;

export default bookSlice.reducer;