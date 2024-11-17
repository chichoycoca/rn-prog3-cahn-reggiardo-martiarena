import { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";

class Home extends Component{
    constructor(){
        super()
    }

    render(){
        return(
            <View> 
                <Text>Inicio</Text>

                <TouchableOpacity onPress={()=> this.props.navigation.navigate("Post")}>
                    <Text> Ir a postear </Text>
                </TouchableOpacity>

            </View>
            

        )
    }
}

export default Home