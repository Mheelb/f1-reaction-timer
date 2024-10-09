import Timer, { ITimer } from '../models/Timer';

export class TimerService {
    
    static async getAllTimers(): Promise<ITimer[]> {
        return await Timer.find().exec();
    }

    static async getBestTimers(range: number): Promise<ITimer[]> {
        return await Timer.find().sort({ time: 1 }).limit(range).exec();
    }

    static async getBestTimer(): Promise<ITimer | null> {
        return await Timer.findOne().sort({ time: 1 }).exec();
    }

    static async getTimerByUserId(userId: string, sortBy: string, order: string, limit: number): Promise<ITimer[]> {
        return await Timer.find({ user_id: userId })
            .sort({ [sortBy]: order === 'desc' ? -1 : 1 })
            .limit(limit)
            .exec();
    }

    static async getBestTimerByUserId(userId: string): Promise<ITimer | null> {
        return await Timer.findOne({ user_id: userId }).sort({ time: 1 }).exec();
    }

    static async submitTimer(user_id: string, time: number): Promise<string> {
        const timer = new Timer({ user_id, time });
        await timer.save();
        return 'Temps de réaction soumis avec succès';
    }
}