import { useState, useEffect } from 'react'; 
import { fetchImageList } from './services/Api';
import { Searchbar } from './components/Searchbar';
import { ImageGallery } from './components/ImageGallery/';
import { Button } from './components/Button';
import { Loader } from './components/Loader';

export const App = () => {
  const [gallery, setGallery] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [pageNum, setPageNum] = useState(1);
  const [hitsQuantity, setHitsQuantity] = useState(0);
  const [totalHits, setTotalHits] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!searchQuery) return;
    (async function () {
      try {
        setLoading(true);
        const { hits, totalHits } = await fetchImageList(searchQuery, pageNum);
        setGallery((state: any[]) => [...state, ...hits]);
        setTotalHits(totalHits);
        setHitsQuantity(state => state + hits.length);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [pageNum, searchQuery]);

  const changeSearchQuery = (text: string): void => {
    if (text.trim() === searchQuery) return;
    setSearchQuery(text);
    resetIfNewQuery();
  };

  const changeSearchPage = (page: number) => setPageNum(page + 1);

  const resetIfNewQuery = () => {
    setGallery([]);
    setPageNum(1);
    setHitsQuantity(0);
  };

  return (
    <>
      <Searchbar onSubmit={changeSearchQuery} />
      <ImageGallery galleryList={gallery} />
      {loading && <Loader />}
      {hitsQuantity < totalHits && !loading && (
        <Button currPage={pageNum} onClick={changeSearchPage} />
      )}
    </>
  );
};

