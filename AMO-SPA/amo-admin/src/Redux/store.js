import { configureStore } from "@reduxjs/toolkit";
import createOidcMiddleware from "redux-oidc";
import userManager from "../utils/userManager";
import { reducer as oidc } from "redux-oidc";
import homeReducer from "../features/home/homeSlice";
import assetReducer from "../features/manageAsset/manageassetSlice";
import userReducer from "../features/usermanager/userSlice";
import assignmentReducer from "../features/manageAssignment/assignmentSlice";

const rootReducer = {
  user: userReducer,
  home: homeReducer,
  asset: assetReducer,
  assignment: assignmentReducer,
  oidc,
};
const oidcMiddleware = createOidcMiddleware(userManager);
const middleware = [oidcMiddleware];

const store = configureStore({
  reducer: rootReducer,
  middleware: middleware,
});

export default store;
