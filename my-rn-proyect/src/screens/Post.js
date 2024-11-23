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
            <View style={styles.mainContainer}>

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
                        <Text style={styles.normaltext}>Ir al home</Text>
                    </TouchableOpacity>

                </View>
            </View>
        )
    }
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: '#f9f9f9', 
    },
    container: {
        padding: 200,
        backgroundColor: '#ffffff',
        borderRadius: 12,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3, 
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
    },
    normaltext: {
        fontSize: 16,
    },
    input: {
        width: '90%',
        maxWidth: 400,
        padding: 15,
        marginBottom: 15,
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#dcdcdc',
        borderRadius: 12,
        fontSize: 16,
        color: '#333',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    button: {
        width: '60%',
        padding: 15,
        borderRadius: 8,
        borderColor: '#dbdbdb',
        borderWidth: 1,
        alignItems: 'center',
        marginBottom: 15,
        backgroundColor: '#f8f8f8',
        fontSize: 16,
    }
});


export default Post