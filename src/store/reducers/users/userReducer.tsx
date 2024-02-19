// store/reducers/users/userReducer.tsx
import { combineReducers } from "redux";
import userReducer from "./fetchuserReducer";
import usersReducer from "./fetchusersReducer";

const userReducers = combineReducers({
  user: userReducer,
  users: usersReducer,
});

export default userReducers;
export type UserState = ReturnType<typeof userReducers>;
