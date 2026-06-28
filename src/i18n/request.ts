import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => {
  const currentLocale = locale || 'ar';
  
  return {
    locale: currentLocale,
    messages: (await import(`../../public/locales/${currentLocale}.json`)).default
  };
});