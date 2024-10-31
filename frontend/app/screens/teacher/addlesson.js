import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView,Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import { useSelector } from "react-redux";

const LessonFormScreen = () => {
  const navigation = useNavigation();
  const [matiere, setMatiere] = useState('');
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const user = useSelector((state) => state.user.currentUser);

  const lessondispo="trube"
  const handleaddlesson = async() => {

    try{
        const res = await axios.post("http://localhost:8500/api/lesson/create", {teacher:user,teacherid:user._id , matiere :matiere,date:date,Heure:time,available: lessondispo,finHeure:"22:00"})
       // sent request to get usesr login if work data=user on json
   
        navigation.navigate('teacher',{ screen: 'hometeacher' })
        console.log("itwork")
    
    }
       
        catch(error)

        { console.log(error)
            console.log(error.response.data)

            Alert.alert("addlesson problem ");
      


    }}
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Add leading zero if needed
    const day = String(date.getDate()).padStart(2, '0'); // Add leading zero if needed
    return `${year}-${month}-${day}`;
  };
  const handleConfirmDate = (date) => {
    const formattedDate = formatDate(date);
  setDate(formattedDate);
  hideDatePicker();
  };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleConfirmTime = (selectedTime) => {
    const formattedTime = `${selectedTime.getHours().toString().padStart(2, '0')}:${selectedTime.getMinutes().toString().padStart(2, '0')}`;
    setTime(formattedTime);
    hideTimePicker();
  };


  const getMinTime = () => {
    const minTime = new Date();
    minTime.setHours(8, 0, 0); // 8:00 AM
    return minTime;
  };

  const getMaxTime = () => {
    const maxTime = new Date();
    maxTime.setHours(17, 0, 0); // 5:00 PM
    return maxTime;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#007AFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add New Lesson</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Add New Lesson</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Subject</Text>
          <RNPickerSelect
            onValueChange={(value) => setMatiere(value)}
            items={[
              { label: 'Math', value: 'math' },
              { label: 'Physics', value: 'physics' },
              { label: 'Chemistry', value: 'chemistry' },
            ]}
            style={pickerSelectStyles}
            placeholder={{ label: 'Select a subject...', value: null }}
            Icon={() => <Icon name="arrow-drop-down" size={24} color="#007AFF" />}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Date</Text>
          <TouchableOpacity style={styles.dateButton} onPress={showDatePicker}>
            <Text style={styles.dateButtonText}>{date || 'Select Date'}</Text>
            <Icon name="event" size={24} color="#007AFF" />
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirmDate}
            onCancel={hideDatePicker}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Time</Text>
          <TouchableOpacity style={styles.dateButton} onPress={showTimePicker}>
            <Text style={styles.dateButtonText}>{time || 'Select Time'}</Text>
            <Icon name="access-time" size={24} color="#007AFF" />
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isTimePickerVisible}
            mode="time"
            onConfirm={handleConfirmTime}
            onCancel={hideTimePicker}
            minimumDate={getMinTime()}
            maximumDate={getMaxTime()}
            is24Hour={true}
          />
        </View>

     

        

        <TouchableOpacity 
          style={styles.submitButton} 
          onPress={handleaddlesson}
        >
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    backgroundColor: '#fff',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 16,
  },
  scrollContent: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#555',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  dateButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  dateButtonText: {
    fontSize: 16,
    color: '#333',
  },
  submitButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
    backgroundColor: '#fff',
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
    backgroundColor: '#fff',
  },
});

export default LessonFormScreen;
