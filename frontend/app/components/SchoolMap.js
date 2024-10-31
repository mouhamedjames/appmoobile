import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Text, Alert, Platform } from 'react-native';
import MapView, { Marker, Circle } from 'react-native-maps';
import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';
import { useSelector } from 'react-redux';

// Set up notifications
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const SchoolMap = () => {
  const user = useSelector(state => state.user.currentUser);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [hasNotified, setHasNotified] = useState(false);

  // School location (replace with your school's coordinates)
  const schoolLocation = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  // Request permissions and set up location tracking
  useEffect(() => {
    (async () => {
      try {
        // Request notifications permission
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        if (finalStatus !== 'granted') {
          Alert.alert('Warning', 'Failed to get push token for push notification!');
          return;
        }

        // Request location permission
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }

        // Start location tracking
        const locationSubscription = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.High,
            distanceInterval: 10, // Update every 10 meters
          },
          (newLocation) => {
            setLocation(newLocation.coords);
            checkProximity(newLocation.coords);
          }
        );

        // Cleanup subscription
        return () => {
          if (locationSubscription) {
            locationSubscription.remove();
          }
        };
      } catch (err) {
        console.error('Error setting up location tracking:', err);
        setErrorMsg('Error setting up location tracking');
      }
    })();
  }, []);

  // Check distance to school and send notification if within 100m
  const checkProximity = async (userLocation) => {
    if (!hasNotified) {
      const distance = calculateDistance(
        userLocation.latitude,
        userLocation.longitude,
        schoolLocation.latitude,
        schoolLocation.longitude
      );

      if (distance <= 0.1) { // 0.1 km = 100 meters
        await sendProximityNotification();
        setHasNotified(true);
      }
    }
  };

  // Calculate distance between two points using Haversine formula
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c; // Distance in km
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI/180);
  };

  // Send notification when near school
  const sendProximityNotification = async () => {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "You're near the school!",
          body: `Welcome ${user.name}! You are within 100 meters of the school.`,
          data: { type: 'proximity_alert' },
        },
        trigger: null, // Send immediately
      });
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Location of the School</Text>
      {errorMsg ? (
        <Text style={styles.errorText}>{errorMsg}</Text>
      ) : (
        <MapView
          style={styles.map}
          initialRegion={schoolLocation}
          showsUserLocation={true}
          showsMyLocationButton={true}
        >
          {/* School Marker */}
          <Marker
            coordinate={{
              latitude: schoolLocation.latitude,
              longitude: schoolLocation.longitude,
            }}
            title="School Location"
            description="Your school name here"
          />

          {/* 100m Radius Circle */}
          <Circle
            center={{
              latitude: schoolLocation.latitude,
              longitude: schoolLocation.longitude,
            }}
            radius={100} // 100 meters
            fillColor="rgba(0, 122, 255, 0.1)"
            strokeColor="rgba(0, 122, 255, 0.3)"
            strokeWidth={1}
          />
        </MapView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height * 0.4,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default SchoolMap;
