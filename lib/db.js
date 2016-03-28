import { MongoClient } from 'mongodb';

// Setup for mongodb
/*
Create two collections:
counter,
links,

insert into counter collection initial counter values:
{
  obj: 'counter',
  seq: 0
}
That's it!
*/

export default function database(config) {
  const url = config.mongodb.url;
  const linksCollectionName = config.mongodb.linksCollection;
  const counterCollectionName = config.mongodb.counterCollection;
  let linksCollection;
  let counterCollection;

  const getlinksCollection = () =>
    new Promise((accept, reject) => {
      if (linksCollection) {
        accept(linksCollection);
      } else {
        MongoClient.connect(url, (err, db) => {
          if (err) {
            reject(err);
          } else {
            linksCollection = db.collection(linksCollectionName);
            accept(linksCollection);
          }
        });
      }
    });
  const getCounterCollection = () =>
    new Promise((accept, reject) => {
      if (counterCollection) {
        accept(counterCollection);
      } else {
        MongoClient.connect(url, (err, db) => {
          if (err) {
            reject(err);
          } else {
            counterCollection = db.collection(counterCollectionName);
            accept(counterCollection);
          }
        });
      }
    });
  const fromMongo = (item) => {
    let result = item;
    if (Array.isArray(item) && item.length) {
      result = item[0];
    }
    result.id = result._id;
    delete result._id;
    return result;
  };
  const incrementCounter = (collection, sort = []) =>
    new Promise((accept, reject) => {
      const criteria = { obj: 'counter' };
      const updateOptions = { $inc: { seq: 1 } };
      collection.findAndModify(
        criteria,
        sort,
        updateOptions,
        { new: true },
        (updateError, updatedDoc) => {
          if (updateError) {
            reject(updateError);
          } else {
            const id = updatedDoc.value.seq;
            accept(id);
          }
        });
    });
  const genericCreate = (collection, data) =>
    new Promise((accept, reject) => {
      collection.insert(data, { w: 1 }, (err, result) => {
        if (err) {
          reject(err);
        } else {
          const actualResults = fromMongo(result.ops);
          accept(actualResults);
        }
      });
    });
  const genericFind = (collection, query) =>
    new Promise((accept, reject) => {
      collection.findOne(query, (err, result) => {
        if (err) {
          reject(err);
        } else if (!result) {
          reject({
            code: 404,
            message: 'Not found',
          });
        } else {
          accept(fromMongo(result));
        }
      });
    });
  const getUniqueIdAsync = async () => {
    const collection = await getCounterCollection();
    const uniqueId = await incrementCounter(collection);
    return uniqueId;
  };
  const saveLinkDataAsync = async (data) => {
    const collection = await getlinksCollection();
    const linkData = await genericCreate(collection, data);
    const encodedUrl = linkData.encodedUrl;
    const actualUrl = linkData.actualUrl;
    return {
      encodedUrl,
      actualUrl,
    };
  };
  const getActualUrlFromUniqueIdAsync = async (uniqueId) => {
    const collection = await getlinksCollection();
    const urlDoc = await genericFind(collection, { uniqueId });
    return urlDoc.actualUrl;
  };

  return {
    getUniqueIdAsync,
    saveLinkDataAsync,
    getActualUrlFromUniqueIdAsync,
  };
}
