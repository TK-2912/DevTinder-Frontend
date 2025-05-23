import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
    name: "requests",
    initialState :null,
    reducers:{
        addRequest : (state , action)=>{
            return action.payload
        },
        removeRequest:(state,actions) =>{
            const newArray = state.filter((req)=>req._id != actions.payload);
            return newArray
        }
    }
})

export const {addRequest, removeRequest} = requestSlice.actions;

export default requestSlice.reducer;
