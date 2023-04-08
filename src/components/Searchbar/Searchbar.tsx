import { FC, FormEvent } from 'react';
import { FiSearch } from 'react-icons/fi';
import {
  SearchBox,
  SearchForm,
  SearchButton,
  SearchInput,
} from './Searchbar.styled';

type OnSubmit = (text: string) => void;

interface ISearchbarProps {
  onSubmit: OnSubmit;
}

export const Searchbar: FC<ISearchbarProps> = ({ onSubmit }) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    // #1 storing a reference to the form element:
    const form = e.currentTarget;
    // #2 using the namedItem method to get a reference 
    // to the searchQuery control in the elements collection.
    const searchQueryInput = form.elements.namedItem('searchQuery') as HTMLInputElement;
    // #3 checking if a. the searchQueryInput control exists
    // b. or if its value isn't empty
    if(!searchQueryInput || searchQueryInput.value.trim() === '') return;
    // #4 passing the trimmed value of the searchQueryInput control to submit fn
    onSubmit(searchQueryInput.value.trim());
  };
  
  return (
    <SearchBox>
      <SearchForm onSubmit={(e: FormEvent<HTMLFormElement>) => handleSubmit(e)}>
        <SearchButton type="submit">
          <FiSearch />
        </SearchButton>

        <SearchInput
          type="text"
          name="searchQuery"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </SearchBox>
  );
};
