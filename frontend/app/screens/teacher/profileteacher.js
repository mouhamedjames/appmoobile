import React, { useState } from 'react';
import {
    StyleSheet,
    SafeAreaView,
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    Switch,
    Image,TextInput
  } from 'react-native';
  import { loginFailure, loginStart, loginSuccess  } from "./redux/userredux.js";
import { Ionicons } from '@expo/vector-icons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from './redux/userredux';
const ProfileSettingsScreen = () => {
  const navigation = useNavigation();
  const user = useSelector(state => state.user.currentUser);
    const [form, setForm] = useState({
        emailNotifications: true,
        pushNotifications: false,
      });
  const [interests, setInterests] = useState('Technology, Education'); // Initial interests
  const matriculNumber = '123456789'; // Replace with actual matricul number
  const avatarUri = 'https://example.com/avatar.jpg'; // Replace with actual avatar URL
  const dispatch=useDispatch()
  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
          {
              text: "Cancel",
              style: "cancel"
          },
          {
              text: "Logout",
              onPress: async () => {
                  try {
                      // Clear the Redux store
                      dispatch(logout());
                      // Navigate to login screen
                      navigation.navigate('home')
                  } catch (error) {
                      console.error('Logout error:', error);
                      Alert.alert('Error', 'Failed to logout. Please try again.');
                  }
              }
          }
      ]
  );
  };

  const handleChangePassword = () => {
    // Implement change password logic here
  };

  const handleEditEmail = () => {
    // Implement email update logic here
  };

  const handleEditInterests = () => {
    // Save or process the updated interests here
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f8f8f8' }}>
<View style={styles.header}>
        <View style={styles.headerAction}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack()
            }}>
            <FeatherIcon
              color="#000"
              name="arrow-left"
              size={24} />
          </TouchableOpacity>
        </View>
        <Text numberOfLines={1} style={styles.headerTitle}>
          Settings
        </Text>
        <View style={[styles.headerAction, { alignItems: 'flex-end' }]}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack()
            }}>
            <FeatherIcon
              color="#000"
              name="more-vertical"
              size={24} />
          </TouchableOpacity>
        </View>
      </View>


      <ScrollView contentContainerStyle={styles.content}>


      {/* Avatar and Name */}
      <View style={[styles.section, { paddingTop: 4 }]}>
          <Text style={styles.sectionTitle}>Account</Text>
          <View style={styles.sectionBody}>
            <TouchableOpacity
              onPress={() => {
                // handle onPress
              }}
              style={styles.profile}>
              <Image
                alt=""
                source={{
                  uri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80',
                }}
                style={styles.profileAvatar} />
              <View style={styles.profileBody}>
                <Text style={styles.profileName}>{user.name}</Text>
                <Text style={styles.profileHandle}>{user.email}</Text>
              </View>
              <FeatherIcon
                color="#bcbcbc"
                name="chevron-right"
                size={22} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <View style={styles.sectionBody}>
            <View style={[styles.rowWrapper, styles.rowFirst]}>
              <View
                style={styles.row}>
                    <Ionicons name="school" size={24} color="black" />
               
        
                <Text style={styles.label}>Matricul Number</Text>
                <View style={styles.rowSpacer} />
                <Text style={styles.rowValue}>{matriculNumber}</Text>
                
              </View>
            </View>
            <View style={styles.rowWrapper}>
              <TouchableOpacity
                onPress={() => {
                  // handle onPress
                }}
                style={styles.row}>
                     <Ionicons name="list" size={24} color="black" />
        <Text style={styles.label}>Interests</Text>
            
                <View style={styles.rowSpacer} />
                <Text style={styles.rowValue}>math,chimie ...</Text>
                <FeatherIcon
                  color="#bcbcbc"
                  name="chevron-right"
                  size={19} />
              </TouchableOpacity>
            </View>
            <View style={styles.rowWrapper}>
              <View style={styles.row}>
                <Text style={styles.rowLabel}>Email Notifications</Text>
                <View style={styles.rowSpacer} />
                <Switch
                  onValueChange={emailNotifications =>
                    setForm({ ...form, emailNotifications })
                  }
                  style={{ transform: [{ scaleX: 0.95 }, { scaleY: 0.95 }] }}
                  value={form.emailNotifications} />
              </View>
            </View>
            <View style={[styles.rowWrapper, styles.rowLast]}>
              <View style={styles.row}>
                <Text style={styles.rowLabel}>Push Notifications</Text>
                <View style={styles.rowSpacer} />
                <Switch
                  onValueChange={pushNotifications =>
                    setForm({ ...form, pushNotifications })
                  }
                  style={{ transform: [{ scaleX: 0.95 }, { scaleY: 0.95 }] }}
                  value={form.pushNotifications} />
              </View>
            </View>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Security</Text>
          <View style={styles.sectionBody}>
            <View style={[styles.rowWrapper, styles.rowFirst]}>
              <TouchableOpacity
                onPress={() => {
                  // handle onPress
                }}
                style={styles.row}>
           <Ionicons name="call-outline" size={24} color="black" />
           <Text style={styles.label}>Contact us</Text>
                <View style={styles.rowSpacer} />
                <FeatherIcon
                  color="#bcbcbc"
                  name="chevron-right"
                  size={19} />
              </TouchableOpacity>
            </View>
            <View style={styles.rowWrapper}>
              <TouchableOpacity
                onPress={() => {
                  // handle onPress
                }}
                style={styles.row}>
                         <Ionicons name="lock-closed" size={24} color="black" />
                
                         <Text style={styles.label}>Change Password</Text>
                <View style={styles.rowSpacer} />
                <FeatherIcon
                  color="#bcbcbc"
                  name="chevron-right"
                  size={19} />
              </TouchableOpacity>
            </View>
            
            <View style={[styles.rowWrapper, styles.rowLast]}>
              <TouchableOpacity
                onPress={() => {
                  // handle onPress
                }}
                style={styles.row}>
                     <Ionicons name="document-text-outline" size={24} color="black" />
                     <Text style={styles.label}>Terms and Privacy</Text>
                <View style={styles.rowSpacer} />
                <FeatherIcon
                  color="#bcbcbc"
                  name="chevron-right"
                  size={19} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionBody}>
            <View
              style={[
                styles.rowWrapper,
                styles.rowFirst,
                styles.rowLast,
                { alignItems: 'center' },
              ]}>
              <TouchableOpacity
                onPress={handleLogout}
                style={styles.row}>
                   
                <Text style={[styles.label, styles.rowLabelLogout]}>
                  Log Out
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

      {/* Interests */}
      
      

      {/* Change Password */}
     
      {/* Logout */}
      
      </ScrollView>
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({


    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 16,
      },
      headerAction: {
        width: 40,
        height: 40,
        alignItems: 'flex-start',
        justifyContent: 'center',
      },
      headerTitle: {
        fontSize: 19,
        fontWeight: '600',
        color: '#000',
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
        textAlign: 'center',
      },
      content: {
        paddingHorizontal: 16,
      },
      contentFooter: {
        marginTop: 24,
        fontSize: 13,
        fontWeight: '500',
        textAlign: 'center',
        color: '#a69f9f',
      },
      section: {
        paddingVertical: 12,
      },
      sectionTitle: {
        margin: 8,
        marginLeft: 12,
        fontSize: 13,
        letterSpacing: 0.33,
        fontWeight: '500',
        color: '#a69f9f',
        textTransform: 'uppercase',
      },
      sectionBody: {
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
      },
      /** Profile */
      profile: {
        padding: 12,
        backgroundColor: '#fff',
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
      },
      profileAvatar: {
        width: 60,
        height: 60,
        borderRadius: 9999,
        marginRight: 12,
      },
      profileBody: {
        marginRight: 'auto',
      },
      profileName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#292929',
      },
      profileHandle: {
        marginTop: 2,
        fontSize: 16,
        fontWeight: '400',
        color: '#858585',
      },
      /** Row */
      row: {
        height: 44,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingRight: 12,
      },
      rowWrapper: {
        paddingLeft: 16,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderColor: '#f0f0f0',
      },
      rowFirst: {
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
      },
      rowLabel: {
        fontSize: 16,
        letterSpacing: 0.24,
        color: '#000',
      },
      rowSpacer: {
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
      },
      rowValue: {
        fontSize: 16,
        fontWeight: '500',
        color: '#ababab',
        marginRight: 4,
      },
      rowLast: {
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
      },
      rowLabelLogout: {
        width: '100%',
        textAlign: 'center',
        fontWeight: '600',
        color: '#dc2626',
      },
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  label: {
    fontSize: 18,
    marginLeft: 10,
  },
  value: {
    fontSize: 18,
    marginLeft: 'auto',
  },
  input: {
    borderWidth: 1,
    borderColor: 'blue',
    borderRadius: 5,
    padding: 10,
    flex: 1,
    marginLeft: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    marginLeft: 10,
  },
});

export default ProfileSettingsScreen;
