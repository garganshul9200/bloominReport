import { StyleSheet } from 'react-native';
import colors from '../../constants/colors';
import { moderateScale } from 'react-native-size-matters';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgColor,
  },
  radioButtonStyles: {
    marginTop: moderateScale(-14),
  },
  createProfileButton: {
    marginVertical: moderateScale(24),
  },
});
