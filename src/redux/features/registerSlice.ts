import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  password: "",
  role: "",
  email: "",
};

export const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setRole: (state, action) => {
      state.role = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
  },
});

export const { setEmail, setName, setPassword, setRole } =
  registerSlice.actions;
export default registerSlice.reducer;
