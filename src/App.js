import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Public from './components/Public'
import Login from './features/auth/Login'
import DashLayout from './components/DashLayout'
import Welcome from './features/auth/Welcome'
import NotesList from './features/notes/NotesList'
import UsersList from './features/users/UsersList'
import NewUserForm from './features/users/NewUserForm'
import EditUser from './features/users/EditUser'
import NewNote from './features/notes/NewNote'
import EditNote from './features/notes/EditNote'
import Prefetch from './features/auth/Prefetch'
import PersistLogin from './features/auth/PersistLogin'
import RequireAuth from './components/RequireAuth'
import { ROLES } from './config/roles'
import useTitle from './hooks/useTitle'

function App() {
  useTitle('Dan.D Repair')
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        {/* Public Routes */}
        <Route index element={<Public />} />
        <Route path='login' element={<Login />} />

        {/* Protechted Routes */}
        <Route element={<PersistLogin />}>
          <Route
            element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}
          >
            <Route element={<Prefetch />}>
              <Route path='dash' element={<DashLayout />}>
                <Route index element={<Welcome />} />

                <Route
                  element={
                    <RequireAuth allowedRoles={[ROLES.Admin, ROLES.Maneger]} />
                  }
                >
                  <Route path='users'>
                    <Route index element={<UsersList />} />
                    <Route path=':id' element={<EditUser />} />
                    <Route path='new' element={<NewUserForm />} />
                  </Route>
                </Route>

                <Route path='notes'>
                  <Route index element={<NotesList />} />
                  <Route path=':id' element={<EditNote />} />
                  <Route path='new' element={<NewNote />} />
                </Route>
              </Route>
              {/* End Dash */}
            </Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  )
}

export default App
