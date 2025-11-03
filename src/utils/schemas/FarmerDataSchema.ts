import Realm from 'realm';

// Blooming Duration Schema
export class BloomingDurationSchema extends Realm.Object {
  static schema = {
    name: 'BloomingDuration',
    properties: {
      id: 'int',
      startedOn: 'date?',
      endsOn: 'date?',
    },
    primaryKey: 'id',
  };

  id!: number;
  startedOn?: Date;
  endsOn?: Date;
}

// Main Farmer Data Schema
export class FarmerDataSchema extends Realm.Object {
  static schema = {
    name: 'FarmerData',
    properties: {
      _id: {type: 'objectId', default: () => new Realm.BSON.ObjectId()},
      createdAt: {type: 'date', default: () => new Date()},
      updatedAt: {type: 'date', default: () => new Date()},
      // Farmer Home Data
      fullName: 'string?',
      contactNumber: 'string?',
      gender: 'string?',
      locationState: 'string?',
      locationVillage: 'string?',
      locationBlockName: 'string?',
      locationStreetName: 'string?',
      locationPlotNumber: 'string?',
      // Land Details Data
      areaValue: 'string?',
      unitOfArea: 'string?',
      landHolding: 'string?',
      geotagData: 'string?', // Can store geotag info as JSON string
      // Crop Details Data
      flower1: 'string?',
      flowerTypes: 'string?',
      hybridCropVariety: 'string?',
      bloomingDurations: 'BloomingDuration[]',
      currentAreaOfFlowering: 'string?',
      selectedPhotos: 'string[]', // Array of photo URIs
      // Flower Details Data
      beePollination: 'string?',
      usedBees: 'string?',
      beeExperience: 'string?',
      whatWentWrong: 'string?',
      willingToPay: 'string?',
      // Beekeeping Details Data
      fertilizers: 'string?',
      selectedFertilizers: 'string[]',
      pesticides: 'string?',
      selectedPesticides: 'string[]',
      selectedRisks: 'string[]',
      selectedBeeBoxPhotos: 'string[]',
      sendConsentForm: {type: 'bool', default: true},
    },
    primaryKey: '_id',
  };

  _id!: Realm.BSON.ObjectId;
  createdAt!: Date;
  updatedAt!: Date;
  
  // Farmer Home
  fullName?: string;
  contactNumber?: string;
  gender?: string;
  locationState?: string;
  locationVillage?: string;
  locationBlockName?: string;
  locationStreetName?: string;
  locationPlotNumber?: string;
  
  // Land Details
  areaValue?: string;
  unitOfArea?: string;
  landHolding?: string;
  geotagData?: string;
  
  // Crop Details
  flower1?: string;
  flowerTypes?: string;
  hybridCropVariety?: string;
  bloomingDurations!: Realm.List<BloomingDurationSchema>;
  currentAreaOfFlowering?: string;
  selectedPhotos!: Realm.List<string>;
  
  // Flower Details
  beePollination?: string;
  usedBees?: string;
  beeExperience?: string;
  whatWentWrong?: string;
  willingToPay?: string;
  
  // Beekeeping Details
  fertilizers?: string;
  selectedFertilizers!: Realm.List<string>;
  pesticides?: string;
  selectedPesticides!: Realm.List<string>;
  selectedRisks!: Realm.List<string>;
  selectedBeeBoxPhotos!: Realm.List<string>;
  sendConsentForm!: boolean;
}


