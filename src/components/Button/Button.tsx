import { useState, FC } from 'react';
import { LoadMoreButton } from './Button.styled';

type OnClick = (page: number) => void;

interface IButtonProps {
  currPage: number;
  onClick: OnClick;
}

export const Button: FC<IButtonProps> = ({ currPage, onClick }) => {
  const [page, setPage] = useState(currPage);

  const handleClick = () => {
    setPage(prevState => prevState + 1);
    onClick(page);
  };

  return (
    <LoadMoreButton type="button" onClick={handleClick}>
      Load more
    </LoadMoreButton>
  );
};
