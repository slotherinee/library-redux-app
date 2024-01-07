import { useEffect } from 'react'
import { clearError } from '../../redux/slices/errorSlice'
import { ToastContainer, toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import 'react-toastify/dist/ReactToastify.css'

const Error = () => {
  const errorMessage = useSelector((state) => state.error)
  const dispatch = useDispatch()

  useEffect(() => {
    if (errorMessage) {
      toast.info(errorMessage)
      dispatch(clearError())
    }
  }, [errorMessage, dispatch])

  return <ToastContainer position='top-right' autoClose={2000} />
}

export default Error
