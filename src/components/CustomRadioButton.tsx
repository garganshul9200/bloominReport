import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  StyleProp,
} from 'react-native';
import React from 'react';
import { moderateScale } from 'react-native-size-matters';
import colors from '../constants/colors';
import { textScale } from '../styles/responsiveSize';

interface RadioOption {
  label: string;
  value: string;
}

interface CustomRadioButtonProps {
  label: string;
  options: RadioOption[];
  selectedValue: string;
  onValueChange: (value: string) => void;
  number?: number;
  required?: boolean;
  radioMainStyles?: StyleProp<ViewStyle>;
}

const CustomRadioButton: React.FC<CustomRadioButtonProps> = ({
  label,
  options,
  selectedValue,
  onValueChange,
  number,
  required = false,
  radioMainStyles,
}) => {
  const displayLabel = number
    ? `${number}. ${label}${required ? '*' : ''}`
    : `${label}${required ? '*' : ''}`;

  return (
    <View style={[styles.container, radioMainStyles]}>
      <Text style={styles.label}>{displayLabel}</Text>
      <View style={styles.optionsContainer}>
        {options.map((option, index) => (
          <TouchableOpacity
            key={option.value}
            style={[
              styles.optionContainer,
              index !== options.length - 1 && styles.optionSpacing,
            ]}
            onPress={() => onValueChange(option.value)}
            activeOpacity={0.7}
          >
            <View
              style={[
                styles.radioButton,
                selectedValue === option.value && styles.radioButtonSelected,
              ]}
            >
              {selectedValue === option.value && (
                <View style={styles.radioButtonInner} />
              )}
            </View>
            <Text style={styles.optionLabel}>{option.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
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
  optionsContainer: {
    flexDirection: 'column',
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: moderateScale(12),
  },
  optionSpacing: {
    marginBottom: moderateScale(12),
  },
  radioButtonContainer: {
    marginRight: moderateScale(12),
  },
  radioButton: {
    width: moderateScale(20),
    height: moderateScale(20),
    marginRight: moderateScale(16),
    borderRadius: moderateScale(10),
    borderWidth: 2,
    borderColor: colors.secondary,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonSelected: {
    borderColor: colors.primary,
  },
  radioButtonInner: {
    width: moderateScale(10),
    height: moderateScale(10),
    borderRadius: moderateScale(5),
    backgroundColor: colors.primary,
  },
  optionLabel: {
    fontSize: textScale(14),
    color: colors.black,
    fontWeight: '400',
  },
});

export default CustomRadioButton;
