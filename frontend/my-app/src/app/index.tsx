import { useEffect, useState } from "react";
import { Redirect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store"
import { jwtDecode } from "jwt-decode";

export default function Index() {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      //const token = await AsyncStorage.getItem("token");
      const token = await SecureStore.getItemAsync("token")

      if (token == null) {
        setIsLogged(false)
        return
      }

      try {
        const decoded: any = jwtDecode(token)

        const now = Date.now() / 1000

        setIsLogged(decoded.exp > now)
      } catch {
          setIsLogged(false)
      }
    };

    checkToken();
  }, []);

  if (isLogged) {
    return <Redirect href="/app/home" />;
  } else {
    return <Redirect href="/auth/login" />;
  }
}