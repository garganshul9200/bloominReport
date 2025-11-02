import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import { moderateScale } from 'react-native-size-matters';
import colors from '../constants/colors';
import { textScale } from '../styles/responsiveSize';
import CustomCheckbox from './CustomCheckbox';

interface Option {
  id: string;
  label: string;
  subLabel?: string;
}

interface MultiSelectCheckboxListProps {
  label: string;
  options: Option[];
  selectedValues: string[];
  onValueChange: (selectedValues: string[]) => void;
  number?: number;
  required?: boolean;
  style?: any;
}

const MultiSelectCheckboxList: React.FC<MultiSelectCheckboxListProps> = ({
  label,
  options,
  selectedValues,
  onValueChange,
  number,
  required = false,
  style,
}) => {
  const displayLabel = number
    ? `${number}. ${label}${required ? '*' : ''}`
    : `${label}${required ? '*' : ''}`;

  const handleToggle = (id: string) => {
    const newSelected = selectedValues.includes(id)
      ? selectedValues.filter(value => value !== id)
      : [...selectedValues, id];
    onValueChange(newSelected);
  };

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.label}>{displayLabel}</Text>
      <View style={styles.optionsContainer}>
        {options.map((option) => (
          <CustomCheckbox
            key={option.id}
            label={option.label}
            subLabel={option.subLabel}
            checked={selectedValues.includes(option.id)}
            onPress={() => handleToggle(option.id)}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    paddingVertical: moderateScale(16),
    paddingHorizontal: moderateScale(24),
  },
  label: {
    fontSize: textScale(16),
    color: colors.black,
    marginBottom: moderateScale(12),
    fontWeight: '400',
  },
  optionsContainer: {
    // Container for checkboxes
  },
});

export default MultiSelectCheckboxList;

