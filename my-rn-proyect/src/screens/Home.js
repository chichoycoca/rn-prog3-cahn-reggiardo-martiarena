import { Component } from "react";
import { Text, View, TouchableOpacity, FlatList, ActivityIndicator } from "react-native";
import { db } from "../firebase/config";
import NewPost from "../components/NewPost"

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
            <View>
                <Text>Inicio</Text>

                <Text>Posteos de tu comunidad: </Text>

                {this.state.loading ? <ActivityIndicator /> :
                    <FlatList
                        data={this.state.posts}
                        keyExtractor={item => item.id.toString()}
                        renderItem={({ item }) => <NewPost post={item} />}
                />}

                <TouchableOpacity onPress={() => this.props.navigation.navigate("Post")}>
                    <Text>Ir a postear</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.props.navigation.navigate("Profile")}>
                    <Text>Ir a mi perfil</Text>
                </TouchableOpacity>
            </View>
 

        )
    }
}

export default Home