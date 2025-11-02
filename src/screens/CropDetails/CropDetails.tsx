import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import React, { useState, useCallback, useMemo } from 'react';
import ScreenHeaderSection from '../../components/ScreenHeaderSection';
import CustomDropdown from '../../components/CustomDropdown';
import CustomPickerModal from '../../components/CustomPickerModal';
import { styles as commonStyles } from '../FarmerHome/Styles';
import CustomRadioButton from '../../components/CustomRadioButton';
import CustomInput from '../../components/CustomInput';
import CustomDateInput from '../../components/CustomDateInput';
import GeotagButton from '../../components/GeotagButton';
import AreaInputWithUnit from '../../components/AreaInputWithUnit';
import PhotoUpload from '../../components/PhotoUpload';
import CustomButton from '../../components/CustomButton';
import colors from '../../constants/colors';
import { styles } from './Styles';
import navigationStrings from '../../constants/navigationStrings';
import { useNavigation } from '@react-navigation/native';

interface BloomingDuration {
  id: number;
  startedOn: Date | null;
  endsOn: Date | null;
}

const CropDetails = () => {
  const [flower1, setFlower1] = useState('');
  const [showFlowerModal, setShowFlowerModal] = useState(false);
  const [flowerTypes, setFlowerTypes] = useState('');
  const [hybridCropVariety, setHybridCropVariety] = useState('');
  const [showHybridVarietyModal, setShowHybridVarietyModal] = useState(false);
  const [bloomingDurations, setBloomingDurations] = useState<
    BloomingDuration[]
  >([{ id: 1, startedOn: null, endsOn: null }]);
  const [currentAreaOfFlowering, setCurrentAreaOfFlowering] = useState('');
  const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]);
  const [activeDatePicker, setActiveDatePicker] = useState<string | null>(null);
  const navigation = useNavigation();
  // Hybrid crop variety options
  const HYBRID_VARIETY_OPTIONS = useMemo(
    () => ['Variety A', 'Variety B', 'Variety C', 'Variety D'],
    [],
  );
  // Flower options - memoized to prevent recreation
  const FLOWER_OPTIONS = useMemo(
    () => [
      'Rose',
      'Tulip',
      'Sunflower',
      'Lily',
      'Orchid',
      'Marigold',
      'Jasmine',
      'Lotus',
      'Hibiscus',
      'Daisy',
    ],
    [],
  );
  const FLOWER_TYPES = useMemo(() => ['Local/Desi', 'Hybrid'], []);

  const handleFlowerSelect = useCallback(() => {
    setShowFlowerModal(true);
  }, []);

  const handleFlowerChosen = useCallback((flower: string) => {
    setFlower1(flower);
    setShowFlowerModal(false);
  }, []);

  const handleCloseModal = useCallback(() => {
    setShowFlowerModal(false);
  }, []);

  const handleHybridVarietySelect = useCallback(() => {
    setShowHybridVarietyModal(true);
  }, []);

  const handleHybridVarietyChosen = useCallback((variety: string) => {
    setHybridCropVariety(variety);
    setShowHybridVarietyModal(false);
  }, []);

  const handleCloseHybridModal = useCallback(() => {
    setShowHybridVarietyModal(false);
  }, []);

  const handleAddFlower = useCallback(() => {
    // TODO: Implement add flower functionality (e.g., add to list, reset form, etc.)
    console.log('Add flower pressed');
  }, []);

  const handleStartDateChange = useCallback((id: number, date: Date) => {
    setBloomingDurations(prev =>
      prev.map(duration => {
        if (duration.id === id) {
          // If endsOn is set and is less than or equal to the new startedOn, clear it
          const newEndsOn =
            duration.endsOn && duration.endsOn.getTime() <= date.getTime()
              ? null
              : duration.endsOn;
          return { ...duration, startedOn: date, endsOn: newEndsOn };
        }
        return duration;
      }),
    );
  }, []);

  const handleEndDateChange = useCallback((id: number, date: Date) => {
    setBloomingDurations(prev =>
      prev.map(duration =>
        duration.id === id ? { ...duration, endsOn: date } : duration,
      ),
    );
  }, []);

  const handleAddMoreDuration = useCallback(() => {
    setBloomingDurations(prev => {
      const newId = Math.max(...prev.map(d => d.id), 0) + 1;
      return [...prev, { id: newId, startedOn: null, endsOn: null }];
    });
  }, []);

  const handleComplete = useCallback(() => {
    navigation.navigate(navigationStrings.FLOWER_DETAILS as never);
  }, [navigation]);

  const flowerTypesOptions = useMemo(
    () => FLOWER_TYPES.map(option => ({ label: option, value: option })),
    [],
  );

  return (
    <ScrollView style={commonStyles.container}>
      <ScreenHeaderSection
        currentPosition={2}
        bottomLabelText="Flowering Details (0 flower details recorded)"
      />
      <CustomDropdown
        label="Flower 1"
        placeholder="Select from list"
        value={flower1}
        onPress={handleFlowerSelect}
        onAddPress={handleAddFlower}
        number={1}
        required
        showAddButton
      />
      <CustomPickerModal
        visible={showFlowerModal}
        title="Select Flower"
        options={FLOWER_OPTIONS}
        selectedValue={flower1}
        onSelect={handleFlowerChosen}
        onClose={handleCloseModal}
      />
      <CustomRadioButton
        label="Select the crop variety?"
        options={flowerTypesOptions}
        selectedValue={flowerTypes}
        onValueChange={setFlowerTypes}
        required
      />
      {flowerTypes === 'Hybrid' && (
        <CustomInput
          label="Name the hybrid crop variety"
          placeholder="Select from list"
          value={hybridCropVariety}
          onChangeText={setHybridCropVariety}
          required
          style={commonStyles.radioButtonStyles}
        />
      )}

      {bloomingDurations.map((duration, index) => {
        const isFirst = index === 0;
        const isLast = index === bloomingDurations.length - 1;
        const startedPickerKey = `started-${duration.id}`;
        const endsPickerKey = `ends-${duration.id}`;

        return (
          <View
            key={duration.id}
            style={[
              styles.bloomingSection,
              isFirst && styles.firstSectionMargin,
            ]}
          >
            <Text style={styles.sectionTitle}>
              {isFirst ? '2. Blooming duration*' : 'Blooming duration*'}
            </Text>
            <Text style={styles.instructionText}>(Select month and week)</Text>
            <View style={styles.dateRow}>
              <CustomDateInput
                label="Started on"
                placeholder="Select Date"
                value={duration.startedOn}
                onChange={date => handleStartDateChange(duration.id, date)}
                onPress={() => setActiveDatePicker(startedPickerKey)}
                showModal={activeDatePicker === startedPickerKey}
                onClose={() => setActiveDatePicker(null)}
              />
              <View style={styles.dateSpacer} />
              <CustomDateInput
                label="Ends on"
                placeholder="Select Date"
                value={duration.endsOn}
                onChange={date => handleEndDateChange(duration.id, date)}
                onPress={() => setActiveDatePicker(endsPickerKey)}
                showModal={activeDatePicker === endsPickerKey}
                onClose={() => setActiveDatePicker(null)}
                disabled={!duration.startedOn}
                minimumDate={
                  duration.startedOn
                    ? new Date(
                        duration.startedOn.getTime() + 24 * 60 * 60 * 1000,
                      )
                    : null
                }
              />
            </View>
            {isLast && (
              <>
                <Text style={styles.infoText}>
                  If it blooms more than once, please add all the bloom dates.
                </Text>
                <GeotagButton
                  onPress={handleAddMoreDuration}
                  title="Add More"
                  style={styles.geotagButtonStyle}
                />
              </>
            )}
          </View>
        );
      })}

      <AreaInputWithUnit
        label="The current area of flowering?"
        placeholder="Enter area here"
        value={currentAreaOfFlowering}
        unit="acres"
        onAreaChange={setCurrentAreaOfFlowering}
        number={3}
        required
        keyboardType="numeric"
        instructionText="Plantation area cannot exceed the total farming area of x acres"
      />

      <PhotoUpload
        label="Add photo of the Plantation"
        instructionText="Make sure the crop and land are in clear view"
        number={4}
        required
        onPhotosSelected={setSelectedPhotos}
      />

      <View style={styles.actionCard}>
        <Text style={styles.actionCardText}>
          Log all flowerings — current and upcoming.
        </Text>
        <TouchableOpacity
          style={styles.addMoreButton}
          onPress={handleAddMoreDuration}
          activeOpacity={0.8}
        >
          <Text style={styles.addMoreButtonText}>Add More</Text>
        </TouchableOpacity>
        <View style={styles.separatorContainer}>
          <Text style={styles.separatorText}>OR</Text>
        </View>
        <CustomButton
          title="Complete"
          onPress={handleComplete}
          buttonColor={colors.primary}
          textColor={colors.white}
          style={styles.completeButton}
        />
      </View>
    </ScrollView>
  );
};

export default CropDetails;
