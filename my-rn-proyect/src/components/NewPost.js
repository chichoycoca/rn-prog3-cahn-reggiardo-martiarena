import React, { Component } from "react";
import { Text } from "react-native";
import { View } from "react-native-web";

class NewPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //hice la funcion CON clase asi @simon podes hacer lo likes
        }
    }

    render() {
        return (
            <View>
                <Text>Mensaje: {this.props.post.data.message}</Text>
                <Text>Creador: {this.props.post.data.owner}</Text>
                <Text>Cantidad de likes: {this.props.post.data.likes.length}</Text>

                <Text> BOTON DE --- Like ---</Text>
            </View>

        )
    }
}

export default NewPost