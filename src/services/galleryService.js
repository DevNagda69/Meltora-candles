// Gallery Service - Manages Instagram gallery images in Firebase
import { db, storage } from './firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { dataCache } from './dataCache';

const GALLERY_COLLECTION = 'gallery';

// Upload a new gallery image
export const uploadGalleryImage = async (file) => {
    try {
        // Create a unique filename
        const timestamp = Date.now();
        const filename = `gallery/${timestamp}_${file.name}`;
        const storageRef = ref(storage, filename);

        // Upload file to Firebase Storage
        await uploadBytes(storageRef, file);
        const imageUrl = await getDownloadURL(storageRef);

        // Save metadata to Firestore
        const docRef = await addDoc(collection(db, GALLERY_COLLECTION), {
            imageUrl,
            storagePath: filename,
            createdAt: new Date().toISOString(),
        });

        dataCache.invalidate('gallery');
        return { id: docRef.id, imageUrl, storagePath: filename };
    } catch (error) {
        console.error('Error uploading gallery image:', error);
        throw error;
    }
};

// Get all gallery images
export const getGalleryImages = async () => {
    try {
        const cached = dataCache.get('gallery');
        if (cached) return cached;

        const q = query(collection(db, GALLERY_COLLECTION), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);

        const images = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        dataCache.set('gallery', images);
        return images;
    } catch (error) {
        console.error('Error fetching gallery images:', error);
        throw error;
    }
};

// Delete a gallery image
export const deleteGalleryImage = async (imageId, storagePath) => {
    try {
        // Delete from Firestore
        await deleteDoc(doc(db, GALLERY_COLLECTION, imageId));

        // Delete from Storage
        const storageRef = ref(storage, storagePath);
        await deleteObject(storageRef);

        return true;
    } catch (error) {
        console.error('Error deleting gallery image:', error);
        throw error;
    }
};
