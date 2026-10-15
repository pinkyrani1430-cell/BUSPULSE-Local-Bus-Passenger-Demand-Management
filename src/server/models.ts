import mongoose, { Schema, Document } from 'mongoose';

export interface IBusStop {
  id: string;
  name: string;
  nameHi: string;
  nameKn: string;
  sequence: number;
}

export interface IBus extends Document {
  busNumber: string;
  routeName: string;
  routeNameHi?: string;
  routeNameKn?: string;
  capacity: number;
  stops: IBusStop[];
  active: boolean;
}

export interface IJourney extends Document {
  busId: string;
  busNumber: string;
  passengerName: string;
  fromStop: string;
  toStop: string;
  passengerCount: number;
  journeyDate: Date;
  createdAt: Date;
}

export interface IUser extends Document {
  name: string;
  role: 'passenger' | 'operator';
  createdAt: Date;
}

export const BusStopSchema = new Schema<IBusStop>({
  id: { type: String, required: true },
  name: { type: String, required: true },
  nameHi: { type: String, default: '' },
  nameKn: { type: String, default: '' },
  sequence: { type: Number, required: true },
}, { _id: false });

export const BusSchema = new Schema<IBus>({
  busNumber: { type: String, required: true, unique: true },
  routeName: { type: String, required: true },
  routeNameHi: { type: String, default: '' },
  routeNameKn: { type: String, default: '' },
  capacity: { type: Number, required: true, default: 60 },
  stops: [BusStopSchema],
  active: { type: Boolean, default: true },
}, { timestamps: true });

export const JourneySchema = new Schema<IJourney>({
  busId: { type: String, required: true, index: true },
  busNumber: { type: String, required: true },
  passengerName: { type: String, required: true },
  fromStop: { type: String, required: true },
  toStop: { type: String, required: true },
  passengerCount: { type: Number, required: true, min: 1, max: 15 },
  journeyDate: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

export const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  role: { type: String, enum: ['passenger', 'operator'], default: 'passenger' },
  createdAt: { type: Date, default: Date.now },
});

// Guard against model overwrite in hot reload / module evaluation
export const BusModel = mongoose.models.Bus || mongoose.model<IBus>('Bus', BusSchema);
export const JourneyModel = mongoose.models.Journey || mongoose.model<IJourney>('Journey', JourneySchema);
export const UserModel = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
