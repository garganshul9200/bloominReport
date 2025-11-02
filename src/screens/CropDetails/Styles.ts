import { StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import colors from '../../constants/colors';
import { textScale } from '../../styles/responsiveSize';

export const styles = StyleSheet.create({
  bloomingSection: {
    backgroundColor: colors.white,
    paddingTop: moderateScale(12),
    paddingHorizontal: moderateScale(24),
  },
  sectionTitle: {
    fontSize: textScale(16),
    color: colors.black,
    fontWeight: '400',
    marginBottom: moderateScale(4),
  },
  instructionText: {
    fontSize: textScale(14),
    color: colors.black,
    marginBottom: moderateScale(16),
    fontWeight: '400',
  },
  dateRow: {
    flexDirection: 'row',
    marginBottom: moderateScale(16),
  },
  dateSpacer: {
    width: moderateScale(12),
  },
  infoText: {
    fontSize: textScale(14),
    color: colors.black,
    marginBottom: moderateScale(16),
    fontWeight: '400',
  },
  actionCard: {
    marginBottom: moderateScale(24),
    paddingHorizontal: moderateScale(24),
    paddingVertical: moderateScale(18),
  },
  actionCardText: {
    fontSize: textScale(14),
    color: colors.black,
    fontWeight: '400',
    marginBottom: moderateScale(16),
    textAlign: 'center',
  },
  addMoreButton: {
    backgroundColor: '#FFE5D9',
    borderRadius: moderateScale(8),
    paddingVertical: moderateScale(14),
    paddingHorizontal: moderateScale(24),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: moderateScale(16),
  },
  addMoreButtonText: {
    fontSize: textScale(16),
    color: colors.primary,
    fontWeight: '600',
  },
  separatorContainer: {
    alignItems: 'center',
    marginBottom: moderateScale(16),
  },
  separatorText: {
    fontSize: textScale(14),
    color: colors.black,
    fontWeight: '400',
  },
  completeButton: {
    marginHorizontal: 0,
    marginBottom: 0,
    borderRadius: moderateScale(8),
  },
  firstSectionMargin: {
    marginTop: moderateScale(8),
  },
  geotagButtonStyle: {
    marginHorizontal: 0,
    marginBottom: moderateScale(12),
  },
});

