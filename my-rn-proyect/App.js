import { StyleSheet } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Register from './src/screens/Register'
import Login from './src/screens/Login';
import Home from './src/screens/Home';
import Post from './src/screens/Post';
import Profile from './src/screens/Profile';
import Filtrador from './src/screens/Filtrador';
import MenuHome from './src/components/MenuHome';
const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        
          <Stack.Screen name='Login' component={Login} />
          <Stack.Screen name='Register' component={Register} />
          <Stack.Screen name='Post' component={Post} />
          <Stack.Screen name ='Profile' component={Profile}/> 
          <Stack.Screen name ='Filtrador' component={Filtrador}/> 
          <Stack.Screen name ='MenuHome' component={MenuHome}/> 


      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
