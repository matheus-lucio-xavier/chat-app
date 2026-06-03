import { View, Text, Alert, Modal, Pressable } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { use, useEffect, useState } from "react";
import { styles } from "@/styles/conversaProfile.styles";
import { getConversaMembros, getConversaMensagens, postConversaMembro, postConversaMensagem } from "@/services/conversaService";
import { MessageInput } from "@/components/MessageInput";
import { MessageList } from "@/components/MessageList";
import { Button } from "@/components/button";
import { UserList } from "@/components/UserList";
import { Input } from "@/components/input";
import { getUsers } from "@/services/userService";

export default function ConversaProfile() {
    type User = {
        id: string;
        nome: string;
        email: string;
    };

    const { id, nome, type } = useLocalSearchParams();
    const [ userMembers, setUserMembers ] = useState<User[]>([]);
    const [ users, setUsers ] = useState<User[]>([]);
    const [ selectedUser, setSelectedUser] = useState("");
    const [ searchUserMember, setSearchUserMember ] = useState(""); 
    const [ searchUser, setSearchUser ] = useState(""); 
    const [ modalOpen, setModalOpen ] = useState(false);

    const fetchData = async () => {
        try{
            const response1 = await getConversaMembros(id as string)
            const response2 = await getUsers()
        
            setUserMembers(response1.data)
            setUsers(response2.data)
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

    const handleAddMember = async () => {
        try{
            if (!selectedUser.trim()) return;

            setSelectedUser("")

            await postConversaMembro(id as string, selectedUser as string)
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
            <View style={styles.headBar}>
                <Button style={styles.buttonContainerAlt2} icon="arrow-back-outline" iconSize={30}
                    onPress={() => {router.dismiss()}}/>
                <Text style={{verticalAlign: "bottom"}}>{nome}</Text>
            </View>
            <Text style={{alignSelf: "center"}}>{type == "0" ? "Privado" : "Grupo"}</Text>

            <View style={styles.inputsContainer}>
                <Input 
                    type="text"
                    icon="search"
                    placeholder="Digite o email de um usuario"
                    onChangeText={setSearchUserMember}
                />
            </View>

            <UserList users={userMembers.filter(u => !searchUserMember.trim()? true : u.email.toLowerCase().includes(searchUserMember.toLowerCase()))} onPressUser={() => {}}/>
            
            <View style={type == "1" ? {alignItems: "center"} : {alignItems: "center", display: "none"}}>
                <Button style={styles.buttonContainerAlt} icon="add-outline" iconSize={30} label="Adcionar membro"
                        onPress={() => {setModalOpen(true)}}/>
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalOpen}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalOpen(!modalOpen);
                }}>
                <View style={styles.modalContainer}>
                    
                    <Button style={styles.buttonContainerAlt2} icon="arrow-back-outline" iconSize={30}
                        onPress={() => {setModalOpen(!modalOpen)}}/>
                    <View style={styles.inputsContainer}>
                        <Input  
                            type="text"
                            icon="search"
                            placeholder="Digite o email de um usuario"
                            onChangeText={setSearchUser}
                        />
                    </View>
                    <UserList users={users.filter(u => !searchUser.trim()? userMembers.find(m => m.id == u.id) == undefined : u.email.toLowerCase().includes(searchUser.toLowerCase()))}
                        selectedUserId={selectedUser} 
                        onPressUser={(id) => setSelectedUser(id)}/>
                    <View style={{alignItems: "center"}}>
                        <Text>{id}</Text>
                        <Text>{selectedUser}</Text>
                        <Button style={styles.buttonContainerAlt} icon="add-outline" iconSize={30} label="Adcionar membro"
                            onPress={handleAddMember}/>
                    </View>
                </View>
            </Modal>
            
        </View>
    );
}