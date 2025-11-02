import { View, Text, TextInput, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import React from 'react';
import { moderateScale } from 'react-native-size-matters';
import colors from '../constants/colors';
import { textScale } from '../styles/responsiveSize';

interface CustomInputProps {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  number?: number;
  required?: boolean;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  style?: StyleProp<ViewStyle>;
  inputMainStyles?: StyleProp<ViewStyle>;
  multiline?: boolean;
  numberOfLines?: number;
}

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  number,
  required = false,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  style,
  inputMainStyles,
  multiline = false,
  numberOfLines = 1,
}) => {
  const displayLabel = number
    ? `${number}. ${label}${required ? '*' : ''}`
    : `${label}${required ? '*' : ''}`;

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.label}>{displayLabel}</Text>
      <TextInput
        style={[styles.input, multiline && styles.multilineInput, inputMainStyles]}
        placeholder={placeholder}
        placeholderTextColor={colors.placeholderColor}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        multiline={multiline}
        numberOfLines={multiline ? numberOfLines : undefined}
        textAlignVertical={multiline ? 'top' : 'center'}
      />
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
  input: {
    borderWidth: 1,
    borderColor: colors.secondary,
    borderRadius: moderateScale(6),
    paddingHorizontal: moderateScale(12),
    paddingVertical: moderateScale(12),
    fontSize: moderateScale(14),
    color: colors.black,
    backgroundColor: colors.white,
    minHeight: moderateScale(48),
  },
  multilineInput: {
    minHeight: moderateScale(80),
    paddingTop: moderateScale(12),
  },
});

export default CustomInput;
