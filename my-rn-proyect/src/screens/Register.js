import { Component } from 'react';
import { auth, db } from '../firebase/config';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';


class Register extends Component {
    constructor(){
        super();
        this.state = {
            email: '',
            password: '',
            username: '',
            registered: false,
            error: '',
        }
    }

    register(email, pass, username){
        if (!email.includes('@')) {
            console.log("Email no formateado"); 
            return(this.setState({error: 'Email no formateado'}))
        }
        else if (pass.length < 6){
            console.log('La password debe tener una longitud minima de 6 caracteres');
            return(this.setState({error:'La password debe tener una longitud minima de 6 caracteres'}))
        }
        auth.createUserWithEmailAndPassword(email, pass)
        .then( response => {
            this.props.navigation.navigate('Login')
            this.setState({registered: true})
            db.collection('users').add({
                email: email,
                username: username,
                createdAt: Date.now(),
                registered: true
            })
        })
        .catch((error) => {
            console.error("Error en createUserWithEmailAndPassword:", error.code, error.message);
            this.setState({ error: error.message });
        });

        console.log(this.state.email);
        console.log(this.state.username);
    }

    render(){
        const {email, pass, username} = this.state;
        const formCompletado = email !== '' && pass !== '' && username !== '';

        return (
            <View>
                <TextInput 
                    keyboardType = 'email-address'
                    placeholder='Ingresa tu email (***)'
                    onChangeText={ email => this.setState({email: email})}
                    value={this.state.email}
                />
                <TextInput 
                    keyboardType = 'default'
                    placeholder='Ingresa tu contaseña (***)'
                    secureTextEntry = {true}
                    onChangeText={ pass => this.setState({password: pass})}
                    value={this.state.password}
                />
                <TextInput 
                    keyboardType = 'default'
                    placeholder='Ingresa tu nombre de usuario (***)'
                    onChangeText={ user => this.setState({username: user})}
                    value={this.state.username}
                />
                <Text>(***): Este es un campo obligatorio.</Text>
                {formCompletado ? (
                    <TouchableOpacity onPress={() => this.register(this.state.email, this.state.password, this.state.username)}>
                        <Text>¡Registrate!</Text>
                    </TouchableOpacity>
                ) : (
                <Text>Completa todos los campos para registrarte.</Text>
                )}

                <Text>{this.state.error}</Text>
                <TouchableOpacity onPress={() => this.props.navigation.navigate("Login")}> 
                    <Text>Inicia sesion</Text>
                </TouchableOpacity>

            </View>
        )
    }

}

export default Register