import Timer, { ITimer } from '../models/Timer';

export class TimerService {
    
    static async getTimers(userId?: string, sortBy: string = 'time', order: string = 'asc', limit: number = 10): Promise<ITimer[]> {
        const query = userId ? { user_id: userId } : {};
        return await Timer.find(query)
            .sort({ [sortBy]: order === 'desc' ? -1 : 1 })
            .limit(limit)
            .exec();
    }

    static async getBestTimers(range: number, userId?: string): Promise<ITimer[]> {
        const query = userId ? { user_id: userId } : {};
        return await Timer.find(query).sort({ time: 1 }).limit(range).exec();
    }

    static async getBestTimer(userId?: string): Promise<ITimer | null> {
        if (userId) {
            return await Timer.findOne({ user_id: userId }).sort({ time: 1 }).exec();
        } else {
            return await Timer.findOne().sort({ time: 1 }).exec();
        }
    }

    static async submitTimer(user_id: string, time: number): Promise<string> {
        const timer = new Timer({ user_id, time });
        await timer.save();
        return 'Temps de réaction soumis avec succès';
    }
}