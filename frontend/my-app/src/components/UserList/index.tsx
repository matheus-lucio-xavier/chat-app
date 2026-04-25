import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { styles } from "./styles";

type User = {
  id: string;
  nome: string;
  email: string;
};

type Props = {
  users: User[];
  selectedUserId?: string
  onPressUser: (id: string) => void;
};

export function UserList({ users, selectedUserId = "", onPressUser }: Props) {
  return (
    <FlatList
      data={users}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => {
        const isSelected = item.id === selectedUserId;

        return(
            <TouchableOpacity
            style={[
                styles.userItem,
                isSelected && styles.userItemSelected
            ]}
            onPress={() => onPressUser(item.id)}
            >
                <Text
                    style={[
                    styles.userName,
                    isSelected && styles.userNameSelected
                    ]}
                >
                    {item.email}
                </Text>
            </TouchableOpacity>
        )
      }}
    />
  );
}