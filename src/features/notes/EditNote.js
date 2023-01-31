import { useParams } from 'react-router-dom'
import EditNoteForm from './EditNoteForm'
import { useGetNotesQuery } from './notesApiSlice'
import { useGetUsersQuery } from './../users/usersApiSlice'
import useAuth from '../../hooks/useAuth'
import PulseLoader from 'react-spinners/PulseLoader'

const EditNote = () => {
  const { id } = useParams()

  const { username, isManeger, isAdmin } = useAuth()

  const { note } = useGetNotesQuery('notesList', {
    selectFromResult: ({ data }) => ({
      note: data?.entities[id],
    }),
  })

  // const { users } = useGetUsersQuery('usersList', {
  //   selectFromResult: ({ data }) => ({
  //     user: data?.ids.map((id) => data?.entities[id]),
  //   }),
  // })
  const { data: userData, isSuccess } = useGetUsersQuery()

  let users
  if (isSuccess) {
    users = userData.ids.map((id) => userData.entities[id])
  }

  // console.log(useGetUsersQuery())
  // console.log('user', user)
  // console.log('note', note)
  // console.log('users', users)

  if (!note || !users?.length) return <PulseLoader color={'#fff'} />

  if (!isManeger && !isAdmin) {
    if (note.username !== username) {
      return <p className='errmsg'>No access</p>
    }
  }

  const content = <EditNoteForm note={note} users={users} />

  return content
}

export default EditNote
