import React, { useState, useEffect } from 'react';
import { 
  SafeAreaView, 
  StatusBar, 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ScrollView,
  StyleSheet ,Alert,
  ActivityIndicator 
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import { useSelector } from 'react-redux'; // If you're using Redux for user state

const SearchResults = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const user = useSelector(state => state.user.currentUser); // Get current user
  
  const initialQuery = route.params?.searchQuery || '';
  
  const [showReservationModal, setShowReservationModal] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reserving, setReserving] = useState(false);

  // Fetch lessons
  useEffect(() => {
    fetchLessons();
  }, [searchQuery]);

  const fetchLessons = async () => {
    try {
      setLoading(true);
      setError(null);
      
      let url = 'http://localhost:8500/api/lesson/get';
     
      
      const response = await axios.get(url);
      const filtredlesson = response.data.filter(lesson => lesson.matiere.toLowerCase().includes(searchQuery.toLowerCase()))
      setLessons(filtredlesson);
    } catch (err) {
      console.error('Error fetching lessons:', err);
      setError('Failed to load lessons. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle reservation confirmation
  const handleReservation = async () => {
    if (!selectedLesson || !user) return;

    try {
      setReserving(true);
      
      const reservationData = {
        lessonId: selectedLesson._id,
        userId: user._id,
        date: selectedLesson.date,
        status: 'pending'
      };

      const response = await axios.post(
        'http://localhost:8500/api/reservation/create',
        reservationData
      );

      if (response.data) {
        Alert.alert(
          'Success',
          'Lesson reserved successfully!',
          [
            {
              text: 'OK',
              onPress: () => {
                setShowReservationModal(false);
                navigation.goBack();
              }
            }
          ]
        );
      }
    } catch (err) {
      console.error('Reservation error:', err);
      Alert.alert(
        'Error',
        'Failed to reserve lesson. Please try again.',
        [{ text: 'OK' }]
      );
    } finally {
      setReserving(false);
    }
  };

  // Update the return JSX to handle loading and error states
  if (loading && !lessons.length) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      </SafeAreaView>
    );
  }

  const handleLessonPress = (lesson) => {
    if (lesson.available) {
      setSelectedLesson(lesson);
      setShowReservationModal(true);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Icon name="arrow-left" size={24} color="#007aff" />
        </TouchableOpacity>
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          autoFocus
        />
      </View>

      {error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity 
            style={styles.retryButton}
            onPress={fetchLessons}
          >
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView style={styles.searchResults}>
          {lessons.length > 0 ? (
            lessons.map((lesson) => (
              <TouchableOpacity
                key={lesson.id}
                style={[
                  styles.lessonCard,
                  !lesson.available && styles.lessonCardUnavailable
                ]}
                onPress={() => handleLessonPress(lesson)}
                disabled={!lesson.available}
              >
                <View style={styles.lessonHeader}>
                  <View style={styles.subjectContainer}>
                    <MaterialIcon name="school" size={24} color="#007AFF" />
                    <Text style={styles.subjectText}>{lesson.matiere}</Text>
                  </View>
                  <View style={[
                    styles.statusBadge,
                    lesson.available ? styles.availableBadge : styles.unavailableBadge
                  ]}>
                    <Text style={[
                      styles.statusText,
                      lesson.available ? styles.availableText : styles.unavailableText
                    ]}>
                      {lesson.available ? 'Available' : 'Unavailable'}
                    </Text>
                  </View>
                </View>

                <View style={styles.lessonDetails}>
                  <View style={styles.detailItem}>
                    <MaterialIcon name="person" size={20} color="#666" />
                    <Text style={styles.detailText}>{lesson.teacher.name}</Text>
                  </View>
                  <View style={styles.detailItem}>
                    <MaterialIcon name="access-time" size={20} color="#666" />
                    <Text style={styles.detailText}>{lesson.Heure}</Text>
                  </View>
                  <View style={styles.detailItem}>
                    <MaterialIcon name="event" size={20} color="#666" />
                    <Text style={styles.detailText}>{lesson.date}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <View style={styles.emptyState}>
              <MaterialIcon name="search-off" size={48} color="#666" />
              <Text style={styles.emptyStateText}>
                No lessons found
              </Text>
            </View>
          )}
        </ScrollView>
      )}

      {showReservationModal && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.confirmationHeader}>
              <MaterialIcon name="event-available" size={40} color="#007AFF" />
              <Text style={styles.modalTitle}>Confirm Reservation</Text>
            </View>

            {selectedLesson && (
              <View style={styles.modalDetails}>
                <Text style={styles.modalSubject}>{selectedLesson.subject}</Text>
                <Text style={styles.modalProfessor}>with {selectedLesson.professor}</Text>
                <View style={styles.modalTimeContainer}>
                  <MaterialIcon name="access-time" size={20} color="#666" />
                  <Text style={styles.modalTime}>{selectedLesson.time}</Text>
                </View>
                <View style={styles.modalDateContainer}>
                  <MaterialIcon name="event" size={20} color="#666" />
                  <Text style={styles.modalDate}>{selectedLesson.date}</Text>
                </View>
              </View>
            )}

            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setShowReservationModal(false)}
                disabled={reserving}
              >
                <MaterialIcon name="close" size={20} color="#FF3B30" />
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[
                  styles.modalButton, 
                  styles.confirmButton,
                  reserving && styles.disabledButton
                ]}
                onPress={handleReservation}
                disabled={reserving}
              >
                {reserving ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <>
                    <MaterialIcon name="check" size={20} color="#fff" />
                    <Text style={styles.confirmButtonText}>Confirm</Text>
                  </>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
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
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  searchResults: {
    flex: 1,
    padding: 16,
  },
  // Loading and Error States
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  // Lesson Cards
  lessonCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  lessonCardUnavailable: {
    opacity: 0.7,
  },
  lessonHeader: {
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
  // Status Badges
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  availableBadge: {
    backgroundColor: '#E8F5E9',
  },
  unavailableBadge: {
    backgroundColor: '#FFEBEE',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  availableText: {
    color: '#4CAF50',
  },
  unavailableText: {
    color: '#FF3B30',
  },
  // Lesson Details
  lessonDetails: {
    marginTop: 8,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#666',
  },
  // Modal Styles
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    width: '85%',
    alignItems: 'center',
  },
  confirmationHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 12,
  },
  modalDetails: {
    alignItems: 'center',
    marginBottom: 24,
  },
  modalSubject: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  modalProfessor: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  modalTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  modalDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalTime: {
    marginLeft: 8,
    fontSize: 16,
    color: '#666',
  },
  modalDate: {
    marginLeft: 8,
    fontSize: 16,
    color: '#666',
  },
  // Modal Buttons
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 24,
  },
  modalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    width: '45%',
  },
  cancelButton: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#FF3B30',
  },
  confirmButton: {
    backgroundColor: '#007AFF',
  },
  disabledButton: {
    opacity: 0.7,
  },
  cancelButtonText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#FF3B30',
    fontWeight: '600',
  },
  confirmButtonText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#FFF',
    fontWeight: '600',
  },
  // Empty State
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyStateText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export default SearchResults;
