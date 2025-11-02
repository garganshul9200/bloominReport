import { View, Text, TextInput, StyleSheet } from 'react-native';
import React from 'react';
import { moderateScale } from 'react-native-size-matters';
import colors from '../constants/colors';
import { textScale } from '../styles/responsiveSize';

interface AreaInputWithUnitProps {
  label: string;
  placeholder: string;
  value: string;
  unit: string;
  onAreaChange: (text: string) => void;
  number?: number;
  required?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  instructionText?: string;
}

const AreaInputWithUnit: React.FC<AreaInputWithUnitProps> = ({
  label,
  placeholder,
  value,
  unit,
  onAreaChange,
  number,
  required = false,
  keyboardType = 'numeric',
  instructionText,
}) => {
  const displayLabel = number
    ? `${number}. ${label}${required ? '*' : ''}`
    : `${label}${required ? '*' : ''}`;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{displayLabel}</Text>
      {instructionText && (
        <Text style={styles.instructionText}>{instructionText}</Text>
      )}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.areaInput}
          placeholder={placeholder}
          placeholderTextColor={colors.placeholderColor}
          value={value}
          onChangeText={onAreaChange}
          keyboardType={keyboardType}
        />
        <View style={styles.unitDisplay}>
          <Text style={styles.unitText}>{unit || 'unit'}</Text>
        </View>
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
    marginBottom: moderateScale(8),
    fontWeight: '400',
  },
  instructionText: {
    fontSize: textScale(14),
    color: colors.black,
    marginBottom: moderateScale(12),
    fontWeight: '400',
  },
  inputContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.secondary,
    borderRadius: moderateScale(6),
    overflow: 'hidden',
    minHeight: moderateScale(48),
  },
  areaInput: {
    flex: 1,
    borderRightWidth: 1,
    borderRightColor: colors.secondary,
    paddingHorizontal: moderateScale(12),
    paddingVertical: moderateScale(12),
    fontSize: moderateScale(14),
    color: colors.black,
    backgroundColor: colors.white,
    minHeight: moderateScale(48),
  },
  unitDisplay: {
    borderLeftWidth: 1,
    borderLeftColor: colors.secondary,
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateScale(12),
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: moderateScale(48),
    minWidth: moderateScale(80),
    backgroundColor: colors.secondary,
  },
  unitText: {
    fontSize: moderateScale(14),
    color: colors.black,
    fontWeight: '400',
  },
});

export default AreaInputWithUnit;

