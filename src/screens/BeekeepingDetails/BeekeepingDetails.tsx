import {
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, { useState, useCallback, useMemo } from 'react';
import ScreenHeaderSection from '../../components/ScreenHeaderSection';
import { styles as commonStyles, styles } from '../FarmerHome/Styles';
import CustomRadioButton from '../../components/CustomRadioButton';
import CustomDropdown from '../../components/CustomDropdown';
import MultiSelectModal from '../../components/MultiSelectModal';
import MultiSelectCheckboxList from '../../components/MultiSelectCheckboxList';
import PhotoUpload from '../../components/PhotoUpload';
import CustomCheckbox from '../../components/CustomCheckbox';
import { moderateScale } from 'react-native-size-matters';
import colors from '../../constants/colors';
import CustomButton from '../../components/CustomButton';
import navigationStrings from '../../constants/navigationStrings';
import { useNavigation } from '@react-navigation/native';
import { getFarmerDataService } from '../../utils/realmService';
import { ShowError, showSuccess } from '../../utils/helperFunctions';

interface FertilizerOption {
  id: string;
  label: string;
  examples: string[];
}

interface PesticideOption {
  id: string;
  label: string;
  examples: string[];
}

interface RiskOption {
  id: string;
  label: string;
}

const BeekeepingDetails = () => {
  const [fertilizers, setFertilizers] = useState<string>('');
  const [pesticides, setPesticides] = useState<string>('');
  const [selectedFertilizers, setSelectedFertilizers] = useState<string[]>([]);
  const [showFertilizerModal, setShowFertilizerModal] = useState(false);
  const [selectedPesticides, setSelectedPesticides] = useState<string[]>([]);
  const [showPesticideModal, setShowPesticideModal] = useState(false);
  const [selectedRisks, setSelectedRisks] = useState<string[]>([]);
  const [selectedBeeBoxPhotos, setSelectedBeeBoxPhotos] = useState<string[]>(
    [],
  );
  const [sendConsentForm, setSendConsentForm] = useState<boolean>(true);
  const navigation = useNavigation();
  const fertilizerOptions = useMemo<FertilizerOption[]>(
    () => [
      {
        id: 'nitrogenous',
        label: 'Nitrogenous (N fertilisers)',
        examples: ['Urea', 'Ammonium Sulphate', 'CAN'],
      },
      {
        id: 'phosphatic',
        label: 'Phosphatic (P fertilisers)',
        examples: ['SSP', 'DAP'],
      },
      {
        id: 'potassic',
        label: 'Potassic (K fertilisers)',
        examples: ['MOP', 'SOP'],
      },
      {
        id: 'complex',
        label: 'Complex / Compound NPK',
        examples: ['10-26-26', '19-19-19', '20-20-20'],
      },
      {
        id: 'coated',
        label: 'Coated / Controlled-release',
        examples: ['Neem-coated urea', 'polymer-coated urea'],
      },
      {
        id: 'micronutrient',
        label: 'Micronutrient Fertilisers',
        examples: ['Zinc Sulphate', 'Boron', 'Copper Sulphate'],
      },
      {
        id: 'foliar',
        label: 'Foliar / Liquid Nutrient Sprays',
        examples: ['Liquid NPK', 'Leaf Feed', 'amino acid sprays'],
      },
      {
        id: 'unknown',
        label: 'Unknown / Mixed formulations',
        examples: ['Growth booster', 'leaf tonic'],
      },
    ],
    [],
  );

  const pesticideOptions = useMemo<PesticideOption[]>(
    () => [
      {
        id: 'organophosphates',
        label: 'Organophosphates',
        examples: ['Chlorpyrifos (Dursban)', 'Dimethoate', 'Malathion'],
      },
      {
        id: 'carbamates',
        label: 'Carbamates',
        examples: ['Carbaryl (Sevin)', 'Carbofuran'],
      },
      {
        id: 'avermectins',
        label: 'Avermectins',
        examples: ['Abamectin (Vertimec)', 'Emamectin benzoate (Proclaim)'],
      },
      {
        id: 'sulfoximines',
        label: 'Sulfoximines',
        examples: ['Sulfoxaflor (Closer)'],
      },
      {
        id: 'fungicides',
        label: 'Fungicides',
        examples: ['Mancozeb (Indofil M-45)', 'Carbendazim', 'Tebuconazole'],
      },
      {
        id: 'herbicides',
        label: 'Herbicides',
        examples: ['Glyphosate (Roundup)', '2,4-D', 'Paraquat'],
      },
      {
        id: 'igrs',
        label: 'Insect Growth Regulators (IGRs)',
        examples: ['Buprofezin', 'Diflubenzuron', 'Pyriproxyfen'],
      },
      {
        id: 'unknown',
        label: 'Unknown / Pest-target-based',
        examples: ['For sucking pests', 'for bollworm'],
      },
      {
        id: 'neonicotinoids',
        label: 'Neonicotinoids',
        examples: [
          'Imidacloprid (Confidor)',
          'Thiamethoxam (Actara)',
          'Clothianidin',
        ],
      },
      {
        id: 'pyrethroids',
        label: 'Pyrethroids',
        examples: [
          'Cypermethrin',
          'Deltamethrin (Decis)',
          'Lambdacyhalothrin (Karate)',
        ],
      },
    ],
    [],
  );

  const yesNoOptions = useMemo(
    () =>
      ['Yes', 'No'].map(option => ({
        label: option,
        value: option,
      })),
    [],
  );

  const riskOptions = useMemo<RiskOption[]>(
    () => [
      { id: 'submerged', label: 'Submerged areas' },
      { id: 'chemicals_self', label: 'Excessive use of chemicals by self' },
      {
        id: 'chemicals_neighbours',
        label: 'Excessive use of chemicals by neighbours',
      },
      { id: 'factories', label: 'Nearby factories' },
      { id: 'traffic', label: 'Nearby road traffic' },
      { id: 'theft', label: 'No guard, Possibility of theft' },
      { id: 'animals', label: 'Animal attacks' },
      { id: 'bees', label: 'Scared of honey bees' },
    ],
    [],
  );

  const handleFertilizerSelect = useCallback((selected: string[]) => {
    setSelectedFertilizers(selected);
  }, []);

  const handleOpenFertilizerModal = useCallback(() => {
    setShowFertilizerModal(true);
  }, []);

  const handleCloseFertilizerModal = useCallback(() => {
    setShowFertilizerModal(false);
  }, []);

  const handlePesticideSelect = useCallback((selected: string[]) => {
    setSelectedPesticides(selected);
  }, []);

  const handleOpenPesticideModal = useCallback(() => {
    setShowPesticideModal(true);
  }, []);

  const handleClosePesticideModal = useCallback(() => {
    setShowPesticideModal(false);
  }, []);

  const displayFertilizerText = useMemo(() => {
    if (selectedFertilizers.length === 0) return '';
    return selectedFertilizers
      .map(id => fertilizerOptions.find(opt => opt.id === id)?.label || id)
      .join(', ');
  }, [selectedFertilizers, fertilizerOptions]);

  const displayPesticideText = useMemo(() => {
    if (selectedPesticides.length === 0) return '';
    return selectedPesticides
      .map(id => pesticideOptions.find(opt => opt.id === id)?.label || id)
      .join(', ');
  }, [selectedPesticides, pesticideOptions]);

  const handleComplete = useCallback(async () => {
    try {
      // Save data to Realm
      try {
        const farmerService = await getFarmerDataService();
        await farmerService.updateFarmerData({
          fertilizers,
          selectedFertilizers: selectedFertilizers,
          pesticides,
          selectedPesticides: selectedPesticides,
          selectedRisks: selectedRisks,
          selectedBeeBoxPhotos: selectedBeeBoxPhotos,
          sendConsentForm,
        });
        showSuccess('Beekeeping details saved successfully');
      } catch (realmError) {
        console.error('Error saving beekeeping details:', realmError);
        ShowError('Failed to save data. Please try again.');
        return;
      }

      // Navigate to DetailsAdded screen
      navigation.navigate(navigationStrings.DETAILS_ADDED as never);
    } catch (error) {
      console.error('Error navigating to details added:', error);
      ShowError('Failed to proceed. Please try again.');
    }
  }, [navigation, fertilizers, selectedFertilizers, pesticides, selectedPesticides, selectedRisks, selectedBeeBoxPhotos, sendConsentForm]);

  return (
    <KeyboardAvoidingView
      style={commonStyles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        style={commonStyles.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <ScreenHeaderSection
          currentPosition={4}
          bottomLabelText="Beekeeping Details"
        />
      <CustomRadioButton
        label="Do you use chemical Fertilizers?"
        options={yesNoOptions}
        selectedValue={fertilizers}
        onValueChange={setFertilizers}
        required
      />

      {fertilizers === 'Yes' && (
        <>
          <CustomDropdown
            label="Select the class of Fertilizer"
            placeholder="Select from list"
            value={displayFertilizerText}
            onPress={handleOpenFertilizerModal}
            required
            showAddButton
            onAddPress={handleOpenFertilizerModal}
            mainStyles={{ marginTop: moderateScale(-24) }}
          />
          <MultiSelectModal
            visible={showFertilizerModal}
            title="Select Fertilizer Class"
            options={fertilizerOptions}
            selectedValues={selectedFertilizers}
            onSelect={handleFertilizerSelect}
            onClose={handleCloseFertilizerModal}
          />
        </>
      )}

      <CustomRadioButton
        label="Do you use chemical Pesticides?"
        options={yesNoOptions}
        selectedValue={pesticides}
        onValueChange={setPesticides}
        required
      />

      {pesticides === 'Yes' && (
        <>
          <CustomDropdown
            label="Select the class of Pesticide"
            placeholder="Select from list"
            value={displayPesticideText}
            onPress={handleOpenPesticideModal}
            required
            showAddButton
            onAddPress={handleOpenPesticideModal}
            mainStyles={{ marginTop: moderateScale(-24) }}
          />
          <MultiSelectModal
            visible={showPesticideModal}
            title="Select Pesticide Class"
            options={pesticideOptions}
            selectedValues={selectedPesticides}
            onSelect={handlePesticideSelect}
            onClose={handleClosePesticideModal}
          />
        </>
      )}

      <MultiSelectCheckboxList
        label="Select potential risks if any"
        options={riskOptions}
        selectedValues={selectedRisks}
        onValueChange={setSelectedRisks}
        number={3}
      />

      <PhotoUpload
        label="What could be a suitable place to place bee boxes?"
        instructionText="Make sure to include access roads, clear photos of surrounding, and the location"
        number={4}
        required
        onPhotosSelected={setSelectedBeeBoxPhotos}
      />

      <CustomCheckbox
        label="Send consent form to farmer on the registered number on completion."
        checked={sendConsentForm}
        onPress={() => setSendConsentForm(!sendConsentForm)}
      />
      <CustomButton
        title="Complete"
        onPress={handleComplete}
        buttonColor={colors.primary}
        textColor={colors.white}
        style={{ marginVertical: moderateScale(24) }}
      />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default BeekeepingDetails;
