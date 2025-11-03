import Geolocation from '@react-native-community/geolocation';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import MapView, {
  Marker,
  PROVIDER_DEFAULT,
  PROVIDER_GOOGLE,
  Region,
} from 'react-native-maps';
import { moderateScale } from 'react-native-size-matters';
import Header from '../../components/Header';
import colors from '../../constants/colors';
import { textScale } from '../../styles/responsiveSize';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface LocationData {
  latitude: number;
  longitude: number;
  address?: string;
}

interface RouteParams {
  onLocationSelected?: (location: LocationData) => void;
}

const CurrentLocation = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const params = route.params as RouteParams;
  const insets = useSafeAreaInsets();

  const [location, setLocation] = useState<LocationData | null>(null);
  const [loading, setLoading] = useState(false);
  const [region, setRegion] = useState<Region>({
    latitude: 19.076,
    longitude: 72.8777,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message:
              'This app needs access to your location to fetch your current location.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getCurrentLocation();
        } else {
          Alert.alert(
            'Permission Denied',
            'Location permission is required to fetch your location.',
          );
        }
      } catch (err) {
        console.warn(err);
      }
    } else {
      getCurrentLocation();
    }
  };

  const getCurrentLocation = useCallback(() => {
    setLoading(true);
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        const newLocation: LocationData = {
          latitude,
          longitude,
        };
        setLocation(newLocation);
        setRegion({
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
        setLoading(false);
      },
      error => {
        console.error('Error getting location:', error);
        Alert.alert(
          'Location Error',
          'Unable to fetch your location. Please check your GPS settings.',
          [{ text: 'OK' }],
        );
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      },
    );
  }, []);

  const handleSaveLocation = useCallback(() => {
    if (!location) {
      Alert.alert('No Location', 'Please wait for location to be fetched.');
      return;
    }

    if (params?.onLocationSelected) {
      params.onLocationSelected(location);
    }
    navigation.goBack();
  }, [location, params, navigation]);

  const handleMapPress = useCallback((event: any) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    const newLocation: LocationData = {
      latitude,
      longitude,
    };
    setLocation(newLocation);
    setRegion(prev => ({
      ...prev,
      latitude,
      longitude,
    }));
  }, []);

  console.log('location in current location', location, region);

  return (
    <View style={styles.container}>
      <View
        style={{
          ...styles.headerContainer,
          paddingTop: moderateScale(insets.top),
        }}
      >
        <Header headerStyle={{ marginBottom: moderateScale(16) }} />
      </View>
      <View style={styles.mapContainer}>
        {loading && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={styles.loadingText}>Fetching location...</Text>
          </View>
        )}
        <MapView
          provider={
            Platform.OS === 'android' ? PROVIDER_GOOGLE : PROVIDER_DEFAULT
          }
          style={styles.map}
          region={region}
          onRegionChangeComplete={setRegion}
          onPress={handleMapPress}
          showsUserLocation={true}
          showsMyLocationButton={true}
          zoomEnabled={true}
          scrollEnabled={true}
        >
          {location && (
            <Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              title="Selected Location"
              draggable
              onDragEnd={event => {
                const { latitude, longitude } = event.nativeEvent.coordinate;
                setLocation({
                  latitude,
                  longitude,
                });
              }}
            />
          )}
        </MapView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  headerContainer: {
    paddingHorizontal: moderateScale(24),
  },
  mapContainer: {
    borderRadius: moderateScale(8),
    overflow: 'hidden',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  loadingText: {
    marginTop: moderateScale(12),
    fontSize: textScale(16),
    color: colors.black,
  },
  locationInfo: {
    paddingHorizontal: moderateScale(24),
    paddingVertical: moderateScale(16),
    backgroundColor: colors.white,
  },
  locationText: {
    fontSize: textScale(14),
    color: colors.black,
    marginBottom: moderateScale(4),
  },
  buttonContainer: {
    paddingHorizontal: moderateScale(24),
    paddingBottom: moderateScale(24),
    gap: moderateScale(12),
  },
  refreshButton: {
    marginBottom: 0,
  },
  saveButton: {
    marginBottom: 0,
  },
});

export default CurrentLocation;
