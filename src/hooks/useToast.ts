import { useDispatch } from 'react-redux'
import { showToaster } from 'reduxs/toast-redux'

type ToastType = 'success' | 'error' | 'info' | 'warning'

export const useToast = () => {
  const dispatch = useDispatch()

  const showToast = (message: string, type: ToastType = 'info') => {
    dispatch(
      showToaster({
        type,
        message,
        show: true
      })
    )
  }

  return {
    showToast,
    success: (message: string) => showToast(message, 'success'),
    error: (message: string) => showToast(message, 'error'),
    info: (message: string) => showToast(message, 'info'),
    warning: (message: string) => showToast(message, 'warning')
  }
}
