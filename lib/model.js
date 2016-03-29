import { encode, decode } from 'base62';

export default function model(db) {
  const getActualUrlFromEncodedUrlAsync = async (shorturl) => {
    const uniqueId = decode(shorturl);
    const actualUrl = await db.getActualUrlFromUniqueIdAsync(uniqueId);
    return actualUrl;
  };
  const saveLinkAsync = async (uniqueId, encodedUrl, actualUrl) => {
    const savedLinkData = await db.saveLinkDataAsync({ uniqueId, encodedUrl, actualUrl });
    return savedLinkData;
  };
  const shortenUrlAsync = async (actualUrl) => {
    const uniqueId = await db.getUniqueIdAsync();
    const encodedUniqueId = encode(uniqueId);
    const savedLinkData = await saveLinkAsync(uniqueId, encodedUniqueId, actualUrl);
    return savedLinkData.encodedUrl;
  };
  
  return {
    shortenUrlAsync,
    getActualUrlFromEncodedUrlAsync,
  };
}

/* todo: regex to validate urls:
/^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i
*/
