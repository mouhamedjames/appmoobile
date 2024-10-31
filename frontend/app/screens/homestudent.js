import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  Modal,
  StatusBar
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useSelector } from "react-redux";
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';


import SchoolMap from '../components/SchoolMap';



import { useNavigation } from '@react-navigation/native';
export default function Homestudent() 
{
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchModalVisible, setIsSearchModalVisible] = useState(false);


  const buttons = [
    { text: 'Reserve Lesson', icon: <Icon name="book" size={24} color="white" /> ,redirect:'reserve'},
    { text: 'Lesson History', icon: <MaterialIcon name="history" size={24} color="white" />,redirect:'history'},
    { text: 'Pending Lessons', icon: <MaterialIcon name="pending-actions" size={24} color="white" />,redirect:'pending'},
    { text: 'Accepted Lessons', icon: <Ionicon name="checkmark-circle-outline" size={24} color="white" />,redirect:'accepted'},
  ];
  const user= useSelector((state) => state.user.currentUser)
  const navigation = useNavigation();

  // Example coordinates - replace with your school's actual location
  const handleSearch = () => {
    navigation.navigate('search', {
      searchQuery: searchQuery
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.container}>
        <View>
          <View style={styles.actionWrap}>
            <View style={styles.actionWrapper}>

            
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('profilsetting')
              }}
              style={{ marginRight: 'auto' }}>
              <View style={styles.action}>
              <FeatherIcon
                  color="#6a99e3"
                  name="user"
                  size={22} />
             
              </View>
            </TouchableOpacity>

            <Text>Hello ,{user.name}</Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                // handle onPress
              }}>
              <View style={styles.action}>
                <FeatherIcon
                  color="#6a99e3"
                  name="bell"
                  size={22} />
              </View>
            </TouchableOpacity>

           
            
     
          </View>
          
          <View style={styles.search}>
            <View style={styles.searchInputWrapper}>
              <TextInput
                style={styles.searchInput}
                placeholder="Search..."
                placeholderTextColor="#6b7280"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              <TouchableOpacity
                style={styles.searchButton}
                onPress={handleSearch}>
                <FeatherIcon name="search" size={20} color="#6b7280" />
              </TouchableOpacity>
            </View>
          </View>
    {/* Lesson status buttons */}
    <View style={styles.buttonContainer}>
        {buttons.map(({ text, icon ,redirect}, index) => (
          <TouchableOpacity key={index} style={styles.button}onPress={() => {  navigation.navigate(redirect)}}>
            {icon}
            <Text style={styles.buttonText}>{text}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.subtitle}>Location of the School</Text>
      {/* Map */}
      <SchoolMap />
          
      
        </View>
  
       
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  title: {
    fontSize: 27,
    fontWeight: '700',
    color: '#222',
    marginTop: 24,
    marginBottom: 16,
  },
  /** Action */
  action: {
    width: 48,
    height: 48,
    borderRadius: 12,
    marginHorizontal: 8,
    backgroundColor: '#e8f0f9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginHorizontal: -8,
  },
  actionWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: -8,
  },
  /** Search */
  search: {
    marginTop:16,
    marginRight: 0,
  },
  searchInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f6fb',
    borderRadius: 12,
    paddingHorizontal: 0,
  },
  searchInput: {
    height: 44,
    flex: 1,
    backgroundColor: '#f0f6fb',
    paddingLeft: 44,
    paddingRight: 20,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
  },
  searchInputIcon: {
    position: 'absolute',
    left: 12,
    top: 12,
  },
  /** Input */
  input: {
    height: 44,
    backgroundColor: '#f0f6fb',
    paddingLeft: 44,
    paddingRight: 24,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
  },
  inputWrapper: {
    position: 'relative',
    width: '100%',
  },
  inputIcon: {
    position: 'absolute',
    width: 44,
    height: 44,
    top: 0,
    left: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  /** Button */
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    backgroundColor: '#222',
    borderColor: '#222',
  },
  btnText: {
    fontSize: 17,
    lineHeight: 24,
    fontWeight: '600',
    color: '#fff',
  },
  /** Placeholder */
  placeholder: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    height: 400,
    marginTop: 24,
    padding: 0,
    backgroundColor: 'transparent',
  },
  placeholderInset: {
    borderWidth: 4,
    borderColor: '#e5e7eb',
    borderStyle: 'dashed',
    borderRadius: 9,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 9999,
  },
  searchButton: {
    padding: 10,
  },
  mapContainer: {
    flex: 1,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapText: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonFrame: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop:16,
    justifyContent: 'space-between',
  },
  button: {
    width: '48%',
    backgroundColor: '#007aff',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    marginTop: 8,
    textAlign: 'center',
  },
 
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
    marginTop: 16,
    marginLeft: 16,
  },
 
});








