import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { accountSlice } from "../../features/account/accountSlice";
import { categorySlice } from "../../features/Category/categorySlice";
import { sepetSlice } from "../../features/sepet/sepetSlice";

// export function configureStore(){
//     return createStore(counterReducer);
// }

export const store=configureStore({
    reducer:{
     
      sepet:sepetSlice.reducer,
      category:categorySlice.reducer,
      account:accountSlice.reducer
    }
})

export type RootState=ReturnType<typeof store.getState>;
export type AppDispatch=typeof store.dispatch;

export const useAppDispatch=()=> useDispatch<AppDispatch>();
export const useAppSelector:TypedUseSelectorHook<RootState>=useSelector;
