import { createSlice } from '@reduxjs/toolkit';

export const encuestaSlice = createSlice({
    name: 'encuesta',
    initialState: {
        page: 0,
        surveys: [],
        isLoading: false,
    },
    reducers: {
        startLoadingSurveys: (state, /* action */ ) => {
            state.isLoading = true;
        },
        setSurveys: (state, action) => {
            state.isLoadingEvents = false;
            state.page = action.payload.page;
            state.surveys = action.payload.surveys;
        },
        addNewSurveys: (state, action ) => {
            state.surveys.push( action.payload );
            state.isLoading = false;
        },
    }
});


// Action creators are generated for each case reducer function
export const { startLoadingSurveys, setSurveys, addNewSurveys } = encuestaSlice.actions;