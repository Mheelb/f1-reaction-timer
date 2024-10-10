import User from '../models/User';
import { comparePassword } from '../utils/passwordUtils';
import { generateToken } from '../utils/tokenUtils';
import { loginSchema, registerSchema } from '../models/ValidationSchema';

export class AuthService {

    static async register(email: string, password: string, role: string): Promise<string> {
        const { error } = registerSchema.validate({ email, password, role });
        if (error) {
            throw new Error(error.details[0].message);
        }

        const user = new User({ email, password, role });
        await user.save();
        return 'Utilisateur enregistré avec succès';
    }

    static async login(email: string, password: string): Promise<{ message: string, token?: string }> {
        const { error } = loginSchema.validate({ email, password });
        if (error) {
            throw new Error(error.details[0].message);
        }

        const user = await User.findOne({ email }) as { _id: string, password: string };
        if (!user) {
            throw new Error('Email ou mot de passe incorrect');
        }

        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            throw new Error('Email ou mot de passe incorrect');
        }

        const token = generateToken(user._id.toString());
        return { message: 'Connexion réussie', token };
    }
}