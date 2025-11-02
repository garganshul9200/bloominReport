import { View, Text, StyleSheet, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import React from 'react';
import { moderateScale } from 'react-native-size-matters';
import colors from '../constants/colors';
import { textScale } from '../styles/responsiveSize';

interface CustomCheckboxProps {
  label: string;
  checked: boolean;
  onPress: () => void;
  subLabel?: string;
  style?: StyleProp<ViewStyle>;
  checkboxStyle?: StyleProp<ViewStyle>;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  label,
  checked,
  onPress,
  subLabel,
  style,
  checkboxStyle,
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.checkbox, checked && styles.checkboxSelected, checkboxStyle]}>
        {checked && <Text style={styles.checkmark}>✓</Text>}
      </View>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{label}</Text>
        {subLabel && <Text style={styles.subLabel}>{subLabel}</Text>}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: moderateScale(8),
    paddingHorizontal: moderateScale(24),
    paddingVertical: moderateScale(12),
    backgroundColor: colors.white,
  },
  checkbox: {
    width: moderateScale(20),
    height: moderateScale(20),
    borderRadius: moderateScale(4),
    borderWidth: 2,
    borderColor: colors.secondary,
    marginRight: moderateScale(16),
    marginTop: moderateScale(2),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  checkboxSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },
  checkmark: {
    color: colors.white,
    fontSize: moderateScale(12),
    fontWeight: 'bold',
  },
  labelContainer: {
    flex: 1,
  },
  label: {
    fontSize: textScale(16),
    color: colors.black,
    fontWeight: '400',
  },
  subLabel: {
    fontSize: textScale(12),
    color: colors.placeholderColor,
    fontWeight: '400',
    marginTop: moderateScale(4),
  },
});

export default CustomCheckbox;

