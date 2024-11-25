import { Component } from "react";
import { StyleSheet } from "react-native";
import { Text, TouchableOpacity, View } from "react-native-web";
import { AntDesign } from '@expo/vector-icons';
import { auth, db } from "../firebase/config";
import firebase from 'firebase';


class NewPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            texto: '',
            arrayLikes: this.props.post.data.likes || [],
            yaLikeo: false,
            cantidadLikes: this.props.post.data.likes.length
        }
    }

    componentDidMount() {
        const userEmail = auth.currentUser.email;
        const yaLikeo = this.state.arrayLikes.includes(userEmail);
        this.setState({ yaLikeo });
    }

    likear() {
        console.log(this.props)
        const userEmail = auth.currentUser.email;


        db.collection('posts')
            .doc(this.props.post.id)
            .update({
                likes: this.state.yaLikeo ? firebase.firestore.FieldValue.arrayRemove(userEmail) : firebase.firestore.FieldValue.arrayUnion(userEmail)
            })
            .then(() => {
                this.setState({
                    yaLikeo: !this.state.yaLikeo,
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
                <AntDesign
                    name={this.state.yaLikeo ? "heart" : "hearto"}
                    size={24}
                    color={this.state.yaLikeo ? "red" : "black"}
                /> 
                    <Text style={styles.likesText}>
                        {this.state.yaLikeo ? 'Dislike' : 'Like'}
                    </Text>
                </TouchableOpacity>
            </View>



        )
    }
};
const styles = StyleSheet.create({
    postContainer: {
        padding: 15,
        backgroundColor: '#fda996',
        borderRadius: 12,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        borderWidth: 1,
        borderColor: '#fda996',
    },
    messageText: {
        fontSize: 20,
        color: '#fff',
        marginBottom: 10,
    },
    likesText: {
        fontSize: 18,
        color: '#fff',
        marginBottom: 10,
    }
});


export default NewPost