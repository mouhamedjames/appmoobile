import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import Calender from '../components/checkdisponibility.js';

const Reserver = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>Reservation</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.calendarContainer}>
          <Calender />
        </View>
        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>Available Time Slots</Text>
          <View style={styles.timeSlot}>
            <Text style={styles.timeSlotText}>09:00 AM - 10:00 AM</Text>
          </View>
          <View style={styles.timeSlot}>
            <Text style={styles.timeSlotText}>11:00 AM - 12:00 PM</Text>
          </View>
          <View style={styles.timeSlot}>
            <Text style={styles.timeSlotText}>02:00 PM - 03:00 PM</Text>
          </View>
        </View>
        <View style={styles.notesSection}>
          <Text style={styles.notesTitle}>Reservation Notes</Text>
          <Text style={styles.notesText}>
            • Select a date from the calendar above
          </Text>
          <Text style={styles.notesText}>
            • Choose an available time slot
          </Text>
          <Text style={styles.notesText}>
            • Confirm your reservation
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Reserver;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f5',
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 16,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  calendarContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 20,
  },
  infoSection: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  timeSlot: {
    backgroundColor: '#e6f7ff',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  timeSlotText: {
    fontSize: 16,
    color: '#0066cc',
  },
  notesSection: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
  },
  notesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  notesText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
});
