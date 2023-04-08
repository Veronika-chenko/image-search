import { useState, useEffect, FC } from 'react';
import { Modal } from '../Modal';
import { ImageCard } from './ImageGalleryItem.styled';

interface IGalleryItemProps {
  webformatURL: string;
  largeImageURL: string;
  tags: string;
}

export const ImageGalleryItem: FC<IGalleryItemProps> = ({ 
  webformatURL, 
  largeImageURL, 
  tags
}) => {
  const [showModal, setShowModal] = useState(false);
  const [srcModal, setSrcModal] = useState('');
  const [altModal, setAltModal] = useState('');

  useEffect(() => {
    setSrcModal(largeImageURL);
    setAltModal(tags);
  }, [largeImageURL, tags]);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <ImageCard>
      <img src={webformatURL} alt={tags} onClick={toggleModal} />
      {showModal && (
        <Modal onClose={toggleModal} src={srcModal} alt={altModal}></Modal>
      )}
    </ImageCard>
  );
};
