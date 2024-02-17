// store/reducers/index.tsx
import { combineReducers } from 'redux';
// import userReducer from './userReducer';
import productsReducer from './products/fetchproductsReducer';
import productReducer from './products/fetchproductReducer';


const rootReducer = combineReducers({
//   user: userReducer,
  product: productReducer,
  products: productsReducer,

  // Add other reducers as needed
});

export type RootState = ReturnType<typeof rootReducer>; // Add this line to define the RootState type

export default rootReducer;
