import { Input } from "@/components/input"
import { Button } from "@/components/button"
import { View, Text, ScrollView, KeyboardAvoidingView, Platform, Alert} from "react-native"
import { useState } from "react"
import { Link, router, Router } from "expo-router"
import { styles } from "./_styles"

export default function Login(){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")


    function handleSignIn(){
        if (!email.trim() || !password.trim()){
            return Alert.alert("Entrar", "Preencha Email e Senha para entrar.")
        }
        if (email.trim() != "teste@gmail.com" || password.trim() != "123456"){
            return Alert.alert("Entrar", "E-mail e/ou senhas incorretos")
        }

        Alert.alert("Bem-vindo", `Login com ${email}`)
        router.replace("/app/home")

    }


    return (
        <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.select({ ios: "padding", android: "height"})}>
            <ScrollView contentContainerStyle={{flexGrow: 1}} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
                <View style={styles.container}>

                    <Text style={styles.title}>Entrar</Text>
                    <Text style={styles.subtitle}>accese sua conta com e-mail e senha</Text>
                    
                    <View style={styles.form}>
                        <Input
                            type="text"
                            icon="person"
                            placeholder="E-mail"
                            onChangeText={setEmail}
                            keyboardType="email-address"
                        />
                        <Input
                            type="password"
                            icon="pencil"
                            placeholder="Senha"
                            onChangeText={setPassword}
                        />
                        <Button label="entrar" onPress={handleSignIn}/>
                    </View>

                    <Text style={styles.footerText}>
                        Não tem uma conta? <Link style={styles.footerLink} href={"/auth/signup"}>cadastre-se!</Link>
                    </Text>

                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}