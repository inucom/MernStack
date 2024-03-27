import { configureStore } from '@reduxjs/toolkit';
import userSlice from "./userSlice";
import {combineReducers} from "@reduxjs/toolkit";
import {persistReducer} from "redux-persist";
import storage from 'redux-persist/lib/storage';

const reducers = combineReducers({
    user:userSlice,
})

const persistConfig = {
    key:'root',
    storage,
    whitelist:['user'],
}

const user = persistReducer(persistConfig, reducers);


const store = configureStore({
    reducer: user,
    middleware:(getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck:false,
        })
})

export default store;