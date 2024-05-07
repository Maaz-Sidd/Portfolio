import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const rootSlice = createSlice ({
    name: 'root',
    initialState: {
        loading: false,
        portfolioData: null,
        reloadData: false
    },
    reducers: {
        ShowLoading : (state) => {
            state.loading = true;
        },
        hideLoading : (state) => {
            state.loading = false;
        },
        setPortfolioData : (state, action: PayloadAction<any>) =>{
            state.portfolioData = action.payload;
        },
        ReloadData : (state, action: PayloadAction<boolean>)=>{
            state.reloadData = action.payload;
        }
    },
});

export default rootSlice.reducer;
export const {ShowLoading, hideLoading, setPortfolioData, ReloadData} = rootSlice.actions;