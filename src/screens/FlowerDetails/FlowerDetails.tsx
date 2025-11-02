import { ScrollView } from 'react-native';
import React, { useState, useCallback, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import ScreenHeaderSection from '../../components/ScreenHeaderSection';
import { styles as commonStyles } from '../FarmerHome/Styles';
import CustomRadioButton from '../../components/CustomRadioButton';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import colors from '../../constants/colors';
import navigationStrings from '../../constants/navigationStrings';
import { styles } from './Styles';

const FlowerDetails = () => {
  const navigation = useNavigation();
  const [beePollination, setBeePollination] = useState<string>('');
  const [usedBees, setUsedBees] = useState<string>('');
  const [beeExperience, setBeeExperience] = useState<string>('');
  const [willingToPay, setWillingToPay] = useState<string>('');
  const [whatWentWrong, setWhatWentWrong] = useState<string>('');

  // Memoized options to prevent recreation on every render
  const beePollinationOptions = useMemo(
    () =>
      ['Yes, I would be', 'Not sure, maybe'].map(option => ({
        label: option,
        value: option,
      })),
    [],
  );

  const usedBeesOptions = useMemo(
    () =>
      ['Yes', 'No'].map(option => ({
        label: option,
        value: option,
      })),
    [],
  );

  const experienceOptions = useMemo(
    () =>
      ['Positive', 'Negative'].map(option => ({
        label: option,
        value: option,
      })),
    [],
  );

  const willingToPayOptions = useMemo(
    () =>
      ['Yes', 'No'].map(option => ({
        label: option,
        value: option,
      })),
    [],
  );

  const handleComplete = useCallback(() => {
    navigation.navigate(navigationStrings.BEEKEEPING_DETAILS as never);
  }, [navigation]);

  return (
    <ScrollView style={commonStyles.container}>
      <ScreenHeaderSection
        currentPosition={3}
        bottomLabelText="Flowering Details"
      />
      <CustomRadioButton
        label="Are you interested in using bee pollination services on your farm?*"
        options={beePollinationOptions}
        selectedValue={beePollination}
        onValueChange={setBeePollination}
        required
      />
      <CustomRadioButton
        label="Have you ever used bees in your farm for pollination ?*"
        options={usedBeesOptions}
        selectedValue={usedBees}
        onValueChange={setUsedBees}
        required
      />
      <CustomRadioButton
        label="How was your experience?*"
        options={experienceOptions}
        selectedValue={beeExperience}
        onValueChange={setBeeExperience}
        required
      />
      {beeExperience === 'Negative' && (
        <CustomInput
          label="What made the experience negative?"
          placeholder="Write here"
          value={whatWentWrong}
          onChangeText={setWhatWentWrong}
          multiline
          numberOfLines={2}
          required
          style={commonStyles.radioButtonStyles}
        />
      )}
      <CustomRadioButton
        label="Are you willing to pay to avail this service ?*"
        options={willingToPayOptions}
        selectedValue={willingToPay}
        onValueChange={setWillingToPay}
        required
      />
      <CustomButton
        title="Complete"
        onPress={handleComplete}
        buttonColor={colors.primary}
        textColor={colors.white}
        style={styles.completeButton}
      />
    </ScrollView>
  );
};

export default FlowerDetails;
