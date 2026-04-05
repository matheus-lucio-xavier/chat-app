import { View } from "react-native"
import { styles } from "./styles"
import { Input } from "../input"
import { Button } from "../button"
import { Ionicons } from "@expo/vector-icons"
import { SetStateAction, useState } from "react"

type input = {
    name: string,
    type: "text" | "password",
    icon: keyof typeof Ionicons.glyphMap,
    placeholder: string,
}

type FormProps = {
    inputs: readonly input[],
    onSubmit: (data: Record<string, string>) => void
    labelSubmit: string
}

export function Form({inputs, onSubmit, labelSubmit}: FormProps){

    const [formData, setFormData] = useState<Record<string, string>>({})

    function handleChange(name: string, value: string) {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    function handleSubmit() {
        onSubmit(formData)
    }

    
    return(
        <View style={styles.form}>
            {inputs.map((i, index) => (
                <Input 
                    key={index}
                    type={i.type}
                    icon={i.icon}
                    placeholder={i.placeholder}
                    onChangeText={(text) => handleChange(i.name, text)}/>
            ))}
            
            <Button label={labelSubmit} onPress={handleSubmit}/>
        </View>
    )
}