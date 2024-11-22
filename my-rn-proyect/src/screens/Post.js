import React, { Component } from "react";
import { db } from "../firebase/config";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native"
import { auth } from "../firebase/config";

class Post extends Component {
    constructor() {
        super();
        this.state = {
            message: ""
        }
    }

    postear(message) {
        this.props.navigation.navigate('Home')
        db.collection('posts').add({
            owner: auth.currentUser.email,
            message: message,
            createdAt: Date.now(),
            likes: []
        })
            .then()
            .catch(e => console.log(e))
    }

    render() {
        return (

            <View style={styles.container}>

                <Text style={styles.title}>Nuevo posteo:</Text>

                <TextInput style={styles.input}
                    keyboardType='default'
                    placeholder='message'
                    onChangeText={text => this.setState({ message: text })}
                    value={this.state.message}
                />

                <TouchableOpacity onPress={() => this.postear(this.state.message)}>
                    <Text style={styles.button}>Postear</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.props.navigation.navigate("Home")}>
                    <Text style={styles.linkText}>Ir al inicio</Text>
                </TouchableOpacity>

            </View>
        )
    }
};

const styles = StyleSheet.create({
    /* Contenedor principal */
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        maxWidth: 400,
        padding: 20,
        borderWidth: 2,
        borderColor: '#dcdcdc', // Color del borde (gris claro)
        borderRadius: 12, // Bordes redondeados
        backgroundColor: '#ffffff', // Fondo blanco dentro de la caja
    },

    /* Título */
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
    },

    /* Campo de entrada */
    input: {
        width: '90%',
        maxWidth: 400,
        padding: 15,
        marginBottom: 20,
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#dcdcdc',
        borderRadius: 12,
        fontSize: 18,
        color: '#333',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2, // Sombra para Android
    },

    /* Botón general */
    button: {
        width: '100%',
        padding: 15,
        borderRadius: 8,
        borderColor: '#dbdbdb',
        borderWidth: 1,
        alignItems: 'center',
        marginTop: 10,
        backgroundColor: '#f8f8f8',
        fontSize: 18,
    },

    buttonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
    },

    /* Link "Ir al inicio" */
    linkText: {
        fontSize: 18,
        color: '#3897f0',
        textDecorationLine: 'underline',
        marginTop: 10,
    },
});


export default Post