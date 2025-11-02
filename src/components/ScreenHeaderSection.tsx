import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { moderateScale } from 'react-native-size-matters';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import colors from '../constants/colors';
import Header from './Header';
import CustomStepIndicator from './CustomStepIndicator';

interface ScreenHeaderSectionProps {
  currentPosition: number;
  bottomLabelText: string;
}

const ScreenHeaderSection: React.FC<ScreenHeaderSectionProps> = ({
  currentPosition,
  bottomLabelText,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
        },
      ]}
    >
      <Header />
      <CustomStepIndicator currentPosition={currentPosition} />
      <View style={styles.bottomLabel}>
        <Text style={styles.bottomText}>{bottomLabelText}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    paddingHorizontal: moderateScale(24),
    borderBottomLeftRadius: moderateScale(40),
    borderBottomRightRadius: moderateScale(40),
    marginBottom: moderateScale(8),
  },
  bottomLabel: {
    paddingBottom: moderateScale(12),
    alignItems: 'center',
  },
  bottomText: {
    fontSize: moderateScale(16),
    color: '#212121',
  },
});

export default ScreenHeaderSection;

