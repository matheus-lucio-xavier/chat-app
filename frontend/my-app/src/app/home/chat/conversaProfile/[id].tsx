import { View, Text, FlatList, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { styles } from "@/styles/chat.styles";
import { getConversaMembros, getConversaMensagens, postConversaMensagem } from "@/services/conversaService";
import { MessageInput } from "@/components/MessageInput";
import { MessageList } from "@/components/MessageList";
import { Button } from "@/components/button";
import { UserList } from "@/components/UserList";

export default function ConversaProfile() {
    type User = {
        id: string;
        nome: string;
        email: string;
    };

    const { id, nome } = useLocalSearchParams();
    const [ userMembers, setUserMembers ] = useState<User[]>([]);

    const fetchData = async () => {
        try{
            const response = await getConversaMembros(id as string)
        
            setUserMembers(response.data)
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

    return (
        <View>
            <Text>/////{nome}\\\\\</Text>

            <UserList users={userMembers} onPressUser={() => {}}/>
        </View>
    );
}