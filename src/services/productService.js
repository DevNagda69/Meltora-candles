import {
    collection,
    getDocs,
    getDoc,
    addDoc,
    deleteDoc,
    doc,
    updateDoc,
    serverTimestamp,
    query,
    where,
    limit,
    orderBy
} from 'firebase/firestore';
import {
    ref,
    uploadBytes,
    getDownloadURL
} from 'firebase/storage';
import { db, storage } from './firebase';

const COLLECTION_NAME = 'products';

export const getProducts = async () => {
    const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
    return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
};

export const getProduct = async (productId) => {
    const docRef = doc(db, COLLECTION_NAME, productId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
    } else {
        throw new Error("Product not found");
    }
};

export const getProductsByCollection = async (collectionName) => {
    const q = query(
        collection(db, COLLECTION_NAME),
        where("collection", "==", collectionName)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
};

export const getLatestProducts = async (count = 4) => {
    const q = query(
        collection(db, COLLECTION_NAME),
        orderBy("createdAt", "desc"),
        limit(count)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
};

export const addProduct = async (productData, imageFile) => {
    let imageUrl = '';

    if (imageFile) {
        const storageRef = ref(storage, `products/${Date.now()}_${imageFile.name}`);
        const uploadResult = await uploadBytes(storageRef, imageFile);
        imageUrl = await getDownloadURL(uploadResult.ref);
    }

    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
        ...productData,
        image: imageUrl,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
    });

    return { id: docRef.id, ...productData, image: imageUrl };
};

export const deleteProduct = async (productId) => {
    await deleteDoc(doc(db, COLLECTION_NAME, productId));
};

export const updateProduct = async (productId, updates, imageFile) => {
    let imageUrl = updates.image;

    if (imageFile) {
        const storageRef = ref(storage, `products/${Date.now()}_${imageFile.name}`);
        const uploadResult = await uploadBytes(storageRef, imageFile);
        imageUrl = await getDownloadURL(uploadResult.ref);
    }

    const docRef = doc(db, COLLECTION_NAME, productId);
    await updateDoc(docRef, {
        ...updates,
        image: imageUrl,
        updatedAt: serverTimestamp()
    });
};
