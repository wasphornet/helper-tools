import { configureStore } from '@reduxjs/toolkit'
import themeReducer from 'reduxs/theme-redux'
import toastReducer from 'reduxs/toast-redux'

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    toaster: toastReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch