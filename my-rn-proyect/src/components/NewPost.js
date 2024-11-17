import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { db, auth } from '../firebase/config';
import firebase from 'firebase';

class NewPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            texto:'',
            arrayLikes: this.props.post.data.likes || [],
            yaLikeo: false,
            cantidadLikes: this.props.post.data.likes.length      
        }
    }

    componentDidMount(){
        const userEmail = auth.currentUser.email;
        const yaLikeo = this.state.arrayLikes.includes(userEmail);
        this.setState({ yaLikeo });
    }

    likear(){
        console.log(this.props)
        const userEmail = auth.currentUser.email;


        db.collection('posts')
        .doc(this.props.post.id)
        .update({
            likes: this.state.yaLikeo ? firebase.firestore.FieldValue.arrayRemove(userEmail) : firebase.firestore.FieldValue.arrayUnion(userEmail)
        })
        .then(()=>{
            this.setState({
                yaLikeo:  !this.state.yaLikeo ,
                cantidadLikes: this.state.yaLikeo ? this.state.cantidadLikes - 1 : this.state.cantidadLikes + 1
            });
            console.log(this.state.yaLikeo)
        })
    }

    render() {
        const userEmail = auth.currentUser.email;
        return (
            <View>
                <Text>Creador: {this.props.post.data.owner}</Text>
                <Text>Mensaje: {this.props.post.data.message}</Text>
                <Text>Cantidad de likes: {this.props.post.data.likes.length}</Text>
                <TouchableOpacity 
                    onPress={() => this.likear()}>
                    <Text >
                        {this.state.yaLikeo ? 'Quitar Like' : 'Dar Like'}
                    </Text>
                </TouchableOpacity>
            </View>

        )
    }
}

export default NewPost