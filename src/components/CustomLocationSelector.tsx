import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { moderateScale } from 'react-native-size-matters';
import colors from '../constants/colors';
import { textScale } from '../styles/responsiveSize';
import FastImage from 'react-native-fast-image';
import Imagepath from '../constants/Imagepath';

interface CustomLocationSelectorProps {
  label: string;
  number?: number;
  required?: boolean;
  onFetchLocation: () => void;
  onEnterManually: () => void;
}

const CustomLocationSelector: React.FC<CustomLocationSelectorProps> = ({
  label,
  number,
  required = false,
  onFetchLocation,
  onEnterManually,
}) => {
  const displayLabel = number
    ? `${number}. ${label}${required ? '*' : ''}`
    : `${label}${required ? '*' : ''}`;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{displayLabel}</Text>
      <TouchableOpacity style={styles.fetchButton} onPress={onFetchLocation}>  
        <View style={styles.fetchButtonContent}>
          <FastImage
            source={Imagepath.location}
            resizeMode="contain"
            style={styles.locationIcon}
          />
          <View style={styles.fetchButtonTextContainer}>
            <Text style={styles.fetchButtonText}>Fetch Location</Text>
            <Text style={styles.recommendedText}>(Recommended)</Text>
          </View>
        </View>
      </TouchableOpacity>
      
      <View style={styles.separatorContainer}>
        <Text style={styles.separatorText}>OR</Text>
      </View>

      {/* Enter Manually Button */}
      <TouchableOpacity
        style={styles.manualButton}
        onPress={onEnterManually}
        activeOpacity={0.7}
      >
        <Text style={styles.manualButtonText}>Enter Manually</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    paddingVertical: moderateScale(16),
    marginTop: moderateScale(8),
    paddingHorizontal: moderateScale(24),
  },
  label: {
    fontSize: textScale(16),
    color: colors.black,
    marginBottom: moderateScale(12),
    fontWeight: '400',
  },
  fetchButton: {
    backgroundColor: colors.locationButtonBg,
    borderRadius: moderateScale(8),
    padding: moderateScale(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  fetchButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationIcon: {
    width: moderateScale(20),
    height: moderateScale(20),
    marginRight: moderateScale(12),
  },
  fetchButtonTextContainer: {
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  fetchButtonText: {
    fontSize: textScale(14),
    color: colors.primary,
    fontWeight: '500',
    marginBottom: moderateScale(4),
  },
  recommendedText: {
    fontSize: textScale(12),
    color: colors.primary,
    fontWeight: '400',
  },
  separatorContainer: {
    alignItems: 'center',
    marginVertical: moderateScale(16),
  },
  separatorText: {
    fontSize: textScale(14),
    color: colors.black,
    fontWeight: '400',
  },
  manualButton: {
    backgroundColor: colors.manualButtonBg,
    borderRadius: moderateScale(8),
    padding: moderateScale(16),
    alignItems: 'center',
  },
  manualButtonText: {
    fontSize: textScale(14),
    color: colors.black,
    fontWeight: '500',
  },
});

export default CustomLocationSelector;
