/**
 * Subdomain utility functions
 * التعامل مع الدومينات الفرعية الديناميكية
 */

export interface SubdomainInfo {
  isSubdomain: boolean;
  subdomain: string | null;
  storeName: string | null;
  isMainDomain: boolean;
  fullDomain: string;
}

/**
 * استخراج معلومات الدومين الفرعي من URL
 */
export function getSubdomainInfo(): SubdomainInfo {
  const hostname = window.location.hostname;
  const parts = hostname.split('.');

  // تطوير محلي
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    // يمكن اختبار باستخدام: localhost:5173?store=ahmed
    const urlParams = new URLSearchParams(window.location.search);
    const storeParam = urlParams.get('store');
    
    return {
      isSubdomain: !!storeParam,
      subdomain: storeParam,
      storeName: storeParam,
      isMainDomain: !storeParam,
      fullDomain: hostname,
    };
  }

  // دومين Cloudflare Pages (mbuy-website.pages.dev أو mbuy.pages.dev)
  // يعتبر دومين رئيسي
  if (hostname.includes('.pages.dev')) {
    return {
      isSubdomain: false,
      subdomain: null,
      storeName: null,
      isMainDomain: true,
      fullDomain: hostname,
    };
  }

  // الدومين الرئيسي: mbuy.pro
  if (hostname === 'mbuy.pro' || parts.length === 2) {
    return {
      isSubdomain: false,
      subdomain: null,
      storeName: null,
      isMainDomain: true,
      fullDomain: hostname,
    };
  }

  // دومين فرعي: store1.mbuy.pro أو dashboard.mbuy.pro
  if (parts.length >= 3) {
    const subdomain = parts[0];
    
    // استثناءات (دومينات خاصة - ليست متاجر)
    const specialSubdomains = ['www', 'dashboard', 'admin', 'api', 'app'];
    
    if (specialSubdomains.includes(subdomain)) {
      return {
        isSubdomain: false,
        subdomain,
        storeName: null,
        isMainDomain: subdomain === 'www',
        fullDomain: hostname,
      };
    }

    // دومين متجر
    return {
      isSubdomain: true,
      subdomain,
      storeName: subdomain,
      isMainDomain: false,
      fullDomain: hostname,
    };
  }

  return {
    isSubdomain: false,
    subdomain: null,
    storeName: null,
    isMainDomain: true,
    fullDomain: hostname,
  };
}

/**
 * جلب بيانات المتجر من API
 */
export async function fetchStoreData(storeName: string) {
  try {
    // استبدل هذا بـ API الخاص بك
    const response = await fetch(`https://api.mbuy.pro/stores/${storeName}`);
    
    if (!response.ok) {
      throw new Error('Store not found');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching store data:', error);
    return null;
  }
}

/**
 * التحقق من صلاحية اسم المتجر
 */
export function isValidStoreName(name: string): boolean {
  // فقط أحرف، أرقام، وشرطة
  const pattern = /^[a-z0-9-]+$/;
  
  // الطول بين 3-30 حرف
  if (name.length < 3 || name.length > 30) {
    return false;
  }

  return pattern.test(name);
}

/**
 * توليد رابط المتجر
 */
export function generateStoreUrl(storeName: string): string {
  const isDev = import.meta.env.DEV;
  
  if (isDev) {
    return `http://localhost:5173?store=${storeName}`;
  }

  return `https://${storeName}.mbuy.pro`;
}

/**
 * الانتقال لصفحة المتجر
 */
export function navigateToStore(storeName: string) {
  const url = generateStoreUrl(storeName);
  window.location.href = url;
}

/**
 * الانتقال للدومين الرئيسي
 */
export function navigateToMainSite() {
  const isDev = import.meta.env.DEV;
  
  if (isDev) {
    window.location.href = 'http://localhost:5173';
  } else {
    window.location.href = 'https://mbuy.pro';
  }
}
