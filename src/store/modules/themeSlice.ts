import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    currentTheme: "light"
  },
  reducers: {
    changeTheme: (state, action) => {
      state.currentTheme = action.payload;
    }
  }
})

export const { changeTheme } = themeSlice.actions;
export default themeSlice.reducer;