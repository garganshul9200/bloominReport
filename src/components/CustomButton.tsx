import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, StyleProp, ViewStyle } from 'react-native';
import React from 'react';
import { moderateScale } from 'react-native-size-matters';
import colors from '../constants/colors';
import { textScale } from '../styles/responsiveSize';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  buttonColor?: string;
  textColor?: string;
  style?: StyleProp<ViewStyle>;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  disabled = false,
  loading = false,
  buttonColor = colors.primary,
  textColor = colors.white,
  style,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: buttonColor },
        (disabled || loading) && styles.buttonDisabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <Text style={[styles.buttonText, { color: textColor }]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: moderateScale(12),
    paddingVertical: moderateScale(16),
    paddingHorizontal: moderateScale(24),
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: moderateScale(50),
    marginHorizontal: moderateScale(24),
    // marginTop: moderateScale(24),
    
    marginBottom: moderateScale(24),
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    fontSize: textScale(16),
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CustomButton;

