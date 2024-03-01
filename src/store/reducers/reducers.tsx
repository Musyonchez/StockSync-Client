// store/reducers/index.tsx
import { combineReducers } from "redux";
// import userReducer from './userReducer';
import productsReducer from "./products/fetchproductsReducer";
import activeproductsReducer from "./products/fetchactiveproductsReducer";
import productReducer from "./products/fetchproductReducer";
import addproductReducer from "./products/addproductReducer";
import editproductReducer from "./products/editproductReducer";
import deleteproductReducer from "./products/deleteproductReducer";
import deactivateproductReducer from "./products/deactivateproductReducer";
import searchproductsReducer from "./products/searchproductsReducer";








import userReducer from "./users/fetchuserReducer";
import usersReducer from "./users/fetchusersReducer";
import deleteuserReducer from "./users/deleteuserReducer";
import adduserReducer from "./users/adduserReducer";
import edituserReducer from "./users/edituserReducer";



const rootReducer = combineReducers({
  product: productReducer,
  addproduct: addproductReducer,
  editproduct: editproductReducer,
  deleteproduct: deleteproductReducer,
  deactivateproduct: deactivateproductReducer,
  activeproducts: activeproductsReducer,
  products: productsReducer,
  searchproducts: searchproductsReducer,













  
  user: userReducer,
  users: usersReducer,
  deleteuser: deleteuserReducer,
  adduser: adduserReducer,
  edituser: edituserReducer,

  // Add other reducers as needed
});

export type RootState = ReturnType<typeof rootReducer>; // Add this line to define the RootState type

export default rootReducer;