/**
 * Simple in-memory cache for Firestore data
 * Prevents redundant fetches during the same session
 */

const cache = new Map();
const TTL = 5 * 60 * 1000; // 5 minutes

export const dataCache = {
    set: (key, data) => {
        cache.set(key, {
            data,
            timestamp: Date.now()
        });
    },

    get: (key) => {
        const entry = cache.get(key);
        if (!entry) return null;

        // Check if expired
        if (Date.now() - entry.timestamp > TTL) {
            cache.delete(key);
            return null;
        }

        return entry.data;
    },

    invalidate: (key) => {
        cache.delete(key);
    },

    clear: () => {
        cache.clear();
    }
};
