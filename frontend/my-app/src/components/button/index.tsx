import { Text, TouchableOpacity, TouchableOpacityProps} from "react-native"
import { styles } from "./styles"
import { Ionicons } from "@expo/vector-icons"

type ButtonBaseProps = TouchableOpacityProps;

type ButtonWithLabel = {
  label: string;
  icon?: keyof typeof Ionicons.glyphMap;
  iconSize?: number;
};

type ButtonWithIcon = {
  icon: keyof typeof Ionicons.glyphMap;
  label?: string;
  iconSize?: number;
};

type ButtonProps = ButtonBaseProps & (ButtonWithLabel | ButtonWithIcon);

export function Button({label, icon, iconSize=20, ...rest}: ButtonProps){
    return(
        <TouchableOpacity style={styles.container} activeOpacity={0.6} {...rest}>
            <Ionicons
                name={icon}
                size={iconSize}
                color="#333333"
            />
            <Text style={styles.label}>{label}</Text>
        </TouchableOpacity>
    )
}