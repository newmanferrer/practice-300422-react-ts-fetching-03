import { useEffect } from 'react';
import { useAppDispatch, useFormReducer } from '../../hooks';
import { setSearch } from '../../reduxState/features';
import { FormStyled, InputStyled } from './StyledComponents';

const initialState = {
  search: ''
};

export const SearchForm = () => {
  const { form, handleChange } = useFormReducer(initialState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setSearch(form.search));
  }, [form.search]);

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <FormStyled onSubmit={handleSubmit}>
      <InputStyled type='text' name='search' value={form.search} placeholder='search user...' onChange={handleChange} />
    </FormStyled>
  );
};
