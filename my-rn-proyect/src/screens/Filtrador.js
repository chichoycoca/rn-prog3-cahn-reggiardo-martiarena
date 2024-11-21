import React, { Component } from "react";
import { View, Text, TextInput, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import { db } from "../firebase/config";

class Filtrador extends Component {
    constructor() {
        super();
        this.state = {
            text: "",
            resultados: [],
            buscando: false,
        };
    }

    buscarUsuarios(text) {
        if (text === "") { 
            this.setState({ 
                resultados: [], 
                buscando: false 
            });
            return;
        }

        this.setState({ buscando: true });

        db.collection("users")
            .where("email", "==", text)
            .onSnapshot((snapshot) => {
                let resultados = [];
                snapshot.forEach((doc) => {
                    resultados.push({ id: doc.id, data: doc.data() });
                });
                this.setState({
                    resultados,
                    buscando: false,
                });
            }, (error) => {
                console.log(error);
                this.setState({ buscando: false });
            });
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder="Buscar por email"
                    onChangeText={(text) => {
                        this.setState({ text });
                        this.buscarUsuarios(text);
                    }}
                    value={this.state.text}
                />

                {this.state.buscando && <ActivityIndicator size="large" color="#0000ff" />}

                {this.state.resultados.length === 0 && this.state.text.length > 0 && !this.state.buscando ? (
                    <Text>El email no existe</Text>
                ) : (
                    <FlatList
                        data={this.state.resultados}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <View style={styles.resultItem}>
                                <Text style={styles.email}>Email: {item.data.email}</Text>
                                <Text>Username: {item.data.username}</Text>
                            </View>
                        )}
                    />
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    input: {
        height: 40,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    resultItem: {
        padding: 10,
        borderBottomColor: "#ccc",
        borderBottomWidth: 1,
    },
    email: {
        fontWeight: "bold",
    },
});

export default Filtrador;