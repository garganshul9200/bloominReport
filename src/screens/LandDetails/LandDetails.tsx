import { ScrollView, View } from 'react-native';
import React, { useState, useCallback, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import { moderateScale } from 'react-native-size-matters';
import colors from '../../constants/colors';
import ScreenHeaderSection from '../../components/ScreenHeaderSection';
import CustomDropdown from '../../components/CustomDropdown';
import AreaInputWithUnit from '../../components/AreaInputWithUnit';
import GeotagButton from '../../components/GeotagButton';
import CustomPickerModal from '../../components/CustomPickerModal';
import CustomRadioButton from '../../components/CustomRadioButton';
import CustomButton from '../../components/CustomButton';
import navigationStrings from '../../constants/navigationStrings';
import { styles } from './Styles';

const LandDetails = () => {
  const navigation = useNavigation();

  // State management
  const [areaValue, setAreaValue] = useState('');
  const [unitOfArea, setUnitOfArea] = useState('');
  const [showUnitModal, setShowUnitModal] = useState(false);
  const [landHolding, setLandHolding] = useState('');

  // Constants - memoized to prevent recreation
  const AREA_UNITS = useMemo(
    () => ['Acre', 'Hectare', 'Katha', 'Bigha', 'Guntha'],
    []
  );

  const LAND_HOLDING_OPTIONS = useMemo(
    () => [
      'Owned by the farmer',
      'Co-owned by farmer and family',
      'Shared (Neighbouring farmers)',
    ],
    []
  );

  // Convert land holding options to radio button format
  const landHoldingRadioOptions = useMemo(
    () => LAND_HOLDING_OPTIONS.map(option => ({ label: option, value: option })),
    [LAND_HOLDING_OPTIONS]
  );

  // Handlers - memoized with useCallback
  const handleUnitOfAreaSelect = useCallback(() => {
    setShowUnitModal(true);
  }, []);

  const handleUnitSelect = useCallback(
    (unit: string) => {
      setUnitOfArea(unit);
      setShowUnitModal(false);
    },
    []
  );

  const handleCloseModal = useCallback(() => {
    setShowUnitModal(false);
  }, []);

  const handleGeotag = useCallback(() => {
    // TODO: Implement geotagging functionality
    console.log('Geotag pressed');
  }, []);

  const handleNext = useCallback(() => {
    navigation.navigate(navigationStrings.CROP_DETAILS as never);
  }, [navigation]);

  return (
    <ScrollView style={styles.container}>
      <ScreenHeaderSection currentPosition={1} bottomLabelText="Land Details" />

      <CustomDropdown
        label="Select Unit of Area"
        placeholder="Select from list"
        value={unitOfArea}
        onPress={handleUnitOfAreaSelect}
        required
        mainStyles={styles.DropDownStyles}
      />
      <AreaInputWithUnit
        label="Area of Plantation"
        placeholder="Enter area of plantation"
        value={areaValue}
        unit={unitOfArea}
        onAreaChange={setAreaValue}
        number={2}
        keyboardType="numeric"
        required
      />
      <View style={styles.geotagButtonContainer}>
        <GeotagButton onPress={handleGeotag} />
      </View>
      <CustomPickerModal
        visible={showUnitModal}
        title="Select Units"
        options={AREA_UNITS}
        selectedValue={unitOfArea}
        onSelect={handleUnitSelect}
        onClose={handleCloseModal}
      />
      <CustomRadioButton
        label="Land Holding"
        options={landHoldingRadioOptions}
        selectedValue={landHolding}
        onValueChange={setLandHolding}
        number={3}
        required
      />
      <CustomButton
        title="Next"
        buttonColor={colors.primary}
        onPress={handleNext}
        style={{ marginVertical: moderateScale(24) }}
      />
    </ScrollView>
  );
};

export default LandDetails;
