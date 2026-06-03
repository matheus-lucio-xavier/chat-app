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

    buttonContainerAlt: {
        padding: 15,
        borderBottomWidth: 4,
        borderBottomColor: "#eee",
        width: "100%",
        marginBottom: 16
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

    headBar: {
        flexDirection: "row",
        marginTop: 10,
        paddingHorizontal: 20,
        justifyContent: "space-between",
        width: "100%",
        alignItems: "center"
    }
});