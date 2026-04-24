import ConversaCreation from "@/app/home/conversaCreation";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },

  buttonContainerAlt: {
        height: 50,
        width: "20%",
        backgroundColor: "#007AFF",
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
        marginBottom: 20,
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
        flexDirection: "row"
    },

  chatItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  chatName: {
    fontSize: 16,
  },

  message: {
    padding: 10,
    margin: 8,
    backgroundColor: "#eee",
    borderRadius: 8,
    alignSelf: "flex-start",
  },

  inputContainer: {
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#ddd",
  },

  inputAlt: {
    width: "80%",
    height: 50,
    backgroundColor: "#D9D9D9",
    borderRadius: 12,
    marginTop: 16,
    paddingHorizontal: 10,
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  sendButton: {
    marginLeft: 10,
    justifyContent: "center",
  },
});