import { ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import NetInfo from '@react-native-community/netinfo';
import colors from '../../constants/colors';
import CustomInput from '../../components/CustomInput';
import CustomLocationSelector from '../../components/CustomLocationSelector';
import CustomRadioButton from '../../components/CustomRadioButton';
import CustomButton from '../../components/CustomButton';
import ManualLocationEntry from '../../components/ManualLocationEntry';
import ScreenHeaderSection from '../../components/ScreenHeaderSection';
import navigationStrings from '../../constants/navigationStrings';
import { styles } from './Styles';
import {
  ShowError,
  validateFields,
  validateLocationData,
  showSuccess,
} from '../../utils/helperFunctions';
import { getFarmerDataService } from '../../utils/realmService';

const FarmerHome = () => {
  const navigation = useNavigation();

  // Form state management
  const [fullName, setFullName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [gender, setGender] = useState('');

  // Location state
  const [isOnline, setIsOnline] = useState<boolean | null>(null);
  const [showManualEntry, setShowManualEntry] = useState(false);
  const [locationData, setLocationData] = useState({
    state: '',
    village: '',
    blockName: '',
    streetName: '',
    plotNumber: '',
  });

  // Gender options - memoized to prevent recreation
  const genderOptions = useMemo(
    () => [
      { label: 'Male', value: 'male' },
      { label: 'Female', value: 'female' },
    ],
    [],
  );

  // Network connectivity check
  useEffect(() => {
    let isMounted = true;

    const checkConnection = async () => {
      try {
        const netState = await NetInfo.fetch();
        if (isMounted) {
          setIsOnline(netState.isConnected);
          if (!netState.isConnected) {
            setShowManualEntry(true);
          }
        }
      } catch (error) {
        console.error('Error checking network:', error);
      }
    };

    const unsubscribe = NetInfo.addEventListener(state => {
      if (isMounted) {
        setIsOnline(state.isConnected);
        if (!state.isConnected) {
          setShowManualEntry(true);
        }
      }
    });

    checkConnection();

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  // Handlers - memoized with useCallback
  const handleEnterManually = useCallback(() => {
    setShowManualEntry(true);
  }, []);

  const handleNavigateToLandDetails = useCallback(async () => {
    try {
      // Validate required fields
      const isValid = validateFields([
        { value: fullName, fieldName: 'full name' },
        { value: contactNumber, fieldName: 'contact number' },
        { value: gender, fieldName: 'gender' },
      ]);

      if (!isValid) {
        return;
      }

      // Validate location data
      if (!validateLocationData(locationData, ['state', 'village'])) {
        return;
      }

      // Save data to Realm
      try {
        const farmerService = await getFarmerDataService();
        await farmerService.updateFarmerData({
          fullName,
          contactNumber,
          gender,
          locationState: locationData.state,
          locationVillage: locationData.village,
          locationBlockName: locationData.blockName,
          locationStreetName: locationData.streetName,
          locationPlotNumber: locationData.plotNumber,
        });
        showSuccess('Farmer profile data saved successfully');
      } catch (realmError) {
        console.error('Error saving farmer data:', realmError);
        ShowError('Failed to save data. Please try again.');
        return;
      }

      // Navigate to next screen
      navigation.navigate(navigationStrings.LAND_DETAILS as never);
    } catch (error) {
      console.error('Error navigating to land details:', error);
      ShowError('Failed to proceed. Please try again.');
    }
  }, [navigation, fullName, contactNumber, gender, locationData]);

  const handleLocationDataChange = useCallback(
    (field: keyof typeof locationData, value: string) => {
      setLocationData(prev => ({ ...prev, [field]: value }));
    },
    [],
  );

  const shouldShowManualEntry = useMemo(
    () => showManualEntry || isOnline === false,
    [showManualEntry, isOnline],
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        style={styles.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        // contentContainerStyle={{ flexGrow: 1 }}
      >
        <ScreenHeaderSection
          currentPosition={0}
          bottomLabelText="Farmer Profile"
        />
        <CustomInput
          label="Enter full name"
          placeholder="Enter name"
          value={fullName}
          onChangeText={setFullName}
          number={1}
          required
        />
        <CustomInput
          label="Contact Number"
          placeholder="Enter contact number"
          value={contactNumber}
          onChangeText={setContactNumber}
          number={2}
          keyboardType="numeric"
          required
        />
        <CustomRadioButton
          label="Select Gender"
          options={genderOptions}
          selectedValue={gender}
          onValueChange={setGender}
          number={3}
          required
        />
        {shouldShowManualEntry ? (
          <ManualLocationEntry
            number={4}
            required
            state={locationData.state}
            village={locationData.village}
            blockName={locationData.blockName}
            streetName={locationData.streetName}
            plotNumber={locationData.plotNumber}
            onStateChange={value => handleLocationDataChange('state', value)}
            onVillageChange={value =>
              handleLocationDataChange('village', value)
            }
            onBlockNameChange={value =>
              handleLocationDataChange('blockName', value)
            }
            onStreetNameChange={value =>
              handleLocationDataChange('streetName', value)
            }
            onPlotNumberChange={value =>
              handleLocationDataChange('plotNumber', value)
            }
          />
        ) : (
          <CustomLocationSelector
            label="House location"
            number={4}
            required
            onFetchLocation={() => {
              if (Platform.OS === 'android') {
                ShowError('Google Mapkey required');
                return;
              }
              navigation.navigate(navigationStrings.CURRENT_LOCATION as never);
            }}
            onEnterManually={handleEnterManually}
          />
        )}
        <CustomButton
          title="Create Farmer Profile"
          buttonColor={colors.primary}
          onPress={handleNavigateToLandDetails}
          style={styles.createProfileButton}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default FarmerHome;
