import { currentUser } from '@clerk/nextjs'

const DashboardPage = async () => {
  const user = await currentUser();

  return (
    <>
      <h2>Study</h2>
        <ul>

        </ul>
      <h2>Your Classes</h2>
        <ul>

        </ul>
    </>
  )
}

export default DashboardPage
