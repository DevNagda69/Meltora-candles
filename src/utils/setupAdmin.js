import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../services/firebase';

/**
 * One-time admin account setup utility
 * Run this once to create the admin account
 */
export const createAdminAccount = async () => {
    const ADMIN_EMAIL = 'admin@meltora.com';
    const ADMIN_PASSWORD = 'Meltora@2026'; // Change this to your preferred password

    try {
        // Create admin user in Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            ADMIN_EMAIL,
            ADMIN_PASSWORD
        );

        // Create admin user document in Firestore
        await setDoc(doc(db, 'users', userCredential.user.uid), {
            name: 'Admin',
            email: ADMIN_EMAIL,
            role: 'admin',
            createdAt: new Date(),
        });

        console.log('✅ Admin account created successfully!');
        console.log('Email:', ADMIN_EMAIL);
        console.log('Password:', ADMIN_PASSWORD);

        return {
            success: true,
            email: ADMIN_EMAIL,
            password: ADMIN_PASSWORD
        };
    } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
            console.log('⚠️ Admin account already exists');
            console.log('Email:', ADMIN_EMAIL);
            console.log('Password:', ADMIN_PASSWORD);
            return {
                success: true,
                email: ADMIN_EMAIL,
                password: ADMIN_PASSWORD,
                message: 'Account already exists'
            };
        }
        console.error('❌ Error creating admin account:', error);
        throw error;
    }
};
