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
import sellproductsReducer from "./products/sellproductsReducer";
import writeoffproductsReducer from "./products/writeoffproductsReducer";
import restockingproductsReducer from "./products/restockingproductsReducer";








import userReducer from "./users/fetchuserReducer";
import usersReducer from "./users/fetchusersReducer";
import deleteuserReducer from "./users/deleteuserReducer";
import deactivateuserReducer from "./users/deactivateuserReducer";
import adduserReducer from "./users/adduserReducer";
import edituserReducer from "./users/edituserReducer";



import transactionsReducer from "./records/transactions/fetchtransactionsReducer";
import transactionReducer from "./records/transactions/fetchtransactionReducer";

import writeoffsReducer from "./records/writeoffs/fetchwriteoffsReducer";
import writeoffReducer from "./records/writeoffs/fetchwriteoffReducer";


import restockingsReducer from "./records/restockings/fetchrestockingsReducer";
import restockingReducer from "./records/restockings/fetchrestockingReducer";



const rootReducer = combineReducers({
  product: productReducer,
  addproduct: addproductReducer,
  editproduct: editproductReducer,
  deleteproduct: deleteproductReducer,
  deactivateproduct: deactivateproductReducer,
  activeproducts: activeproductsReducer,
  products: productsReducer,
  searchproducts: searchproductsReducer,
  sellproducts: sellproductsReducer,
  writeoffproducts:  writeoffproductsReducer,
  restockingproducts: restockingproductsReducer,













  
  user: userReducer,
  users: usersReducer,
  deleteuser: deleteuserReducer,
  deactivateuser: deactivateuserReducer,
  adduser: adduserReducer,
  edituser: edituserReducer,


  transactions: transactionsReducer,
  transaction: transactionReducer,


  writeoffs: writeoffsReducer,
  writeoff: writeoffReducer,

  restockings: restockingsReducer,
  restocking: restockingReducer,


  // Add other reducers as needed
});

export type RootState = ReturnType<typeof rootReducer>; // Add this line to define the RootState type

export default rootReducer;