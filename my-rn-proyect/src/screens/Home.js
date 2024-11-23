import { Component } from "react";
import { Text, View, TouchableOpacity, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import { db } from "../firebase/config";
import NewPost from "../components/NewPost";

class Home extends Component {
    constructor() {
        super()
        this.state = {
            users: [],
            loading: true
        }
    }

    componentDidMount() {
        db.collection("posts")
        .orderBy('createdAt', 'desc')
        .onSnapshot(
            docs => {
                let posts = [];
                docs.forEach(doc => {
                    posts.push({
                        id: doc.id,
                        data: doc.data()
                    })
                    this.setState({
                        posts: posts,
                        loading: false
                    })
                })
            }
        )
    }

    render() {
        return (
            <View style={styles.container}>
    
                <Text style={styles.subHeader}>Posteos de tu comunidad: </Text>

                {this.state.loading ? <ActivityIndicator /> :
                    <FlatList
                        data={this.state.posts}
                        keyExtractor={item => item.id.toString()}
                        renderItem={({ item }) => <NewPost post={item} />}
                        contentContainerStyle={styles.postList}
                    />}

                <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate("Post")}>
                    <Text style={styles.buttonText}>Ir a postear</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate("Profile")}>
                    <Text style={styles.buttonText}>Ir a mi perfil</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate("Filtrador")}>
                    <Text style={styles.buttonText}>Ir a Filtrador</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f9f9f9',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    subHeader: {
        fontSize: 20,
        color: '#555',
        marginBottom: 15,
    },
    postList: {
        paddingBottom: 20,
    },
    button: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        marginVertical: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Home;
