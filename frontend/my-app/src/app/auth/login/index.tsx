import { Input } from "@/components/input"
import { Button } from "@/components/button"
import { View, Text, ScrollView, KeyboardAvoidingView, Platform, Alert} from "react-native"
import { useState } from "react"
import { Link, router, Router } from "expo-router"
import { styles } from "../../../styles/login.styles"
import { login } from "@/services/authService"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Form } from "@/components/form"

const props = [
    {
        name: "email",
        type: "text",
        icon: "mail",
        placeholder: "Digite seu email"
    },
    {
        name: "password",
        type: "password",
        icon: "lock-closed",
        placeholder: "Digite sua senha"
    }
] as const


export default function Login(){

    const handleLogin = async (data: Record<string, string>) => {

        try{
            const response = await login(data.email, data.password)

            const token = response.data.token

            await AsyncStorage.setItem("token", token)

            Alert.alert(`Login efetuado com ${response.data.usuario.nome}`)
            console.log(response.data)
            router.replace("/app/home")
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
        <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.select({ ios: "padding", android: "height"})}>
            <ScrollView contentContainerStyle={{flexGrow: 1}} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
                <View style={styles.container}>

                    <Text style={styles.title}>Entrar</Text>
                    <Text style={styles.subtitle}>accese sua conta com e-mail e senha</Text>

                    <Form 
                        inputs={props}
                        onSubmit={handleLogin}
                        labelSubmit="Entrar"
                    />

                    <Text style={styles.footerText}>
                        Não tem uma conta? <Link style={styles.footerLink} href={"/auth/signup"}>cadastre-se!</Link>
                    </Text>

                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}