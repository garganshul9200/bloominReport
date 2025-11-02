import { TouchableOpacity, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import React from 'react';
import { moderateScale } from 'react-native-size-matters';
import colors from '../constants/colors';
import { textScale } from '../styles/responsiveSize';

interface GeotagButtonProps {
  onPress: () => void;
  title?: string;
  style?: StyleProp<ViewStyle>;
}

const GeotagButton: React.FC<GeotagButtonProps> = ({ onPress, title = 'Geotag the plantation', style }) => {
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.locationButtonBg,
    borderRadius: moderateScale(8),
    paddingVertical: moderateScale(16),
    paddingHorizontal: moderateScale(24),
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: moderateScale(24),
    marginVertical: moderateScale(2),
  },
  buttonText: {
    fontSize: textScale(16),
    color: colors.primary,
    fontWeight: '600',
  },
});

export default GeotagButton;

