import { View, Text, StyleSheet, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import React from 'react';
import { moderateScale } from 'react-native-size-matters';
import colors from '../constants/colors';
import { textScale } from '../styles/responsiveSize';
import Imagepath from '../constants/Imagepath';
import FastImage from 'react-native-fast-image';

interface CustomDropdownProps {
  label: string;
  placeholder: string;
  value: string;
  onPress: () => void;
  required?: boolean;
  mainStyles?: StyleProp<ViewStyle>;
  number?: number;
  showAddButton?: boolean;
  onAddPress?: () => void;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  label,
  placeholder,
  value,
  onPress,
  required = false,
  mainStyles,
  number,
  showAddButton = false,
  onAddPress,
}) => {
  const displayLabel = number
    ? `${number}. ${label}${required ? '*' : ''}`
    : `${label}${required ? '*' : ''}`;

  return (
    <View style={[styles.container, mainStyles]}>
      <Text style={styles.label}>{displayLabel}</Text>
      <View style={styles.inputRowContainer}>
        <TouchableOpacity
          style={[styles.dropdownContainer, showAddButton && styles.dropdownWithButton]}
          onPress={onPress}
          activeOpacity={0.7}
        >
          <Text style={[styles.dropdownText, !value && styles.placeholderText]}>
            {value || placeholder}
          </Text>
          {!showAddButton && (
            <FastImage
              source={Imagepath.dropdown}
              resizeMode="contain"
              style={styles.dropdownImage}
            />
          )}
        </TouchableOpacity>
        {showAddButton && (
          <TouchableOpacity
            style={styles.addButton}
            onPress={onAddPress}
            activeOpacity={0.7}
          >
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    paddingVertical: moderateScale(16),
    paddingHorizontal: moderateScale(24),
  },
  label: {
    fontSize: textScale(16),
    color: colors.black,
    marginBottom: moderateScale(12),
    fontWeight: '400',
  },
  inputRowContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.secondary,
    borderRadius: moderateScale(6),
    overflow: 'hidden',
    minHeight: moderateScale(48),
  },
  dropdownContainer: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    minHeight: moderateScale(48),
    alignItems: 'center',
    paddingHorizontal: moderateScale(12),
    flex: 1,
  },
  dropdownWithButton: {
    borderRightWidth: 1,
    borderRightColor: colors.secondary,
  },
  dropdownText: {
    flex: 1,
    fontSize: moderateScale(14),
    color: colors.black,
  },
  placeholderText: {
    color: colors.placeholderColor,
  },
  dropdownImage: {
    fontSize: moderateScale(12),
    color: colors.primary,
    width: moderateScale(24),
    height: moderateScale(24),
  },
  addButton: {
    width: moderateScale(48),
    minHeight: moderateScale(48),
    backgroundColor: colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: moderateScale(24),
    color: colors.black,
    fontWeight: '300',
  },
});

export default CustomDropdown;
