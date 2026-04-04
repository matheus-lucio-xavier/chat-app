import { getUsers } from "@/services/userService";
import { useState } from "react";
import { View, Text, Alert } from "react-native";
import { Button } from "@/components/button";
import { styles } from "@/styles/home.styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

export default function Home(){
    const [users, setUsers] = useState(new Array)

    const handleButton = async () => {

        try{
            const response = await getUsers()

            setUsers(response.data)
            console.log(response.data)
        }catch (error: any) {
            if (error.response) {
                // erro vindo da API (400, 401, etc)
                console.log("Erro da API:", error.response.data)

                Alert.alert("Erro", JSON.stringify(error.response.data))
            } else {
                // erro de rede
                console.log("Erro geral:", error)
                Alert.alert("Erro de conexão")
            }
        }
    }

    const handleLogout = async () => {

        try{
            await AsyncStorage.removeItem("token");
            Alert.alert("Logout efetuado")
            router.replace("/")
        }catch (error: any) {
            if (error.response) {
                // erro vindo da API (400, 401, etc)
                console.log("Erro da API:", error.response.data)

                Alert.alert("Erro", JSON.stringify(error.response.data))
            } else {
                // erro de rede
                console.log("Erro geral:", error)
                Alert.alert("Erro de conexão")
            }
        }
    }

    return(
        <View style={styles.container}>
            <Button label="Logout" onPress={handleLogout}/>
            <View style={styles.form}>
                <Button label="Get usuarios" onPress={handleButton}/>
            </View>
            {users.map((u) => (
                <Text key={u.id}>{u.nome}</Text>
            ))}
        </View>
    )
}