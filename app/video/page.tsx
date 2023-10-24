// import { getServerSession } from "next-auth";
// import { redirect } from "next/navigation";
// import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function Video() {
  // const session = await getServerSession(authOptions);

  // if(session === null) {
  //   console.log('!!! session:', session)
  //   redirect('/')
  // }

  // console.log('session:', session)

  return (
    <div className="">
      <h1 className="header-primary">Video</h1>
      <div className="mt-[27.5vh] text-center text-xl">
        <span>Coming soon...</span>
      </div>
    </div>
  )
}
