import React, { Component } from "react";
import { View, Text, TextInput, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import { db } from "../firebase/config";

class Filtrador extends Component {
    constructor() {
        super();
        this.state = {
            text: "", 
            resultados: [],
            users: [], 
            buscando: false,
            mensajeError: "",
        };
    }

    componentDidMount() {
        db.collection("users").onSnapshot(docs => {
                let users = [];
                docs.forEach(doc => {
                    users.push({ 
                        id: doc.id, 
                        data: doc.data() 
                    })
                })
                this.setState({ users });
            },
            (error) => {
                console.error("Error al cargar los usuarios:", error);
            }
        );
    }

    buscarUsuarios(text) {
        if (text === "") {
            this.setState({
                resultados: [],
                mensajeError: "",
            });
            return;
        }

        this.setState({ buscando: true });

        const resultados = this.state.users.filter((usuario) => {
            const email = usuario.data.email.toLowerCase();
            const textLower = text.toLowerCase();
        
            return email.includes(textLower);
        });

        if (resultados.length === 0) {
            this.setState({
                resultados: [],
                mensajeError: "El email/user name no existe",
                buscando: false,
            });
        } else {
            this.setState({
                resultados,
                mensajeError: "",
                buscando: false,
            });
        }
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

                {this.state.mensajeError ? (
                    <Text style={styles.errorMessage}>{this.state.mensajeError}</Text>
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
        backgroundColor: "#025669",
    },
    input: {
        height: 40,
        borderColor: "#fda996",
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
        backgroundColor: '#fda996',
        color:'#fff',
        fontWeight: "bold",
        fontSize: 16,
    },
    errorMessage: {
        fontSize: 16,
        color: "red",
        textAlign: "center",
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
