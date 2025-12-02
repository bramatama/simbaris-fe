import { useState, useEffect, useCallback } from 'react';

/**
 * HOOK 1: useFetch
 * Digunakan untuk mengambil data otomatis saat komponen di-load (GET).
 * * @param {Function} apiFunc - Fungsi dari service (misal: registrationService.getStats)
 * @param {Array} args - Argument yang dibutuhkan fungsi (misal: [id])
 * @param {Array} deps - Dependency array untuk useEffect (kapan harus fetch ulang)
 */
export const useFetch = (apiFunc, args = [], deps = []) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            // Panggil fungsi service dengan argument yang diberikan (spread operator)
            const result = await apiFunc(...args);
            setData(result);
        } catch (err) {
            console.error('useFetch Error:', err);
            setError(
                err.messages ||
                    err.detail ||
                    'Terjadi kesalahan saat memuat data.'
            );
        } finally {
            setLoading(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps); // Re-create function jika deps berubah

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // Kembalikan data, status, dan fungsi refetch (misal untuk tombol refresh manual)
    return { data, loading, error, refetch: fetchData };
};

/**
 * HOOK 2: useAction
 * Digunakan untuk aksi manual seperti Submit Form, Update Status, Delete (POST/PATCH/DELETE).
 * Tidak jalan otomatis, harus dipanggil via fungsi 'execute'.
 * * @param {Function} apiFunc - Fungsi dari service
 */
export const useAction = (apiFunc) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fungsi wrapper untuk memanggil API
    const execute = async (...args) => {
        setLoading(true);
        setError(null);
        try {
            const result = await apiFunc(...args);
            setData(result);
            return { success: true, data: result };
        } catch (err) {
            console.error('useAction Error:', err);
            const errorMessage =
                err.messages || err.detail || 'Terjadi kesalahan proses.';
            setError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    return {
        execute,
        data,
        loading,
        error,
        reset: () => {
            setData(null);
            setError(null);
        },
    };
};
