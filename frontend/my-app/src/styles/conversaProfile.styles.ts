import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 16,
    },

    inputsContainer: {
        height: "18%", 
        alignItems: "center", 
        padding: 16, 
        justifyContent: "space-between"
    },

    headBar: {
        flexDirection: "row",
        marginTop: 10,
        paddingHorizontal: 20,
        justifyContent: "space-between",
        width: "100%",
        alignItems: "center"
    },
    
    buttonContainerAlt: {
        height: 50,
        width: "50%",
        backgroundColor: "#007AFF",
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
        marginBottom: 5,
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
        flexDirection: "row"
    },

    buttonContainerAlt2: {
        height: 50,
        width: "15%",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
        marginBottom: 5,
        flexDirection: "row"
    },

    modalContainer: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 16,
    }
})