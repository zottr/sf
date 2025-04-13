// utils.js
export const openWhatsAppChat = (phoneNumber) => {
  const whatsappUrl = `https://wa.me/+91${phoneNumber}`;
  window.location.href = whatsappUrl;
};

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

export const stripHtml = (html) => {
  return html?.replace(/<[^>]*>?/gm, '');
};
