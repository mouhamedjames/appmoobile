import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const AcceptedLessons= () => {
  const navigation = useNavigation();
  
  // Example data - replace with your API data
  const acceptedLessons= [
    {
        id: 1,
        subject: 'Physics',
        professor: 'Dr. Johnson',
        date: '21 Mar 2024',
        time: '2:00 PM',
        status: 'Accepted',
        location: 'Room 203',
        duration: '2h'
      },
  ];
  const handleCancelRequest = (lessonId) => {
    // Implement cancel logic
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return '#4CAF50';
      case 'Cancelled':
        return '#FF3B30';
      default:
        return '#666';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <MaterialIcon name="arrow-back" size={24} color="#007AFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Lesson History</Text>
      </View>

      <ScrollView style={styles.content}>
        {acceptedLessons.map((lesson) => (
          <View key={lesson.id} style={styles.lessonCard}>
            <View style={styles.cardHeader}>
              <View style={styles.subjectContainer}>
                <MaterialIcon name="school" size={24} color="#007AFF" />
                <Text style={styles.subjectText}>{lesson.subject}</Text>
              </View>
              <View style={[
                styles.statusBadge,
                { backgroundColor: `${getStatusColor(lesson.status)}20` }
              ]}>
                <Text style={[
                  styles.statusText,
                  { color: getStatusColor(lesson.status) }
                ]}>
                  {lesson.status}
                </Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.detailsContainer}>
              <View style={styles.detailRow}>
                <View style={styles.detailItem}>
                  <MaterialIcon name="person" size={20} color="#666" />
                  <Text style={styles.detailText}>{lesson.professor}</Text>
                </View>
                <View style={styles.detailItem}>
                  <MaterialIcon name="access-time" size={20} color="#666" />
                  <Text style={styles.detailText}>{lesson.duration}</Text>
                </View>
              </View>

              <View style={styles.detailRow}>
                <View style={styles.detailItem}>
                  <MaterialIcon name="event" size={20} color="#666" />
                  <Text style={styles.detailText}>{lesson.date}</Text>
                </View>
                <View style={styles.detailItem}>
                  <MaterialIcon name="schedule" size={20} color="#666" />
                  <Text style={styles.detailText}>{lesson.time}</Text>
                </View>
              </View>

              <View style={styles.detailItem}>
                <MaterialIcon name="room" size={20} color="#666" />
                <Text style={styles.detailText}>{lesson.location}</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
    color: '#333',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  lessonCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  subjectContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subjectText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
    color: '#333',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 12,
  },
  detailsContainer: {
    gap: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#666',
  },
});

export default AcceptedLessons ;