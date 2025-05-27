// utils.js
export const openWhatsAppChat = (phoneNumber, text = '') => {
  const defaultCountryCode = '91';
  let cleanedNumber = phoneNumber.replace(/\D/g, ''); // removes + and non-digits
  if (cleanedNumber.length == 10) {
    cleanedNumber = defaultCountryCode + cleanedNumber;
  }
  const encodedText = encodeURIComponent(text);
  const url =
    text !== ''
      ? `https://api.whatsapp.com/send/?phone=${cleanedNumber}&text=${encodedText}&type=phone_number&app_absent=0`
      : `https://wa.me/${cleanedNumber}`;
  window.open(url, '_blank');
};

// export const openWhatsAppChat = (phoneNumber, text = '') => {
//   const cleanedNumber = phoneNumber.replace(/\D/g, ''); // removes + and non-digits
//   const encodedText = encodeURIComponent(text);
//   const url = text
//     ? `https://wa.me/${cleanedNumber}?text=${encodedText}`
//     : `https://wa.me/${cleanedNumber}`;
//   window.location.href = url;
// };

export const initiateAudioCall = (phoneNumber) => {
  const audioCallUrl = `tel:+91${phoneNumber}`;
  window.location.href = audioCallUrl;
};

export const getDateTimeString = (order) => {
  const dbDate = order?.updatedAt;
  if (dbDate) {
    const dateObj = new Date(dbDate);
    const localeOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    };
    const [day, month, year] = dateObj
      .toLocaleDateString('en-IN', localeOptions)
      .split('/');

    // Format as YYYY-MM-DD
    const formattedDate = `${day}/${month}/${year}`;
    const time = dateObj.toLocaleTimeString();
    return formattedDate + ' @ ' + time;
  } else return '';
};

export const isLocalStorageAvailable = () => {
  try {
    // Try to access localStorage
    const testKey = '__test_local_storage_availability__';
    localStorage.setItem(testKey, 'test');
    localStorage.removeItem(testKey);
    return true; // localStorage is available
  } catch (error) {
    return false; // localStorage is not available
  }
};

export const stripHtml = (html) => {
  return html?.replace(/<[^>]*>?/gm, '');
};
