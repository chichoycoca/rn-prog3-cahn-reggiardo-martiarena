import { Component } from "react";
import { Text, TextInput, TouchableOpacity, View, CheckBox } from "react-native";
import { auth } from '../firebase/config';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            rememberMe: false,
            error: ''
        }
    }


    login(email, pass){
        if (!email.includes('@')) {
            console.log("Email no formateado"); 
            return(this.setState({error: 'Email no formateado'}))
        }
        else if (pass.length < 6){
            console.log('La password debe tener una longitud minima de 6 caracteres');
            return(this.setState({error:'La password debe tener una longitud minima de 6 caracteres'}))
        }
        auth.signInWithEmailAndPassword(email, pass)
        .then( response => {
            if(this.state.rememberMe){
                auth.onAuthStateChanged( user => {
                    console.log(user)
                })
            }
            this.props.navigation.navigate('Home')
        })
        .catch( error => 
            this.setState({error: 'Fallo en el login'})
        )

    }

    render() {
        return (
            <View>
                <Text>Inica sesion</Text>
                <TextInput
                    keyboardType="email-address"
                    placeholder="Ingresa tu email"
                    onChangeText={email => this.setState({ email: email })}
                    value={this.state.email}
                />
                <TextInput
                    keyboardType="default"
                    placeholder="Ingresa tu contraseña"
                    secureTextEntry={true}
                    onChangeText={pass => this.setState({ password: pass })}
                    value={this.state.password}
                />
                <CheckBox
                    value ={this.state.rememberMe}
                    onValueChange={value => this.setState({rememberMe: value})}
                />
                <Text>Recordarme</Text> 

                <TouchableOpacity onPress={() => this.login(this.state.email, this.state.password)}>
                    <Text>¡Inicia sesion!</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.props.navigation.navigate("Register")}>
                    <Text>¿Todavía no estas registrado? Registrate aquí.</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.props.navigation.navigate("Home")}> 
                    <Text>Ir al inicio</Text>
                </TouchableOpacity>
                
            </View>

        )
    }
}

export default Login