import { getSession } from "@/hooks/session";
import Menu from "./components/Menu";

export default async function Home() {
  const session = await getSession()

  return (
    <>
      <Menu session={session} />
      <h1>Welcome</h1>
    </>
  )
}
