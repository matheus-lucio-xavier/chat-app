import { styles } from "@/styles/conversaCreation.styles";
import { Form } from "@/components/form"
import { UserList } from "@/components/UserList"
import { Alert, View } from "react-native";
import { postConversasGrupo, postConversasPrivado } from "@/services/conversaService";
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
    const [ searchUser, setSearchUser] = useState("");


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

    const handleCreationPrivado = async () => {
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

    const handleCreationGrupo = async () => {
        try{
            if (!inputContent.trim()) return;
        
            setInputContent("");
        
            const conversa = {
                id: "",
                nome: inputContent
            }
        
            const response = await postConversasGrupo(conversa)
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
            <View style={styles.inputsContainer}>
                <Input
                    type="text"
                    icon="mail"
                    placeholder="Digite o nome da conversa"
                    onChangeText={setInputContent}
                />
                <Input 
                    type="text"
                    icon="search"
                    placeholder="Digite o email de um usuario"
                    onChangeText={setSearchUser}
                />
            </View>

            <View style={{alignItems: "center"}}>
                <Button style={styles.buttonContainerAlt} label="criar grupo" onPress={handleCreationGrupo}/>
            </View>
            
            <UserList 
                users={users.filter(u => !searchUser.trim()? true : u.email.toLowerCase().includes(searchUser.toLowerCase()))} 
                selectedUserId={userId}
                onPressUser={(id) => setUserId(id)}
            />
                
            <View style={{alignItems: "center"}}>
                <Button label="criar" onPress={handleCreationPrivado}/>
            </View>
        </View>
    );
}