import { Schema, model, Document, Types } from 'mongoose';

interface ITimer extends Document {
  user_id: Types.ObjectId;
  time: number;
}

const timerSchema = new Schema<ITimer>({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  time: { type: Number, required: true }
});

const Timer = model<ITimer>('Timer', timerSchema);

export default Timer;