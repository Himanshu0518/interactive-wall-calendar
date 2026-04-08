import { configureStore } from '@reduxjs/toolkit'
import calendarReducer from './slices/calendarSlice'
import themeReducer from './slices/themeSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      calendar: calendarReducer,
      theme: themeReducer,
    },
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
