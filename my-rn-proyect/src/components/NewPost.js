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
            <View style={styles.postContainer}>
                <Text style={styles.messageText}>Creador: {this.props.post.data.owner}</Text>
                <Text style={styles.messageText}>Mensaje: {this.props.post.data.message}</Text>
                <Text style={styles.messageText}>Cantidad de likes: {this.props.post.data.likes.length}</Text>
                <TouchableOpacity onPress={() => this.likear()}>
                    <Text style={styles.likesText}>
                        {this.state.yaLikeo ? 'Dislike' : 'Like'}
                    </Text>
                </TouchableOpacity>
            </View>

        )
    }
};
const styles = StyleSheet.create({
    /* Tarjeta de cada posteo */
    postContainer: {
      padding: 15,
      backgroundColor: '#ffffff',
      borderRadius: 12,
      marginBottom: 15,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3, // Sombra en Android
      borderWidth: 1,
      borderColor: '#e0e0e0',
    },  
    /* Mensaje */
    messageText: {
      fontSize: 18,
      color: '#333',
      marginBottom: 10,
    }, 
    /* Likes */
    likesText: {
      fontSize: 18,
      color: '#666',
      marginBottom: 10,
    }
  });
  

export default NewPost