import NewNoteForm from './NewNoteForm'
import { useGetUsersQuery } from '../users/usersApiSlice'
import PulseLoader from 'react-spinners/PulseLoader'

const NewNote = () => {
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

  console.log('users', users)
  if (!users?.length) return <PulseLoader color={'#fff'} />

  const content = <NewNoteForm users={users} />
  return content
}

export default NewNote
