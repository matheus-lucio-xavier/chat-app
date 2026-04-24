import { Text, TouchableOpacity, TouchableOpacityProps} from "react-native"
import { styles } from "./styles"
import { Ionicons } from "@expo/vector-icons"

type ButtonBaseProps = TouchableOpacityProps;

type ButtonWithLabel = {
  label: string;
  icon?: keyof typeof Ionicons.glyphMap;
};

type ButtonWithIcon = {
  icon: keyof typeof Ionicons.glyphMap;
  label?: string;
};

type ButtonProps = ButtonBaseProps & (ButtonWithLabel | ButtonWithIcon);

export function Button({label, icon, ...rest}: ButtonProps){
    return(
        <TouchableOpacity style={styles.container} activeOpacity={0.6} {...rest}>
            <Ionicons
                name={icon}
                size={20}
                color="#333333"
            />
            <Text style={styles.label}>{label}</Text>
        </TouchableOpacity>
    )
}