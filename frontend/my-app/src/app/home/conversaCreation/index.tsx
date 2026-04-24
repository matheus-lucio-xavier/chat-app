import { styles } from "@/styles/home.styles";
import { Form } from "@/components/form"
import { UserList } from "@/components/UserList"
import { Alert, View } from "react-native";
import { postConversasPrivado } from "@/services/conversaService";
import { useEffect, useState } from "react";
import { getUsers } from "@/services/userService";
import { Input } from "@/components/input";
import { Button } from "@/components/button";

export default function ConversaCreation() {
    type User = {
        id: string;
        nome: string;
        email: string;
    };

    const [ inputContent, setInputContent ] = useState("");
    const [ userId, setUserId ] = useState("");
    const [ users, setUsers ] = useState<User[]>([]);


    const fetchData = async () => {
        try{
            const response = await getUsers()
        
            setUsers(response.data)
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

        fetchData();

        const interval = setInterval(fetchData, 3000); // atualiza a cada 3s

        return () => clearInterval(interval);
    }, []);

    const handleCreation = async () => {
        try{
            if (!inputContent.trim()) return;
            if (!userId) {
                Alert.alert("Selecione um usuário");
                return;
            }
        
            setInputContent("");
        
            const conversa = {
                id: "",
                nome: inputContent
            }
        
            const response = await postConversasPrivado(userId, conversa)
            console.log(response.data)
            console.log(userId)
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

    return (
        <View style={styles.container}>
            <View style={{alignItems: "center"}}>
                <Input
                    type="text"
                    icon="mail"
                    placeholder="Digite o nome da conversa"
                    onChangeText={setInputContent}
                />
            </View>
            
            <UserList users={users} 
                selectedUserId={userId}
                onPressUser={(id) => setUserId(id)}/>
                
            <View style={{alignItems: "center"}}>
                <Button label="criar" onPress={handleCreation}/>
            </View>
        </View>
    );
}