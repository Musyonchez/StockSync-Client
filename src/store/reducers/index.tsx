// store/reducers/index.tsx
import { combineReducers } from 'redux';
// import userReducer from './userReducer';
import productReducer from './productReducer';

const rootReducer = combineReducers({
//   user: userReducer,
  product: productReducer,
  // Add other reducers as needed
});

export type RootState = ReturnType<typeof rootReducer>; // Add this line to define the RootState type

export default rootReducer;
