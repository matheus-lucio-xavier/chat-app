import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 16,
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
        width: 44,
        height: 36,
        borderRadius: 16,
        borderWidth: 2,
        borderColor: "#d3d3d3",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row"
    }
})