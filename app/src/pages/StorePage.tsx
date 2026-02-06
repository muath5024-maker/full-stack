import { useEffect } from 'react';
import { useSubdomain } from '@/hooks/use-subdomain';
import { Spinner } from '@/components/ui/spinner';
import { AlertCircle, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { navigateToMainSite } from '@/utils/subdomain';

/**
 * صفحة المتجر الفرعي
 * تظهر عندما يزور المستخدم store1.mbuy.pro
 */
const StorePage = () => {
  const { storeName, storeData, loading, error } = useSubdomain();

  useEffect(() => {
    if (storeData) {
      // تحديث عنوان الصفحة
      document.title = storeData.name || `متجر ${storeName}`;
    }
  }, [storeData, storeName]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-brand-dark flex items-center justify-center">
        <div className="text-center">
          <Spinner className="w-12 h-12 text-brand-blue mx-auto mb-4" />
          <p className="text-white/60">جاري تحميل المتجر...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !storeData) {
    return (
      <div className="min-h-screen bg-brand-dark flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">
            المتجر غير موجود
          </h1>
          <p className="text-white/60 mb-6">
            عذراً، المتجر "{storeName}" غير موجود أو تم حذفه.
          </p>
          <Button onClick={navigateToMainSite} className="gap-2">
            <Home className="w-4 h-4" />
            العودة للصفحة الرئيسية
          </Button>
        </div>
      </div>
    );
  }

  // Store page content
  return (
    <div className="min-h-screen bg-brand-dark text-white">
      {/* Store Header */}
      <header className="border-b border-white/10 bg-brand-dark/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="px-6 sm:px-8 lg:px-16 py-4">
          <div className="flex items-center justify-between">
            {/* Store Logo & Name */}
            <div className="flex items-center gap-3">
              {storeData.logo ? (
                <img
                  src={storeData.logo}
                  alt={storeData.name}
                  className="w-12 h-12 rounded-lg object-cover"
                />
              ) : (
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-brand-blue to-brand-orange flex items-center justify-center">
                  <span className="text-white font-bold text-xl">
                    {storeData.name?.charAt(0) || 'M'}
                  </span>
                </div>
              )}
              <div>
                <h1 className="text-xl font-bold">{storeData.name}</h1>
                <p className="text-sm text-white/60">{storeName}.mbuy.pro</p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex gap-4">
              <a href="#products" className="text-white/70 hover:text-white transition">
                المنتجات
              </a>
              <a href="#about" className="text-white/70 hover:text-white transition">
                عن المتجر
              </a>
              <a href="#contact" className="text-white/70 hover:text-white transition">
                تواصل معنا
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Store Content */}
      <main className="px-6 sm:px-8 lg:px-16 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Store Banner */}
          {storeData.banner && (
            <div className="rounded-2xl overflow-hidden mb-12">
              <img
                src={storeData.banner}
                alt={storeData.name}
                className="w-full h-64 object-cover"
              />
            </div>
          )}

          {/* Store Description */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-4">مرحباً بك في {storeData.name}</h2>
            <p className="text-white/70 text-lg leading-relaxed">
              {storeData.description || 'متجر إلكتروني متخصص في تقديم أفضل المنتجات والخدمات'}
            </p>
          </div>

          {/* Products Grid */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6">المنتجات</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {/* TODO: عرض المنتجات من storeData.products */}
              <div className="rounded-xl glass p-6 text-center">
                <p className="text-white/60">لا توجد منتجات حالياً</p>
              </div>
            </div>
          </div>

          {/* Store Info */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="rounded-xl glass p-6">
              <h4 className="font-semibold mb-2">العنوان</h4>
              <p className="text-white/60">
                {storeData.address || 'غير محدد'}
              </p>
            </div>
            <div className="rounded-xl glass p-6">
              <h4 className="font-semibold mb-2">الهاتف</h4>
              <p className="text-white/60">
                {storeData.phone || 'غير محدد'}
              </p>
            </div>
            <div className="rounded-xl glass p-6">
              <h4 className="font-semibold mb-2">البريد الإلكتروني</h4>
              <p className="text-white/60">
                {storeData.email || 'غير محدد'}
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 mt-12">
        <div className="px-6 sm:px-8 lg:px-16">
          <div className="text-center text-white/60">
            <p>مدعوم من <a href="https://mbuy.pro" className="text-brand-blue hover:underline">mbuy</a></p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default StorePage;
