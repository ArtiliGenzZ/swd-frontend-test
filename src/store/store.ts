import { configureStore } from "@reduxjs/toolkit";
import languageReducer from "./features/languageSlice";
import formReducer from "./features/formSlice";
import shapeReducer from "./features/shapeSlice";

export const store = () => {
    return configureStore({
        reducer: {
            language: languageReducer,
            form: formReducer,
            shape: shapeReducer,
        },
    });
}

export type AppStore = ReturnType<typeof store>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
