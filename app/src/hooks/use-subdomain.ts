import { useEffect, useState } from 'react';
import { getSubdomainInfo, fetchStoreData } from '@/utils/subdomain';

/**
 * Hook للتعامل مع الدومينات الفرعية
 */
export function useSubdomain() {
  const [subdomainInfo, setSubdomainInfo] = useState(getSubdomainInfo());
  const [storeData, setStoreData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const info = getSubdomainInfo();
    setSubdomainInfo(info);

    // إذا كان دومين متجر، جلب البيانات
    if (info.isSubdomain && info.storeName) {
      setLoading(true);
      fetchStoreData(info.storeName)
        .then((data) => {
          if (data) {
            setStoreData(data);
            setError(null);
          } else {
            setError('المتجر غير موجود');
          }
        })
        .catch((err) => {
          setError('خطأ في تحميل بيانات المتجر');
          console.error(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, []);

  return {
    ...subdomainInfo,
    storeData,
    loading,
    error,
  };
}
