import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IStateValue } from './types'

export type ToastTypeProps = {
  show?: boolean,
  type: 'success' | 'error' | 'info' | 'warning',
  message?: string | null,
}


const initialValue: ToastTypeProps = {
  show: false,
  type: 'success',
  message: '',
}

export const Toaster = createSlice({
  name: 'toaster',
  initialState: { value: { ...initialValue } } as IStateValue<ToastTypeProps>,
  reducers: {
    initialToaster: (state) => {
      state.value = { ...initialValue }
    },
    showToaster: (state, action: PayloadAction<ToastTypeProps>) => {
      state.value = {
        ...state.value,
        ...action.payload,
        show: true,
      }
    },
    clearToaster: (state) => {
      state.value = {
        ...state.value,
        show: false,
        type: 'success',
        message: null,
      }
    },
  },
})

// Action creators are generated for each case reducer function
export const {
  clearToaster,
  showToaster,
  initialToaster
} = Toaster.actions

export default Toaster.reducer