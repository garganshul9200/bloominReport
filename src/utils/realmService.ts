import Realm, { BSON } from 'realm';
import {
  FarmerDataSchema,
  BloomingDurationSchema,
} from './schemas/FarmerDataSchema';

// Realm Configuration
export const realmConfig: Realm.Configuration = {
  schema: [FarmerDataSchema, BloomingDurationSchema],
  schemaVersion: 1,
};

// Get or create Realm instance
let realmInstance: Realm | null = null;

export const getRealm = async (): Promise<Realm> => {
  if (!realmInstance) {
    realmInstance = await Realm.open(realmConfig);
  }
  return realmInstance;
};

// Service to manage farmer data
export class FarmerDataService {
  private realm: Realm;

  constructor(realm: Realm) {
    this.realm = realm;
  }

  // Create or update farmer data
  async saveOrUpdateFarmerData(data: Partial<FarmerDataSchema>): Promise<BSON.ObjectId> {
    try {
      const realm = await getRealm();
      let farmerData: FarmerDataSchema;

      realm.write(() => {
        // Try to find existing record (you can modify this logic based on your needs)
        const existingData = realm.objects<FarmerDataSchema>('FarmerData').sorted('createdAt', true)[0];
        
        if (existingData) {
          // Update existing record - use updateFarmerData method
          farmerData = existingData;
          // This will be handled by updateFarmerData
        } else {
          // Prepare data for creation - handle arrays
          const createData: any = {
            ...data,
            createdAt: new Date(),
            updatedAt: new Date(),
          };
          
          // Handle blooming durations
          if (data.bloomingDurations) {
            const durations = data.bloomingDurations as any[];
            createData.bloomingDurations = [];
            // Will be populated after creation
          }
          
          // Create new record
          farmerData = realm.create<FarmerDataSchema>('FarmerData', createData);
          
          // Now populate arrays
          if (data.bloomingDurations) {
            const durations = data.bloomingDurations as any[];
            durations.forEach(duration => {
              const realmDuration = realm.create('BloomingDuration', {
                id: duration.id,
                startedOn: duration.startedOn || null,
                endsOn: duration.endsOn || null,
              });
              farmerData.bloomingDurations.push(realmDuration);
            });
          }
          
          // Handle string arrays
          if (data.selectedPhotos) {
            (data.selectedPhotos as string[]).forEach(photo => {
              farmerData.selectedPhotos.push(photo);
            });
          }
          if (data.selectedFertilizers) {
            (data.selectedFertilizers as string[]).forEach(fertilizer => {
              farmerData.selectedFertilizers.push(fertilizer);
            });
          }
          if (data.selectedPesticides) {
            (data.selectedPesticides as string[]).forEach(pesticide => {
              farmerData.selectedPesticides.push(pesticide);
            });
          }
          if (data.selectedRisks) {
            (data.selectedRisks as string[]).forEach(risk => {
              farmerData.selectedRisks.push(risk);
            });
          }
          if (data.selectedBeeBoxPhotos) {
            (data.selectedBeeBoxPhotos as string[]).forEach(photo => {
              farmerData.selectedBeeBoxPhotos.push(photo);
            });
          }
        }
      });

      return farmerData._id;
    } catch (error) {
      console.error('Error saving farmer data:', error);
      throw error;
    }
  }

  // Get latest farmer data
  async getLatestFarmerData(): Promise<FarmerDataSchema | null> {
    try {
      const realm = await getRealm();
      const latestData = realm
        .objects<FarmerDataSchema>('FarmerData')
        .sorted('createdAt', true)[0];
      
      return latestData || null;
    } catch (error) {
      console.error('Error getting farmer data:', error);
      return null;
    }
  }

  // Get all farmer data
  async getAllFarmerData(): Promise<Realm.Results<FarmerDataSchema>> {
    try {
      const realm = await getRealm();
      return realm.objects<FarmerDataSchema>('FarmerData').sorted('createdAt', true);
    } catch (error) {
      console.error('Error getting all farmer data:', error);
      throw error;
    }
  }

  // Delete farmer data by ID
  async deleteFarmerData(id: BSON.ObjectId): Promise<void> {
    try {
      const realm = await getRealm();
      realm.write(() => {
        const farmerData = realm.objectForPrimaryKey<FarmerDataSchema>('FarmerData', id);
        if (farmerData) {
          realm.delete(farmerData);
        }
      });
    } catch (error) {
      console.error('Error deleting farmer data:', error);
      throw error;
    }
  }

