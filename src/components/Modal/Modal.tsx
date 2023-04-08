import { useEffect, FC } from 'react';
import { createPortal } from 'react-dom';
import { ModalBackdrop, ModalWrap } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root')!;

type OnClose = () => void

interface IModalProps {
  onClose: OnClose;
  src: string;
  alt: string;
}

export const Modal: FC<IModalProps> = ({ onClose, src, alt }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.querySelector('body')?.classList.add('hidden');

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.querySelector('body')?.classList.remove('hidden');
    };
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget === e.target) onClose();
  };

  return createPortal(
    <ModalBackdrop onClick={(e: React.MouseEvent<HTMLDivElement>) => handleBackdropClick(e)}>
      <ModalWrap>
        <img src={src} alt={alt} />
      </ModalWrap>
    </ModalBackdrop>,
    modalRoot
  );
};
