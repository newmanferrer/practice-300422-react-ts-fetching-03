import { useAppSelector } from '../../hooks';
import { user } from '../../models';
import { UserItem } from '../';
import { UlStyled } from './StyledComponents';

interface UsersListProps {
  users: user[];
  setUserToEdit: React.Dispatch<React.SetStateAction<user | null>>;
  setIsUpdatePut: React.Dispatch<React.SetStateAction<boolean>>;
  handleDeleteUser: (userToDelete: user) => void;
}

export const UsersList = ({ users, setUserToEdit, setIsUpdatePut, handleDeleteUser }: UsersListProps) => {
  const { search } = useAppSelector(state => state.search);

  return (
    <UlStyled>
      {users
        .filter(
          user =>
            user.id.toLowerCase().includes(search.toLowerCase()) ||
            user.name.toLowerCase().includes(search.toLowerCase()) ||
            user.username.toLowerCase().includes(search.toLowerCase()) ||
            user.email.toLowerCase().includes(search.toLowerCase())
        )
        .map(user => (
          <UserItem
            key={user.id}
            user={user}
            setUserToEdit={setUserToEdit}
            setIsUpdatePut={setIsUpdatePut}
            handleDeleteUser={handleDeleteUser}
          />
        ))}
    </UlStyled>
  );
};
