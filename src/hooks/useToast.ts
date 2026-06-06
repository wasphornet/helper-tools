import { useDispatch } from 'react-redux'
import { showToaster, ToastTypeProps } from 'reduxs/toast-redux'

export const useToast = () => {
  const dispatch = useDispatch()

  const showToast = (message: string, type: ToastTypeProps['type'] = 'info') => {
    dispatch(
      showToaster({
        type,
        message
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
