import { FlatList, View, Text } from "react-native";
import { styles } from "@/styles/home.styles";
import { MessageBubble } from "../MessageBubble";
import { KeyboardAwareFlatList } from "react-native-keyboard-aware-scroll-view";

type Mensagem = {
  id: string;
  origemId: string;
  type: string;
  content: string;
  createdAt: string;
};

type Props = {
  mensagens: Mensagem[];
};

export function MessageList({ mensagens }: Props) {
  return (
    <FlatList
      data={mensagens}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <MessageBubble mensagem={item}/>
      )}
    />
  );
}