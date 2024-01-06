import { configureStore } from '@reduxjs/toolkit'
import booksSlice from './slices/booksSlice.js'
import filterSlice from './slices/filterSlice.js'

const store = configureStore({
  reducer: {
    books: booksSlice,
    filter: filterSlice,
  },
})

export default store
