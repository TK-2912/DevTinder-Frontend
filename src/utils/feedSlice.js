import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    addFeed: (state, action) => {
      return action.payload;
    },
    removeUserFromFeed: (state, action) => {
      // we will create a newFeed array - that will come by using the exisiting feild(existing feild we will get using state )
      // action.payload is the id which we will be sending ...if its not the id the filter it and then return the newFeed
      const newFeed = state.filter((user)=>user._id !== action.payload);
      return newFeed;
    },
  },
});

export const { addFeed, removeUserFromFeed } = feedSlice.actions;
export default feedSlice.reducer;