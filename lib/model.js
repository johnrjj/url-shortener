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
