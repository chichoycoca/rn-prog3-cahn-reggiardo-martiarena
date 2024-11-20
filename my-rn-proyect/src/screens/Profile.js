import React, { Component } from "react";
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import { db, auth } from "../firebase/config";

class Profile extends Component {
    constructor(){
        super();
        this.state = {
            user: null,
            posts: [],
            loading: true,
            postCount: 0,
            username: '',
        }
    }

    componentDidMount() {
        const currentUser = auth.currentUser;  
        if (currentUser) {
            this.setState({ user: currentUser });
            db.collection("posts")
                .where("owner", "==", currentUser.email) 
                .onSnapshot((docs) => {
                    let posts = [];
                    docs.forEach((doc) => {
                        posts.push({
                            id: doc.id,
                            data: doc.data(),
                        });
                    });
                    this.setState({
                        posts: posts,
                        postCount: posts.length, 
                        loading: false,
                    });
                });
        }
    }

    borrarPost = (postId) => {
        db.collection("posts").doc(postId).delete()
            .then(() => {
                console.log("Post eliminado exitosamente");
            })
            .catch((error) => {
                console.error("Error al eliminar el post: ", error);
            });
    };

    logout = () => {
        auth
            .signOut()
            .then(() => {
                this.props.navigation.navigate("Login");
            })
            .catch((error) => {
                console.log("Error al cerrar sesión:", error);
            });
    };
  
    render(){
    return (
        <View style={styles.container}>
            {this.state.loading ? <ActivityIndicator size="large" color="#0000ff" /> : 
                <React.Fragment>
                    <Text style={styles.title}>Perfil</Text>
                    <Text style={styles.username}>Nombre de usuario: {this.state.username || "No disponible"}</Text>
                    <Text style={styles.email}>Email: {this.state.user.email}</Text>
                    <Text style={styles.postCount}>Cantidad de posteos: {this.state.postCount}</Text>

                    <Text style={styles.postTitle}>Tus posteos:</Text>
                    {this.state.postCount === 0 ? 
                        <Text style={styles.noPosts}>No tienes posteos aún.</Text>
                     : 
                        <FlatList
                            data={this.state.posts}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => (
                                <View style={styles.postItem}>
                                    <Text>{item.data.message}</Text>
                                    <TouchableOpacity onPress={() => this.borrarPost(item.id)}>
                                        <Text style={styles.deleteButton}>Eliminar</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        />
                    }

                    <TouchableOpacity onPress={this.logout}>
                        <Text style={styles.logoutButton}>Cerrar sesión</Text>
                    </TouchableOpacity>
                </React.Fragment>
            }
        </View>
    );
}

}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    username: {
        fontSize: 18,
        marginVertical: 10,
    },
    email: {
        fontSize: 16,
        marginVertical: 5,
    },
    postCount: {
        fontSize: 16,
        marginVertical: 5,
    },
    postTitle: {
        fontSize: 18,
        marginVertical: 10,
    },
    noPosts: {
        fontSize: 16,
        color: 'gray',
    },
    postItem: {
        marginBottom: 10,
        padding: 10,
        backgroundColor: '#f4f4f4',
        borderRadius: 8,
    },
    deleteButton: {
        color: 'red',
        fontSize: 14,
        marginTop: 5,
    },
    logoutButton: {
        marginTop: 20,
        color: 'blue',
        fontSize: 16,
        textAlign: 'center',
    },
});

export default Profile;
