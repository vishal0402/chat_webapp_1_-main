import { combineReducers, createStore } from "redux";
import Reducer from "../Reducer/Reducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};
const rootReducer = combineReducers({
  Reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
const Store = createStore(persistedReducer);
const persistedStore = persistStore(Store);

export { Store, persistedStore };
