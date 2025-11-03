import { ScrollView, View, Text, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useQuery, useRealm } from '@realm/react';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import colors from '../../constants/colors';
import CustomButton from '../../components/CustomButton';
import ScreenHeaderSection from '../../components/ScreenHeaderSection';
import { FarmerDataSchema } from '../../utils/schemas/FarmerDataSchema';
import { styles as commonStyles } from '../FarmerHome/Styles';

const DetailsAdded = () => {
  const navigation = useNavigation();
  const realm = useRealm();
  const farmerDataQuery = useQuery(FarmerDataSchema);
  const [farmerData, setFarmerData] = useState<FarmerDataSchema | null>(null);

  useEffect(() => {
    // Get the latest farmer data
    const latestData = farmerDataQuery.sorted('createdAt', true)[0] || null;
    setFarmerData(latestData);
  }, [farmerDataQuery]);

  const formatDate = (date: Date | null | undefined): string => {
    if (!date) return 'Not set';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const renderSection = (title: string, children: React.ReactNode) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionContent}>{children}</View>
    </View>
  );

  const renderField = (label: string, value: string | undefined | null) => {
    if (!value) return null;
    return (
      <View style={styles.field}>
        <Text style={styles.fieldLabel}>{label}:</Text>
        <Text style={styles.fieldValue}>{value}</Text>
      </View>
    );
  };

  const renderArrayField = (label: string, values: string[] | undefined) => {
    if (!values || values.length === 0) return null;
    return (
      <View style={styles.field}>
        <Text style={styles.fieldLabel}>{label}:</Text>
        <Text style={styles.fieldValue}>{values.join(', ')}</Text>
      </View>
    );
  };

  const handleGoHome = () => {
    navigation.navigate('FarmerHome' as never);
  };

  if (!farmerData) {
    return (
      <ScrollView style={commonStyles.container}>
        <ScreenHeaderSection
          currentPosition={4}
          bottomLabelText="Details Added"
        />
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No data found</Text>
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={commonStyles.container}>
      <ScreenHeaderSection
        currentPosition={0}
        bottomLabelText="Details Added"
      />
      <View style={styles.container}>
        {/* Farmer Home Data */}
        {renderSection('Farmer Profile', (
          <>
            {renderField('Full Name', farmerData.fullName)}
            {renderField('Contact Number', farmerData.contactNumber)}
            {renderField('Gender', farmerData.gender)}
            {renderField('State', farmerData.locationState)}
            {renderField('Village', farmerData.locationVillage)}
            {renderField('Block Name', farmerData.locationBlockName)}
            {renderField('Street Name', farmerData.locationStreetName)}
            {renderField('Plot Number', farmerData.locationPlotNumber)}
          </>
        ))}

        {/* Land Details */}
        {renderSection('Land Details', (
          <>
            {renderField('Area Value', farmerData.areaValue)}
            {renderField('Unit of Area', farmerData.unitOfArea)}
            {renderField('Land Holding', farmerData.landHolding)}
          </>
        ))}

        {/* Crop Details */}
        {renderSection('Crop Details', (
          <>
            {renderField('Flower', farmerData.flower1)}
            {renderField('Flower Types', farmerData.flowerTypes)}
            {renderField('Hybrid Crop Variety', farmerData.hybridCropVariety)}
            {renderField('Current Area of Flowering', farmerData.currentAreaOfFlowering)}
            {farmerData.bloomingDurations && farmerData.bloomingDurations.length > 0 && (
              <View style={styles.field}>
                <Text style={styles.fieldLabel}>Blooming Durations:</Text>
                {Array.from(farmerData.bloomingDurations).map((duration, index) => (
                  <View key={duration.id || index} style={styles.durationItem}>
                    <Text style={styles.durationText}>
                      {index + 1}. Started: {formatDate(duration.startedOn)} - 
                      Ends: {formatDate(duration.endsOn)}
                    </Text>
                  </View>
                ))}
              </View>
            )}
            {renderArrayField('Selected Photos', Array.from(farmerData.selectedPhotos || []))}
          </>
        ))}

        {/* Flower Details */}
        {renderSection('Flower Details', (
          <>
            {renderField('Interested in Bee Pollination', farmerData.beePollination)}
            {renderField('Used Bees Before', farmerData.usedBees)}
            {renderField('Experience', farmerData.beeExperience)}
            {renderField('What Went Wrong', farmerData.whatWentWrong)}
            {renderField('Willing to Pay', farmerData.willingToPay)}
          </>
        ))}

        {/* Beekeeping Details */}
        {renderSection('Beekeeping Details', (
          <>
            {renderField('Uses Chemical Fertilizers', farmerData.fertilizers)}
            {renderArrayField('Selected Fertilizers', Array.from(farmerData.selectedFertilizers || []))}
            {renderField('Uses Chemical Pesticides', farmerData.pesticides)}
            {renderArrayField('Selected Pesticides', Array.from(farmerData.selectedPesticides || []))}
            {renderArrayField('Selected Risks', Array.from(farmerData.selectedRisks || []))}
            {renderArrayField('Bee Box Photos', Array.from(farmerData.selectedBeeBoxPhotos || []))}
            {renderField('Send Consent Form', farmerData.sendConsentForm ? 'Yes' : 'No')}
          </>
        ))}

        {/* Timestamp */}
        <View style={styles.timestampContainer}>
          <Text style={styles.timestampText}>
            Created: {formatDate(farmerData.createdAt)}
          </Text>
          <Text style={styles.timestampText}>
            Last Updated: {formatDate(farmerData.updatedAt)}
          </Text>
        </View>

        <CustomButton
          title="Go to Home"
          onPress={handleGoHome}
          buttonColor={colors.primary}
          textColor={colors.white}
          style={styles.button}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: moderateScale(16),
  },
  section: {
    marginBottom: moderateVerticalScale(24),
    backgroundColor: colors.white,
    borderRadius: moderateScale(8),
    padding: moderateScale(16),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: moderateVerticalScale(12),
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
    paddingBottom: moderateVerticalScale(8),
  },
  sectionContent: {
    gap: moderateVerticalScale(8),
  },
  field: {
    marginBottom: moderateVerticalScale(12),
  },
  fieldLabel: {
    fontSize: moderateScale(14),
    fontWeight: '600',
    color: '#666',
    marginBottom: moderateVerticalScale(4),
  },
  fieldValue: {
    fontSize: moderateScale(16),
    color: '#000',
  },
  durationItem: {
    marginBottom: moderateVerticalScale(8),
    paddingLeft: moderateScale(12),
  },
  durationText: {
    fontSize: moderateScale(14),
    color: '#000',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: moderateScale(32),
  },
  emptyText: {
    fontSize: moderateScale(18),
    color: '#666',
  },
  timestampContainer: {
    marginTop: moderateVerticalScale(16),
    padding: moderateScale(12),
    backgroundColor: '#f5f5f5',
    borderRadius: moderateScale(8),
    marginBottom: moderateVerticalScale(16),
  },
  timestampText: {
    fontSize: moderateScale(12),
    color: '#666',
    marginBottom: moderateVerticalScale(4),
  },
  button: {
    marginVertical: moderateVerticalScale(24),
  },
});

export default DetailsAdded;

