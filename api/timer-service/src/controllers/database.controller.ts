// src/controllers/databaseController.ts
import mongoose from 'mongoose';

export const connectDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string, {});
    console.log("MongoDB connecté !");
  } catch (err) {
    console.log("Erreur de connexion à MongoDB :", err);
  }
};