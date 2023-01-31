import { useSelector } from 'react-redux'
import { selectCurrentToken } from '../features/auth/authSlice'
import jwtDecode from 'jwt-decode'

const useAuth = () => {
  const token = useSelector(selectCurrentToken)
  let isManeger = false
  let isAdmin = false
  let status = 'Employee'

  if (token) {
    const decoded = jwtDecode(token)
    const { username, roles } = decoded.userInfo

    isManeger = roles.includes('Maneger')
    isAdmin = roles.includes('Admin')

    if (isManeger) status = 'Maneger'
    if (isAdmin) status = 'Admin'

    return { username, roles, isManeger, isAdmin, status }
  }

  return { username: '', roles: [], isManeger, isAdmin, status }
}

export default useAuth
