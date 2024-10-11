import { Schema, model, Document, Types } from 'mongoose';

export interface ITimer extends Document {
  user_id: Types.ObjectId;
  time: number;
  submittedAt: Date;
}

const timerSchema = new Schema<ITimer>({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  time: { type: Number, required: true },
  submittedAt: { type: Date, default: Date.now, required: true }
});

const Timer = model<ITimer>('Timer', timerSchema);

export default Timer;