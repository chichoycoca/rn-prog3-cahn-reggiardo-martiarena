import { Component } from 'react';
import { auth, db } from '../firebase/config';
import { Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native';


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

    componentDidMount() {
        auth.onAuthStateChanged(user => {
            if (user) {
                this.props.navigation.navigate('MenuHome'); 
            }
        });
    }

    register(email, pass, username){
        if (!email.includes('@')) {
            console.log("Email no formateado"); 
            return(this.setState({error: 'Email no formateado'}))
        }
        else if (pass.length < 6){
            console.log('La contraseña debe tener una longitud minima de 6 caracteres');
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
            this.setState({ error: error });
        });

        console.log(this.state.email);
        console.log(this.state.username);
    }

    render(){
        const {email, pass, username} = this.state;
        const formCompletado = email !== '' && pass !== '' && username !== '';

        return (
            <View style={styles.container}>
                <TextInput style={styles.input}
                    keyboardType = 'email-address'
                    placeholder='Ingresa tu email (*)'
                    onChangeText={ email => this.setState({email: email})}
                    value={this.state.email}
                />
                <TextInput style={styles.input}
                    keyboardType = 'default'
                    placeholder='Ingresa tu contaseña (*)'
                    secureTextEntry = {true}
                    onChangeText={ pass => this.setState({password: pass})}
                    value={this.state.password}
                />
                <TextInput style={styles.input}
                    keyboardType = 'default'
                    placeholder='Ingresa tu nombre de usuario (*)'
                    onChangeText={ user => this.setState({username: user})}
                    value={this.state.username}
                />
                <Text style={styles.obligatorio}>(*): Este es un campo obligatorio.</Text>
                {formCompletado ? (
                    <TouchableOpacity onPress={() => this.register(this.state.email, this.state.password, this.state.username)}>
                        <Text style={styles.button}>Registrate</Text>
                    </TouchableOpacity>
                ) : (
                <Text style={styles.warning}>Por favor, completa todos los campos para registrarte.</Text>
                )}

                <Text>{this.state.error}</Text>
                <TouchableOpacity onPress={() => this.props.navigation.navigate("Login")}> 
                    <Text style={styles.normaltext}>Ir a inicia sesion</Text>
                </TouchableOpacity>

            </View>
        )
    }

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        width: '50%',
        padding: 15,
        marginBottom: 15,
        backgroundColor: '#f8f8f8',
        borderWidth: 1,
        borderColor: '#dbdbdb',
        borderRadius: 8,
        fontSize: 16,
      },
      button: {
        width: '100%',
        padding: 15,
        borderRadius: 8,
        borderColor: '#dbdbdb',
        borderWidth: 1,
        alignItems: 'center',
        marginTop: 10,
        backgroundColor: '#f8f8f8',
        fontSize: 16,
      },
      obligatorio: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 10,
      },
      warning:{
        fontWeight: 'bold',
        color: '#ff0000',
        fontSize: 16,
        marginBottom: 10,
      },
      normaltext:{
        fontSize:16,
    }

});

export default Register