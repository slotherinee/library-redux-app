import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    setError: (state, action) => {
      return action.payload
    },
    clearError: () => initialState,
  },
})

export const { setError, clearError } = errorSlice.actions

export default errorSlice.reducer
