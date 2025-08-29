import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from 'store'
import { initialToaster, clearToaster } from 'reduxs/toast-redux'
import { toastTypes } from 'utils/constants-value'

const ToasterComponent = () => {
  const dispatch = useDispatch()

  const timeout = useRef<any>(null)
  const toastProps = useSelector((state: RootState) => state.toaster.value)
  const { show, type, message } = toastProps
  const classNameType = toastTypes[type]

  const clearToast = () => {
    dispatch(clearToaster())
  }

  useEffect(() => {
    if (show) {
      timeout.current = setTimeout(() => {
        clearToast()
      }, 3000)
    }
  }, [show])

  useEffect(() => {
    dispatch(initialToaster())

    return () => {
      clearTimeout(timeout.current)
      clearToast()
    }
  }, [])

  return (
    <div className='toast toast-top toast-end mt-24'>
      {show && (
        <button className={classNameType} onClick={() => clearToast()}>
          {message}
        </button>
      )}
    </div>
  )
}

export default ToasterComponent
