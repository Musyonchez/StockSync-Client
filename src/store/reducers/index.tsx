// store/reducers/index.tsx
import { combineReducers } from "redux";
// import userReducer from './userReducer';
import productsReducer from "./products/fetchproductsReducer";
import productReducer from "./products/fetchproductReducer";
import userReducer from "./users/fetchuserReducer";
import usersReducer from "./users/fetchusersReducer";


const rootReducer = combineReducers({
  //   user: userReducer,
  user: userReducer,
  users: usersReducer,
  product: productReducer,
  products: productsReducer,

  // Add other reducers as needed
});

export type RootState = ReturnType<typeof rootReducer>; // Add this line to define the RootState type

export default rootReducer;
