import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cartSlice";
import baseApi from "./api/baseApi";
import registerReducer from "./features/registerSlice";
import loginReducer from "./features/loginSlice";
import { persistStore, persistReducer } from "redux-persist";
import userReducer from "./features/userSlice";
import storage from "redux-persist/lib/storage";

const persistUserConfig = {
  key: "user",
  storage,
};

const persistedUserReducer = persistReducer(persistUserConfig, userReducer);

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    register: registerReducer,
    login: loginReducer,
    user: persistedUserReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(baseApi.middleware),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      baseApi.middleware
    ),
});

export const persistor = persistStore(store);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
