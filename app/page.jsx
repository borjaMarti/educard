import { UserButton } from "@clerk/nextjs";

const HomePage = () => {
  return (
    <>
      <h1>
        Educard
      </h1>
      <div>
        <UserButton afterSignOutUrl="/"/>
      </div>
    </>
  )
}

export default HomePage