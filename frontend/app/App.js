import { StatusBar } from 'expo-status-bar';
import {  Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from "react-redux";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Homescreens from './screens/Homescreens.js';
import Signup from "./screens/Signup.js"
import store from "./screens/redux/store.js"
import signin from "./screens/signin.js"
import addlesson from "./screens/teacher/addlesson.js"
import homestudent from "./screens/homestudent.js"
import profilsetting from "./screens/profilesetting.js"
import teacher from "./screens/teacher/app.js"
import reserve from "./screens/reserver.js"
import Search from "./components/SearchResults.js"
import LessonHistory from './screens/student/LessonHistory.js';
import PendingLessons from './screens/student/PendingLessons.js';
import AcceptedLessons from './screens/student/AcceptedLessons.js';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>

<Provider store={store}>
      <Stack.Navigator>
      <Stack.Screen name="Home" component={Homescreens} options={{headerShown:false}} />
        <Stack.Screen name="signupstudent" component={Signup} options={{headerShown:false}} />
        <Stack.Screen name="signinstudent" component={signin} options={{headerShown:false}} />
        <Stack.Screen name="addlesson" component={addlesson} options={{headerShown:false}} />
        <Stack.Screen name="homestudent" component={homestudent} options={{headerShown:false}} />
        <Stack.Screen name="profilsetting" component={profilsetting} options={{headerShown:false}} />
        <Stack.Screen name="teacher" component={teacher} options={{headerShown:false}} />
        <Stack.Screen name="reserve" component={reserve} options={{headerShown:false}} />
        <Stack.Screen name="search" component={Search } options={{headerShown:false}} />
        <Stack.Screen 
    name="history" 
    component={LessonHistory}
    options={{ headerShown: false }}
  />
  <Stack.Screen 
    name="pending" 
    component={PendingLessons}
    options={{ headerShown: false }}
  />
  <Stack.Screen 
    name="accepted" 
    component={AcceptedLessons}
    options={{ headerShown: false }}
  />
        
      </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
}



