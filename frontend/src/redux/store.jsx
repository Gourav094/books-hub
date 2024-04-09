import { configureStore } from "@reduxjs/toolkit";
import bookReducer from "./bookSlice";

const store = configureStore({
	reducer: {
		bookData: bookReducer,
	},
});

export default store;
