import { FC } from 'react';
import { ImageGalleryItem } from '../ImageGalleryItem';
import { ImageList } from './ImageGallery.styled';

export const ImageGallery: FC<{galleryList: any[]}> = ({ galleryList }) => {
  return (
    <ImageList>
      {galleryList.map(item => {
        const { id, webformatURL, largeImageURL, tags } = item;
        
        return <ImageGalleryItem 
          key={id} 
          webformatURL={webformatURL} 
          largeImageURL={largeImageURL} 
          tags={tags} />
        })}
    </ImageList>
  );
};
