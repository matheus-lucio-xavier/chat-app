import { getUserConversas, getUsers } from "@/services/userService";
import { useEffect, useState } from "react";
import { View, Text, Alert, FlatList, TouchableOpacity } from "react-native";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { styles } from "@/styles/home.styles";
import * as SecureStore from "expo-secure-store"
import { router } from "expo-router";
import { ConversationList } from "@/components/conversationList";

type Conversa = {
  id: string;
  nome: string;
};

export default function Home(){

    const [ conversas, setConversas] = useState<Conversa[]>([])
    const [ searchConversa, setSearchConversa] = useState("")

    const fetchData = async () => {
        try{
            const response = await getUserConversas()

            setConversas(response.data)
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
            await SecureStore.deleteItemAsync("token")
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

    useEffect(() => {
        fetchData()

        const interval = setInterval(fetchData, 3000); // atualiza a cada 3s

        return () => clearInterval(interval);
    }, [])

    const handleConversationList = (id: string, nome: string) =>
        router.push({
          pathname: "/home/chat/[id]", // ajusta conforme sua estrutura
          params: { 
                id: id,
                nome: nome
            },
        })

    return (
        <View style={styles.container}>
            <View style={{alignItems: "flex-end"}}>
                <Button style={styles.buttonContainerAlt} icon="add-circle-outline" onPress={() => {router.push({pathname: "/home/conversaCreation"})}}/>
            </View>

            <View style={{alignItems: "center"}}>
                <Input 
                    type="text"
                    icon="search"
                    placeholder="Digite o nome da conversa"
                    onChangeText={setSearchConversa}
                />
            </View>

            <ConversationList 
                conversas={conversas.filter(c => !searchConversa.trim()? true : c.nome.toLowerCase().includes(searchConversa.toLowerCase()))} 
                onPressChat={handleConversationList}
            />
        </View>
    );

}