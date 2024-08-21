import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  password: "",
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setName: (state, action) => {
      state.username = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
  },
});

export const { setName, setPassword } = loginSlice.actions;
export default loginSlice.reducer;
