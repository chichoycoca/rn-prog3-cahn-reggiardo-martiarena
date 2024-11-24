import { Component } from "react";
import { Text, TextInput, TouchableOpacity, View, CheckBox, StyleSheet } from "react-native";
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


    login(email, pass) {
        if (!email.includes('@')) {
            console.log("Email no formateado");
            return (this.setState({ error: 'Email no formateado' }))
        }
        else if (pass.length < 6) {
            console.log('La password debe tener una longitud minima de 6 caracteres');
            return (this.setState({ error: 'La password debe tener una longitud minima de 6 caracteres' }))
        }
        auth.signInWithEmailAndPassword(email, pass)
            .then(response => {
                if (this.state.rememberMe) {
                    auth.onAuthStateChanged(user => {
                        console.log(user)
                    })
                }
                this.props.navigation.navigate('Home')
            })
            .catch(error =>
                this.setState({ error: 'Fallo en el login' })
            )

    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput style={styles.input}
                    keyboardType="email-address"
                    placeholder="Ingresa tu email"
                    onChangeText={email => this.setState({ email: email })}
                    value={this.state.email}
                />
                <TextInput style={styles.input}
                    keyboardType="default"
                    placeholder="Ingresa tu contraseña"
                    secureTextEntry={true}
                    onChangeText={pass => this.setState({ password: pass })}
                    value={this.state.password}
                />
                <View style={styles.remember}>
                    <CheckBox
                        value={this.state.rememberMe}
                        onValueChange={value => this.setState({ rememberMe: value })} />
                    <Text style={styles.normaltext}>Recordarme</Text> 
                </View>


                <TouchableOpacity onPress={() => this.login(this.state.email, this.state.password)}>
                    <Text style={styles.button}>Inicia sesion</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.props.navigation.navigate("Register")}>
                    <Text style={styles.normaltext}>¿Todavía no estas registrado? Registrate aquí.</Text>
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
        borderColor: '#dbdbdb',
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
        backgroundColor: '#f8f8f8',
        fontSize: 16,
        marginBottom: 15,
    },
    remember: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 15,
    },
    normaltext:{
        fontSize:16,
    }
});

export default Login