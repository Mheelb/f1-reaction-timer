import User, { IUser } from '../models/User';
import { comparePassword } from '../utils/passwordUtils';
import { generateToken } from '../utils/tokenUtils';

export class UserService {
    static async getAllUsers(): Promise<{users: IUser[], message: string | null}> {
        const users = await User.find();
        let message = null;
        if (!users.length) {
            message = 'Aucun utilisateur trouvé';
        }
        return {users, message};
    }

    static async getUserById(id: string): Promise<{ user: IUser | null, message: string | null}> {
        const user = await User.findById(id);
        let message = null;
        if (!user) {
            message = 'Utilisateur non trouvé';
        }
        return {user, message};
    }

    static async removeUser(id: string): Promise<string> {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            throw new Error('Utilisateur non trouvé');
        }
        return 'Utilisateur supprimé avec succès';
    }
}