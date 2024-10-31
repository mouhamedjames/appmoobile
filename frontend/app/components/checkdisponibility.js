import { View, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native'
import { useState, useEffect } from "react";
import { Calendar } from 'react-native-calendars';
import Dialog from 'react-native-dialog';
import axios from 'axios';
import { ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux'; // Import if you're using Redux for user state

const CheckDisponibility = () => {
    const [visible, setVisible] = useState(false);
    const [lessons, setLessons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedDayLessons, setSelectedDayLessons] = useState([]);
    const [markedDates, setMarkedDates] = useState({});
    const [reservingLesson, setReservingLesson] = useState(false);

    // Get current user from Redux store
    const user = useSelector((state) => state.user.currentUser);

    useEffect(() => {
        fetchLessons();
    }, []);

    const fetchLessons = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.get('http://localhost:8500/api/lesson/get');
            setLessons(response.data);
            
            // Create marked dates object for calendar
            const marked = {};
            response.data.forEach(lesson => {
                marked[lesson.date] = {
                    marked: true,
                    selectedColor: 'blue',
                    // You can add different colors based on lesson status
                    // dotColor: lesson.status === 'available' ? 'green' : 'red'
                };
            });
            setMarkedDates(marked);
        } catch (err) {
            console.error('Error fetching lessons:', err);
            setError('Failed to load lessons. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const onDayPress = (day) => {
        const selectedDay = day.dateString;
        console.log('selected day', selectedDay);
        
        // Filter lessons for selected day
        const lessonsForDay = lessons.filter(lesson => lesson.date === selectedDay);
        setSelectedDayLessons(lessonsForDay);
        setVisible(true);
    };

    const handleReservation = async (lesson) => {
        try {
            setReservingLesson(true);
            
            const reservationData = {
                lesson: lesson, // Assuming lesson has _id
                Studentsid: user,     // Current user's ID
                date: lesson.date,
                status: 'pending',
                idstudent:user._id,
                lessonid:lesson._id
                // Add any other required fields
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
                                setVisible(false);
                                // Optionally refresh the lessons
                                fetchLessons();
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
            setReservingLesson(false);
        }
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#2F6AAC" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
                <TouchableOpacity 
                    style={styles.retryButton} 
                    onPress={fetchLessons}
                >
                    <Text style={styles.retryButtonText}>Retry</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.calendar}>
                <Calendar
                    onDayPress={onDayPress}
                    markedDates={markedDates}
                    theme={{
                        selectedDayBackgroundColor: '#2F6AAC',
                        selectedDayTextColor: '#ffffff',
                        todayTextColor: '#2F6AAC',
                        arrowColor: '#2F6AAC',
                    }}
                />
            </View>
            
            <Dialog.Container visible={visible} contentStyle={styles.dialogContainer}>
                <Dialog.Title>Available Lessons</Dialog.Title>
                
                {selectedDayLessons.length > 0 ? (
                    selectedDayLessons.map((lesson, index) => (
                        
                        <View key={index} style={styles.lessonContainer}>
                            <Text style={styles.lessonDescription}>
                                Subject: {lesson.matiere}
                                {'\n'}Professor: {lesson.teacher.name}
                                {'\n'}date: {lesson.date}
                                {'\n'}Hours: {lesson.Heure}
                            </Text>
                            <TouchableOpacity
                                onPress={() => handleReservation(lesson)}
                                style={[
                                    styles.dialogButton,
                                    reservingLesson && styles.dialogButtonDisabled
                                ]}
                                disabled={reservingLesson}
                            >
                                {reservingLesson ? (
                                    <ActivityIndicator color="#fff" size="small" />
                                ) : (
                                    <Text style={styles.dialogButtonText}>
                                        Confirm Reservation
                                    </Text>
                                )}
                            </TouchableOpacity>
                        </View>
                    ))
                ) : (
                    <Text style={styles.noLessonsText}>
                        No lessons available for this day
                    </Text>
                )}
               
                <Dialog.Button 
                    label="Close" 
                    onPress={() => setVisible(false)}
                    style={styles.closeButton}
                />
            </Dialog.Container>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginTop: 20,
        padding: 20,
        flex: 1,
    },
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
        backgroundColor: '#2F6AAC',
        padding: 12,
        borderRadius: 8,
    },
    retryButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    calendar: {
        marginTop: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderWidth: 2,
        borderRadius: 10,
        borderColor: '#2F6AAC',
    },
    dialogContainer: {
        width: '90%',
        padding: 20,
        borderRadius: 12,
    },
    lessonContainer: {
        marginVertical: 10,
        padding: 12,
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
    },
    lessonDescription: {
        marginBottom: 10,
        fontSize: 16,
        lineHeight: 24,
        color: '#333',
    },
    dialogButton: {
        padding: 12,
        backgroundColor: '#2F6AAC',
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 8,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    dialogButtonDisabled: {
        backgroundColor: '#93b8e8', // lighter blue when disabled
    },
    dialogButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
    },
    confirmationContainer: {
        alignItems: 'center',
        padding: 16,
    },
    confirmationText: {
        fontSize: 16,
        color: '#4CAF50',
        marginBottom: 8,
    },
    noLessonsText: {
        textAlign: 'center',
        color: '#666',
        fontSize: 16,
        marginVertical: 20,
    },
    closeButton: {
        color: '#2F6AAC',
    },
});

export default CheckDisponibility;