import { Redirect } from "expo-router"

export default function Index() {
  const isLogged = false // depois você troca por token/JWT

  if (!isLogged) {
    return <Redirect href="/auth/login" />
  }

  return <Redirect href="/auth/login" />
}