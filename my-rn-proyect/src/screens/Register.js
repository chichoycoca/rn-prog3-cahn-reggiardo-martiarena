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
            error: ''
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
            this.setState({registered: true})
            db.collection('users').add({
                email: email,
                password: pass,
                username: username,
                createdAt: Date.now(),
                registered: true
            })
            .then()
            .catch( error => console.log(error)
            )
        })
        .catch(error =>
            this.setState({error: 'Fallo en el registro'})
        )
    }

    render(){
        return (
            <View>
                <TextInput 
                    keyboardType = 'email-address'
                    placeholder='Ingresa tu email'
                    onChangeText={ email => this.setState({email: email})}
                    value={this.state.email}
                />
                <TextInput 
                    keyboardType = 'default'
                    placeholder='Ingresa tu contaseña'
                    secureTextEntry = {true}
                    onChangeText={ pass => this.setState({password: pass})}
                    value={this.state.password}
                />
                <TextInput 
                    keyboardType = 'default'
                    placeholder='Ingresa tu nombre de usuario'
                    onChangeText={ user => this.setState({username: user})}
                    value={this.state.username}
                />
                
                <TouchableOpacity onPress={() => this.register(this.state.email, this.state.password, this.state.username)}>
                    <Text>¡Registrate!</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=> this.props.navigation.navigate("Login")}> 
                    <Text>Ir a iniciar sesion.</Text>
                </TouchableOpacity>
            </View>
        )
    }

}

export default Register