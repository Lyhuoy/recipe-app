import React from 'react';
import { MMKV } from 'react-native-mmkv';

export const storage = new MMKV();

export const useImageCache = () => {
  const [cache, setCache] = React.useState<string[]>([]);
  const [isFetching, setIsFetching] = React.useState<boolean>(true);
  React.useEffect(() => {
    const fetchCache = async () => {
      const cache = storage.getString('cache');
      if (cache) {
        setCache(JSON.parse(cache));
      }
      setIsFetching(false);
    };
    fetchCache();
  }, []);
  const addCache = (uri: string) => {
    const newCache = [...cache, uri];
    storage.set('cache', JSON.stringify(newCache));
    setCache(newCache);
  };
  return { cache, isFetching, addCache };
};