  // Helper method to update specific fields
  async updateFarmerData(fields: Partial<FarmerDataSchema>): Promise<void> {
    try {
      const realm = await getRealm();
      
      realm.write(() => {
        const existingData = realm.objects<FarmerDataSchema>('FarmerData').sorted('createdAt', true)[0];
        
        if (existingData) {
          // Handle arrays separately
          if (fields.bloomingDurations) {
            // Safely clear existing durations - remove items manually
            // For Realm Lists of objects, we need to delete the objects themselves
            if (existingData.bloomingDurations && existingData.bloomingDurations.length > 0) {
              // Iterate backwards to avoid index issues when deleting
              for (let i = existingData.bloomingDurations.length - 1; i >= 0; i--) {
                const duration = existingData.bloomingDurations[i];
                realm.delete(duration);
              }
            }
            // Add new durations - create Realm objects
            const durations = fields.bloomingDurations as any[];
            durations.forEach(duration => {
              const realmDuration = realm.create('BloomingDuration', {
                id: duration.id,
                startedOn: duration.startedOn || null,
                endsOn: duration.endsOn || null,
              });
              existingData.bloomingDurations.push(realmDuration);
            });
            delete fields.bloomingDurations;
          }
          
          if (fields.selectedPhotos) {
            // Safely clear and update
            if (existingData.selectedPhotos && typeof existingData.selectedPhotos.clear === 'function') {
              existingData.selectedPhotos.clear();
            } else {
              // Fallback: remove items manually
              while (existingData.selectedPhotos.length > 0) {
                existingData.selectedPhotos.pop();
              }
            }
            fields.selectedPhotos.forEach(photo => {
              existingData.selectedPhotos.push(photo);
            });
            delete fields.selectedPhotos;
          }
          
          if (fields.selectedFertilizers) {
            if (existingData.selectedFertilizers && typeof existingData.selectedFertilizers.clear === 'function') {
              existingData.selectedFertilizers.clear();
            } else {
              while (existingData.selectedFertilizers.length > 0) {
                existingData.selectedFertilizers.pop();
              }
            }
            fields.selectedFertilizers.forEach(fertilizer => {
              existingData.selectedFertilizers.push(fertilizer);
            });
            delete fields.selectedFertilizers;
          }
          
          if (fields.selectedPesticides) {
            if (existingData.selectedPesticides && typeof existingData.selectedPesticides.clear === 'function') {
              existingData.selectedPesticides.clear();
            } else {
              while (existingData.selectedPesticides.length > 0) {
                existingData.selectedPesticides.pop();
              }
            }
            fields.selectedPesticides.forEach(pesticide => {
              existingData.selectedPesticides.push(pesticide);
            });
            delete fields.selectedPesticides;
          }
          
          if (fields.selectedRisks) {
            if (existingData.selectedRisks && typeof existingData.selectedRisks.clear === 'function') {
              existingData.selectedRisks.clear();
            } else {
              while (existingData.selectedRisks.length > 0) {
                existingData.selectedRisks.pop();
              }
            }
            fields.selectedRisks.forEach(risk => {
              existingData.selectedRisks.push(risk);
            });
            delete fields.selectedRisks;
          }
          
          if (fields.selectedBeeBoxPhotos) {
            if (existingData.selectedBeeBoxPhotos && typeof existingData.selectedBeeBoxPhotos.clear === 'function') {
              existingData.selectedBeeBoxPhotos.clear();
            } else {
              while (existingData.selectedBeeBoxPhotos.length > 0) {
                existingData.selectedBeeBoxPhotos.pop();
              }
            }
            fields.selectedBeeBoxPhotos.forEach(photo => {
              existingData.selectedBeeBoxPhotos.push(photo);
            });
            delete fields.selectedBeeBoxPhotos;
          }
          
          // Update other fields
          Object.assign(existingData, {
            ...fields,
            updatedAt: new Date(),
          });
        } else {
          // Create new if doesn't exist
          // Note: We can't call saveOrUpdateFarmerData here as we're already in a write transaction
          // So we'll create the object directly
          const createData: any = {
            ...fields,
            createdAt: new Date(),
            updatedAt: new Date(),
          };
          
          // Handle blooming durations
          const bloomingDurationsData = fields.bloomingDurations;
          if (bloomingDurationsData) {
            delete createData.bloomingDurations;
          }
          
          const farmerData = realm.create<FarmerDataSchema>('FarmerData', createData);
          
          // Populate arrays
          if (bloomingDurationsData) {
            const durations = bloomingDurationsData as any[];
            durations.forEach(duration => {
              const realmDuration = realm.create('BloomingDuration', {
                id: duration.id,
                startedOn: duration.startedOn || null,
                endsOn: duration.endsOn || null,
              });
              farmerData.bloomingDurations.push(realmDuration);
            });
          }
          
          if (fields.selectedPhotos) {
            (fields.selectedPhotos as string[]).forEach(photo => {
              farmerData.selectedPhotos.push(photo);
            });
          }
          if (fields.selectedFertilizers) {
            (fields.selectedFertilizers as string[]).forEach(fertilizer => {
              farmerData.selectedFertilizers.push(fertilizer);
            });
          }
          if (fields.selectedPesticides) {
            (fields.selectedPesticides as string[]).forEach(pesticide => {
              farmerData.selectedPesticides.push(pesticide);
            });
          }
          if (fields.selectedRisks) {
            (fields.selectedRisks as string[]).forEach(risk => {
              farmerData.selectedRisks.push(risk);
            });
          }
          if (fields.selectedBeeBoxPhotos) {
            (fields.selectedBeeBoxPhotos as string[]).forEach(photo => {
              farmerData.selectedBeeBoxPhotos.push(photo);
            });
          }
        }
      });
    } catch (error) {
      console.error('Error updating farmer data:', error);
      throw error;
    }
  }
}

// Export singleton instance helper
export const getFarmerDataService = async (): Promise<FarmerDataService> => {
  const realm = await getRealm();
  return new FarmerDataService(realm);
};

