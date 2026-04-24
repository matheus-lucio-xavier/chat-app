import { useState } from "react";
import { Ionicons } from "@expo/vector-icons"
import { TextInput, TextInputProps, View, TouchableOpacity } from "react-native";
import { styles } from "./styles";

type Props = TextInputProps & {
    type: "text" | "password"
    icon: keyof typeof Ionicons.glyphMap
}

export function Input({ type, icon, ...rest }: Props) {

    const [showPassword, setShowPassword] = useState(false)

    return (
        <View style={styles.container}>
            <View style={styles.group}>
                <Ionicons
                    name={icon}
                    size={20}
                    color="#333333"
                />

                <TextInput
                    style={styles.input}
                    placeholderTextColor="#333333"
                    secureTextEntry={type === "password" ? !showPassword : false}
                    autoCorrect={false}
                    autoCapitalize="none"
                    {...rest}
                />
            </View>

            {type === "password" && (
                <TouchableOpacity onPress={() => {setShowPassword(!showPassword)}} activeOpacity={0.8}>
                    <Ionicons
                    name={showPassword ? "eye" : "eye-off"}
                    size={20}
                    color="#333333"
                    />
                </TouchableOpacity>
            )}
        </View>
    )
}