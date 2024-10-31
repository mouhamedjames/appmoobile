import { View, Text } from 'react-native'
import React from 'react'
import Teacherlogin from "./login.js"
import Teachersignup from "./signup.js"
import hometeacher from "./hometeacher.js"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PendingRequests from './PendingRequests.js';
import TeacherHistory from './TeacherHistory.js';

const app = () => {
    const TeacherStack = createNativeStackNavigator();
  return (
    <TeacherStack.Navigator screenOptions={{ headerShown: false }}>
      <TeacherStack.Screen name="Teacherlogin" component={Teacherlogin} />
      <TeacherStack.Screen name="Teachersignup" component={Teachersignup} />
      <TeacherStack.Screen name="hometeacher" component={hometeacher} />
      <TeacherStack.Screen name="profilteacher" component={hometeacher} />
      <TeacherStack.Screen 
    name="pendingrequests" 
    component={PendingRequests}
    options={{ headerShown: false }}
  />
  <TeacherStack.Screen 
    name="teacherhistory" 
    component={TeacherHistory}
    options={{ headerShown: false }}
  />
     
      {/* Add more teacher-specific screens here */}
    </TeacherStack.Navigator>
  )
}

export default app