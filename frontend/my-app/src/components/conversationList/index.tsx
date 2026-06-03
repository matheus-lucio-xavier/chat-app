import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { styles } from "./styles";

type Conversa = {
  id: string;
  nome: string;
  type: number;
};

type Props = {
  conversas: Conversa[];
  onPressChat: (id: string, nome: string, tipo: number) => void;
};

export function ConversationList({ conversas, onPressChat }: Props) {
  return (
    <FlatList
      data={conversas}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.chatItem}
          onPress={() => onPressChat(item.id, item.nome, item.type)}
        >
          <Text style={styles.chatName}>{item.nome}</Text>
        </TouchableOpacity>
      )}
    />
  );
}