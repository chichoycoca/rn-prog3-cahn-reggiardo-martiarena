import { StyleSheet } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Register from './src/screens/Register'
import Login from './src/screens/Login';
import MenuHome from './src/components/MenuHome';
const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator  >
        
          <Stack.Screen  name='Login' options={{headerShown: false}} component={Login} />
          <Stack.Screen  name='Register' options={{headerShown: false}} component={Register} />
          <Stack.Screen  name ='MenuHome' options={{headerShown: false}}  component={MenuHome}/> 


      </Stack.Navigator>
    </NavigationContainer>
  );
}

