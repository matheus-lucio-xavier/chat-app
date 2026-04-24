import { Input } from "@/components/input"
import { Button } from "@/components/button"
import { Form } from "@/components/form"
import { View, Text, ScrollView, KeyboardAvoidingView, Platform, Alert} from "react-native"
import { Link, router } from "expo-router"
import { styles } from "../../../styles/signup.styles"
import AsyncStorage from "@react-native-async-storage/async-storage"
import * as SecureStore from "expo-secure-store"
import { register } from "@/services/authService"
import { useState } from "react"

const props = [
    {
        name: "name",
        type: "text",
        icon: "person",
        placeholder: "Digite seu nome"
    },
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
    },
    {
        name: "confirmPassword",
        type: "password",
        icon: "lock-closed",
        placeholder: "Confirme sua senha"
    }
] as const

export default function Signup(){

    const handleSignup = async (data: Record<string, string>) => {

        if (!data.password || !data.confirmPassword) {
            Alert.alert("Preencha todos os campos")
            return
        }

        if (data.confirmPassword !== data.password) {
            Alert.alert("As senhas não coincidem")
            return
        }

        try{
            const response = await register(data.name, data.email, data.password)

            const token = response.data.token

            //await AsyncStorage.setItem("token", token)
            await SecureStore.setItemAsync("token", token)

            Alert.alert(`Login efetuado com ${response.data.usuario.email}`)
            router.replace("/home")
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

                    <Text style={styles.title}>Registrar</Text>
                    <Text style={styles.subtitle}>cadastre sua conta com e-mail e senha</Text>
                    
                    <Form 
                        inputs={props}
                        onSubmit={handleSignup}
                        labelSubmit="Cadastrar"
                    />

                    <Text style={styles.footerText}>
                        Ja possui uma conta? <Link style={styles.footerLink} href="/auth/login">login!</Link>
                    </Text>

                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}