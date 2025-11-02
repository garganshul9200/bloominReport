import { View, StyleSheet } from 'react-native';
import React from 'react';
import { moderateScale } from 'react-native-size-matters';
import StepIndicator from 'react-native-step-indicator';
import colors from '../constants/colors';

interface CustomStepIndicatorProps {
  currentPosition: number;
  stepCount?: number;
  labels?: string[];
}

const CustomStepIndicator: React.FC<CustomStepIndicatorProps> = ({
  currentPosition,
  stepCount = 5,
  labels = ['1', '2', '3', '4', '5'],
}) => {
  const customIndicatorStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize: 25,
    stepStrokeCurrentColor: colors.primary,
    stepStrokeFinishedColor: colors.primary,
    stepStrokeUnFinishedColor: colors.bgColor,
    separatorFinishedColor: colors.primary,
    separatorUnFinishedColor: colors.bgColor,
    stepIndicatorUnFinishedColor: colors.bgColor,
    stepIndicatorFinishedColor: colors.primary,
    stepIndicatorCurrentColor: colors.primary,
    labelColor: colors.black,
    labelSize: 14,
  };

  return (
    <View style={styles.stepIndicatorContainer}>
      <StepIndicator
        customStyles={customIndicatorStyles}
        currentPosition={currentPosition}
        labels={labels}
        stepCount={stepCount}
        renderStepIndicator={({ position }) => null}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  stepIndicatorContainer: {
    marginBottom: moderateScale(16),
  },
});

export default CustomStepIndicator;

