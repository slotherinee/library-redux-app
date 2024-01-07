import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { setError } from '../../redux/slices/errorSlice'
import createBookWithId from '../../utilFunctions/createBookWithId'

const initialState = {
  books: [],
  isLoadingAPI: false,
}

export const fetchBook = createAsyncThunk(
  'books/fetchBook',
  async (url, thunkAPI) => {
    try {
      const res = await axios.get(url)
      const randomIndex = Math.floor(Math.random() * res.data.length)
      return res.data[randomIndex]
    } catch (error) {
      thunkAPI.dispatch(setError(error.message))
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    addBook: (state, action) => {
      state.books.push(action.payload)
    },
    deleteBook: (state, action) => {
      return {
        ...state,
        books: state.books.filter((book) => book.id !== action.payload),
      }
    },
    toggleFavorite: (state, action) => {
      state.books.forEach((book) => {
        if (book.id === action.payload) {
          book.isFavorite = !book.isFavorite
        }
      })
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBook.pending, (state) => {
      state.isLoadingAPI = true
    }),
      builder.addCase(fetchBook.fulfilled, (state, action) => {
        state.isLoadingAPI = false
        if (action.payload.title && action.payload.author) {
          state.books.push(createBookWithId(action.payload, 'API'))
        }
      }),
      builder.addCase(fetchBook.rejected, (state) => {
        state.isLoadingAPI = false
      })
  },
})

export const { addBook, deleteBook, toggleFavorite } = booksSlice.actions

export const selectIsLoadingAPI = (state) => state.books.isLoadingAPI

export default booksSlice.reducer
