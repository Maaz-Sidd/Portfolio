import { createSlice } from "@reduxjs/toolkit";

const rootSlice = createSlice ({
    name: 'root',
    initialState: {
        loading: false,
        portfolioData: null,
    },
    reducers: {
        ShowLoading : (state) => {
            state.loading = true;
        },
        hideLoading : (state) => {
            state.loading = false;
        },
        setPortfolioData : (state, action) =>{
            state.portfolioData = action.payload;
        },
    },
});

export default rootSlice.reducer;
export const {ShowLoading, hideLoading, setPortfolioData} = rootSlice.actions;