
import { configureStore } from '@reduxjs/toolkit';
import loaderReducer from './reducers/isLoading';


const store = configureStore({
    reducer: {
        loader:loaderReducer,
        
        
    }
})

export { store };