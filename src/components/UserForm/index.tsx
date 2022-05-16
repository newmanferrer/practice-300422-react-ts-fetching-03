import { useEffect } from 'react';
import { useFormReducer } from '../../hooks';
import { user } from '../../models';
import { FormStyled, TitleStyled, InputsWrapper, InputStyled, ButtonsWrapper, ButtonStyled } from './StyledComponents';
import { COLORS } from '../../colors';

const initialState: user = {
  id: '',
  name: '',
  username: '',
  email: ''
};

interface UserFormProps {
  userToEdit: user | null;
  setUserToEdit: React.Dispatch<React.SetStateAction<user | null>>;
  isUpdatePut: boolean;
  handleUpdateUserPut: any;
  handleUpdateUserPatch: any;
  handleCreateUser: (userToCreate: user) => void;
}

export const UserForm = ({
  userToEdit,
  setUserToEdit,
  isUpdatePut,
  handleUpdateUserPut,
  handleUpdateUserPatch,
  handleCreateUser
}: UserFormProps) => {
  const { form, setForm, clearForm, handleChange } = useFormReducer(initialState);

  useEffect(() => {
    if (userToEdit) setForm(userToEdit);
    else clearForm();
  }, [userToEdit, setForm, clearForm]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.name || !form.username || !form.email) {
      alert('incomplete data...');
      return;
    }

    if (form.id === '') {
      handleCreateUser(form);
    } else {
      if (isUpdatePut) {
        handleUpdateUserPut(form);
      } else {
        handleUpdateUserPatch(form);
      }
    }

    handleClearForm();
  };

  const handleClearForm = () => {
    clearForm();
    setUserToEdit(null);
  };

  return (
    <FormStyled onSubmit={handleSubmit}>
      <TitleStyled>{userToEdit ? 'Edit User' : 'Create User'}</TitleStyled>

      <InputsWrapper>
        <InputStyled type='text' name='name' value={form.name} required placeholder='name' onChange={handleChange} />
        <InputStyled
          type='text'
          name='username'
          value={form.username}
          required
          placeholder='username'
          onChange={handleChange}
        />
        <InputStyled
          type='email'
          name='email'
          value={form.email}
          required
          placeholder='email'
          onChange={handleChange}
        />
      </InputsWrapper>

      <ButtonsWrapper>
        <ButtonStyled type='reset' colorHover={COLORS.error} bgHover={COLORS.warning} onClick={handleClearForm}>
          CLEAR
        </ButtonStyled>
        <ButtonStyled type='submit' colorHover={COLORS.white} bgHover={COLORS.success}>
          SEND
        </ButtonStyled>
      </ButtonsWrapper>
    </FormStyled>
  );
};
