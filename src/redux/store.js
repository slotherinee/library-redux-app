import { configureStore } from '@reduxjs/toolkit'
import booksSlice from './slices/booksSlice.js'
import filterSlice from './slices/filterSlice.js'
import errorReducer from './slices/errorSlice.js'

const store = configureStore({
  reducer: {
    books: booksSlice,
    filter: filterSlice,
    error: errorReducer,
  },
})

export default store
