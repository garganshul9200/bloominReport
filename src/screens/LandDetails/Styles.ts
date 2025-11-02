import { StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import colors from '../../constants/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  DropDownStyles: {
    marginTop: moderateScale(16),
  },
  geotagButtonContainer: {
    backgroundColor: colors.white,
    paddingBottom: moderateScale(12),
  },
});

