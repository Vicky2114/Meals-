import { configureStore } from '@reduxjs/toolkit'
import favoritesReducer from './favoirtes' 
export const store = configureStore({

    reducer:{

       favoriteMeals:favoritesReducer
    }
})