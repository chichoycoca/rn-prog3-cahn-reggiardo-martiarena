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

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#025669',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    subHeader: {
        fontSize: 20,
        color: '#fff',
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
