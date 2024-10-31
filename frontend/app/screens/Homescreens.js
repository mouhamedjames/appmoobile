import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Logo from '../assets/logo.png'
import School from '../assets/school.png'
import { useNavigation } from '@react-navigation/native';
const { width, height } = Dimensions.get('window');

export default function Homescreens() {
  const navigation = useNavigation();
 
  const imageHeight = height * 0.7
  

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.animatedContainer}>
        <View   style={[styles.hero, { height: imageHeight ,  width:"auto"}]}>
        <Image
          source={School }
          style={styles.heroImage}
          resizeMode="contain"
        />
<Text style={styles.title}>welcome to our school</Text>
        <Text style={styles.text}> with us to  </Text>

        </View>
       

          <View style={styles.content}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('teacher', { screen: 'Teacherlogin' })
              }}>
              <View style={[styles.button, styles.blockButton]}>
                <Text style={styles.buttonText}>Get Started as Teacher</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('signupstudent')
              }}>
              <View style={[styles.button, styles.buttonSecondary, styles.blockButton]}>
                <Text style={styles.buttonText}>Get Started as Student</Text>
              </View>
            </TouchableOpacity>
          </View>
        
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  
  },
  animatedContainer: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: '500',
    color: '#281b52',
    textAlign: 'center',
  
    marginBottom: 40,
    lineHeight: 40,
  },
  text: {
    fontSize: 15,
    lineHeight: 24,
    fontWeight: '400',
    color: '#9992a7',
    textAlign: 'center',
  },
  hero: {
    
  
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  content: {
    marginTop: 20,
    paddingHorizontal: 24,
  },
  button: {
    backgroundColor: '#56409e',
    paddingVertical: 12,
    paddingHorizontal: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    marginBottom: 12,
  },
  buttonSecondary: {
    backgroundColor: '#f56b2a',
  },
  blockButton: {
    width: '100%',
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#fff',
  },
});
