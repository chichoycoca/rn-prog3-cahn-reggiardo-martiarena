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
                
                <Text>Nuevo posteo:</Text>

                <TextInput style={styles.field}
                    keyboardType='default'
                    placeholder='message'
                    onChangeText={text => this.setState({ message: text })}
                    value={this.state.message}
                />

                <TouchableOpacity onPress={()=> this.postear(this.state.message)}> 
                    <Text>Postear</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=> this.props.navigation.navigate("Home")}>
                    <Text>Ir al inicio</Text>
                </TouchableOpacity>

            </View>
        )
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    field: {
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default Post