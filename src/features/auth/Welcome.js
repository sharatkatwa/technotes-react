import { Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

const Welcome = () => {
  const { isManeger, isAdmin, username } = useAuth()
  const date = new Date()
  const today = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'full',
    timeStyle: 'long',
  }).format(date)
  const content = (
    <section className='welcome'>
      <p>{today}</p>
      <h1>Welcome! {username}</h1>
      <p>
        <Link to='/dash/notes'>View TechNotes</Link>
      </p>
      <p>
        <Link to='/dash/notes/new'>Add a New TechNote</Link>
      </p>
      {(isManeger || isAdmin) && (
        <p>
          <Link to='/dash/users'>View User Settings</Link>
        </p>
      )}
      {(isManeger || isAdmin) && (
        <p>
          <Link to='/dash/users/new'>Add a New User</Link>
        </p>
      )}
    </section>
  )
  return content
}

export default Welcome
