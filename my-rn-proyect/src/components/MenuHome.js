import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Post from "../screens/Post";
import Profile from "../screens/Profile";
import Filtrador from "../screens/Filtrador";
import {MaterialIcons, MaterialCommunityIcons, FontAwesome} from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

function MenuHome() {
    return(
        <NavigationContainer>
            <Tab.Navigator screenOptions={{ tabBarShowLabel: false }}>
                    <Tab.Screen name="Post" component={Post} options={{ tabBarIcon: () => <MaterialIcons name="post-add" size={24} color="black" /> }} />
                    <Tab.Screen name="Profile" component={Profile} options={{ tabBarIcon: () => <MaterialCommunityIcons name="face-man-profile" size={24} color="black" /> }} />
                    <Tab.Screen name="Filtador" component={Filtrador} options={{ tabBarIcon: () => <FontAwesome name="search" size={24} color="black" /> }} />
                </Tab.Navigator>
        </NavigationContainer>
    )
}

export default MenuHome