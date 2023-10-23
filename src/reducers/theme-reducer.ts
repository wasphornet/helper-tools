import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export type ThemeType = string|"dracula"|"night"|"garden"|"light"

export interface ThemeState {
  value: ThemeType
}

const initialState: ThemeState = {
  value: 'dracula',
}

export const themeApp = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeType>) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setTheme } = themeApp.actions

export default themeApp.reducer