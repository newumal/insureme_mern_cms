import { configureStore} from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import authReducer from "../features/authSlice"

export default configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer
  }
})

export class store {
}