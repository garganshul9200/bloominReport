import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { moderateScale } from 'react-native-size-matters';
import colors from '../constants/colors';
import { textScale } from '../styles/responsiveSize';
import CustomInput from './CustomInput';
import CustomDropdown from './CustomDropdown';
import CustomPickerModal from './CustomPickerModal';
import NetInfo from '@react-native-community/netinfo';

// Sample data
const STATES = ['Maharashtra', 'Karnataka', 'Punjab'];
const VILLAGES = {
  Maharashtra: ['Mumbai', 'Pune', 'Nagpur'],
  Karnataka: ['Bangalore', 'Mysore', 'Hubli'],
  Punjab: ['Amritsar', 'Ludhiana', 'Chandigarh'],
};

interface ManualLocationEntryProps {
  number?: number;
  required?: boolean;
  onStateSelect?: () => void;
  onVillageSelect?: () => void;
  state: string;
  village: string;
  blockName: string;
  streetName: string;
  plotNumber: string;
  onStateChange: (value: string) => void;
  onVillageChange: (value: string) => void;
  onBlockNameChange: (text: string) => void;
  onStreetNameChange: (text: string) => void;
  onPlotNumberChange: (text: string) => void;
}

const ManualLocationEntry: React.FC<ManualLocationEntryProps> = ({
  number = 4,
  required = false,
  onStateSelect,
  onVillageSelect,
  state,
  village,
  blockName,
  streetName,
  plotNumber,
  onStateChange,
  onVillageChange,
  onBlockNameChange,
  onStreetNameChange,
  onPlotNumberChange,
}) => {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [showPickerModal, setShowPickerModal] = useState(false);
  const [pickerType, setPickerType] = useState<'state' | 'village'>('state');
  const [tempSelectedValue, setTempSelectedValue] = useState<string>('');

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    // Check initial connection state
    NetInfo.fetch().then(state => {
      setIsConnected(state.isConnected);
    });

    return () => unsubscribe();
  }, []);

  const handleStateSelect = () => {
    setPickerType('state');
    setTempSelectedValue(state);
    setShowPickerModal(true);
  };

  const handleVillageSelect = () => {
    if (!state) {
      // Can show an alert here: "Please select state first"
      return;
    }
    setPickerType('village');
    setTempSelectedValue(village);
    setShowPickerModal(true);
  };

  const handlePickerSelect = (value: string) => {
    if (pickerType === 'state') {
      onStateChange(value);
      // Reset village when state changes
      onVillageChange('');
    } else {
      onVillageChange(value);
    }
    setShowPickerModal(false);
    setTempSelectedValue('');
  };

  const handlePickerClose = () => {
    setShowPickerModal(false);
    setTempSelectedValue('');
  };

  const getPickerOptions = () => {
    if (pickerType === 'state') {
      return STATES;
    }
    return VILLAGES[state as keyof typeof VILLAGES] || [];
  };

  const getPickerTitle = () => {
    return pickerType === 'state' ? 'Select State' : 'Select Village';
  };

  const getSelectedValue = () => {
    if (pickerType === 'state') {
      return tempSelectedValue || state;
    }
    return tempSelectedValue || village;
  };

  const displayLabel = `${number}. Location${required ? '*' : ''}`;

  return (
    <View>
      {/* Offline Message */}
      {isConnected === false && (
        <View style={styles.offlineContainer}>
          <Text style={styles.offlineText}>
            You are offline right now, please connect to the internet to use map features.
          </Text>
          <Text style={styles.offlineText}>Or</Text>
          <Text style={styles.offlineText}>Fill details manually</Text>
        </View>
      )}

      {/* Section Title */}
      <View style={styles.container}>
        <Text style={styles.sectionLabel}>{displayLabel}</Text>
      </View>

      {/* Form Fields */}
      <CustomDropdown
        label="Select State"
        placeholder="Select from list"
        value={state}
        onPress={handleStateSelect}
        required
      />
      <CustomDropdown
        label="Select Village"
        placeholder="Select from list"
        value={village}
        onPress={handleVillageSelect}
        required
      />

      {/* Single Picker Modal */}
      <CustomPickerModal
        visible={showPickerModal}
        title={getPickerTitle()}
        options={getPickerOptions()}
        selectedValue={getSelectedValue()}
        onSelect={handlePickerSelect}
        onClose={handlePickerClose}
      />
      <CustomInput
        label="Enter Block name"
        placeholder="Enter block name"
        value={blockName}
        onChangeText={onBlockNameChange}
        required
        style={{ marginTop: moderateScale(0) }}
      />
      <CustomInput
        label="Enter Street name/number"
        placeholder="Enter block name/number"
        value={streetName}
        onChangeText={onStreetNameChange}
        required
        style={{ marginTop: moderateScale(0) }}
      />
      <CustomInput
        label="Enter Plot number"
        placeholder="Enter plot number"
        value={plotNumber}
        onChangeText={onPlotNumberChange}
        required
        keyboardType="numeric"
        style={{ marginTop: moderateScale(0) }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    paddingTop: moderateScale(16),
    marginTop: moderateScale(8),
    paddingHorizontal: moderateScale(24),
  },
  offlineContainer: {
    // backgroundColor: colors.white,
    paddingTop: moderateScale(16),
    // marginTop: moderateScale(16),
    paddingHorizontal: moderateScale(24),
  },
  offlineText: {
    flex: 1,
    color: colors.black,
    textAlign: 'center',
    marginBottom: moderateScale(12),
    fontSize: textScale(14),
    lineHeight: moderateScale(22),
  },
  separatorContainer: {
    alignItems: 'center',
    marginVertical: moderateScale(12),
  },
  separatorText: {
    fontSize: textScale(14),
    color: colors.black,
    fontWeight: '400',
  },
  fillManuallyText: {
    fontSize: textScale(14),
    color: colors.black,
    textAlign: 'center',
    fontWeight: '500',
  },
  sectionLabel: {
    fontSize: textScale(16),
    color: colors.black,
    fontWeight: '400',
  },
});

export default ManualLocationEntry;

