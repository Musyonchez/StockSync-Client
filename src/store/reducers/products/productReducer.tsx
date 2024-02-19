// store/reducers/products/productReducer.tsx
import { combineReducers } from "redux";
import productsReducer from "./fetchproductsReducer";
import activeproductsReducer from "./fetchactiveproductsReducer";
import productReducer from "./fetchproductReducer";
import addproductReducer from "./addproductReducer";

const productReducers = combineReducers({
  product: productReducer,
  activeproducts: activeproductsReducer,
  products: productsReducer,
  addproduct: addproductReducer,
  // Add other reducers as needed
});

export default productReducers;
export type ProductState = ReturnType<typeof productReducers>;

