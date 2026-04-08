import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type Theme = 'light' | 'dark' | 'forest' | 'ocean' | 'sunset'

export interface ThemeState {
  theme: Theme
}

const initialState: ThemeState = {
  theme: 'light',
}

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<Theme>) {
      state.theme = action.payload
    },
    cycleTheme(state) {
      const themes: Theme[] = ['light', 'dark', 'forest', 'ocean', 'sunset']
      const idx = themes.indexOf(state.theme)
      state.theme = themes[(idx + 1) % themes.length]
    },
  },
})

export const { setTheme, cycleTheme } = themeSlice.actions
export default themeSlice.reducer
