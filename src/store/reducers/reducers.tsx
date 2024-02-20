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








import userReducer from "./users/fetchuserReducer";
import usersReducer from "./users/fetchusersReducer";
import deleteuserReducer from "./users/deleteuserReducer";



const rootReducer = combineReducers({
  product: productReducer,
  addproduct: addproductReducer,
  editproduct: editproductReducer,
  deleteproduct: deleteproductReducer,
  deactivateproduct: deactivateproductReducer,
  activeproducts: activeproductsReducer,
  products: productsReducer,
  












  
  user: userReducer,
  users: usersReducer,
  deleteuser: deleteuserReducer,

  // Add other reducers as needed
});

export type RootState = ReturnType<typeof rootReducer>; // Add this line to define the RootState type

export default rootReducer;