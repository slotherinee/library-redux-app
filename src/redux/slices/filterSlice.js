import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  title: '',
  author: '',
  onlyFavorite: false,
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setTitleFilter: (state, action) => {
      return {
        ...state,
        title: action.payload,
      }
    },
    setAuthorFilter: (state, action) => {
      return {
        ...state,
        author: action.payload,
      }
    },
    setOnlyFavoritesFilter: (state) => {
      state.onlyFavorite = !state.onlyFavorite
    },
    resetFilters: () => initialState,
  },
})

export const {
  setTitleFilter,
  setAuthorFilter,
  setOnlyFavoritesFilter,
  resetFilters,
} = filterSlice.actions
export const selectTitleFilter = (state) => state.filter.title
export const selectAuthorFilter = (state) => state.filter.author
export const selectOnlyFavoritesFilter = (state) => state.filter.onlyFavorite

export default filterSlice.reducer
