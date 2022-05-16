import { useEffect, useState } from 'react';
import { getAllUsers, createUser, updateUserPut, updateUserPatch, deleteUser } from './services';
import { user, userPartial } from './models';
import { GlobalStyles, Title, UserForm, SearchForm, Loader, Message, UsersList } from './components';

export const App = () => {
  const [users, setUsers] = useState<user[] | []>([]);
  const [userToEdit, setUserToEdit] = useState<user | null>(null);
  const [isUpdatePut, setIsUpdatePut] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  useEffect(() => {
    setIsLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    getAllUsers()
      .then(response => {
        if (response.errorMessage) throw response.errorMessage;
        setUsers(response.users);
      })
      .catch(error => setErrorMessage(error))
      .finally(() => setIsLoading(false));
  }, []);

  const handleCreateUser = (userToCreate: user) => {
    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    createUser(userToCreate)
      .then(response => {
        if (response.errorMessage) throw response.errorMessage;
        if (response.user) {
          setSuccessMessage(`The user ${userToCreate.id} - ${userToCreate.name} has been created`);
          setUsers([...users, response.user]);
          setTimeout(() => setSuccessMessage(''), 3000);
        }
      })
      .catch(error => {
        setErrorMessage(`User ${userToCreate.name} Has not been created => ${error}`);
        setTimeout(() => setErrorMessage(''), 3000);
      })
      .finally(() => setIsLoading(false));
  };

  const handleUpdateUserPut = (userToUpdatePut: user) => {
    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    updateUserPut(userToUpdatePut)
      .then(response => {
        if (response.errorMessage) throw response.errorMessage;
        if (response.user) {
          setSuccessMessage(`The user ID: ${userToUpdatePut.id} - ${userToUpdatePut.name}, has been updated`);
          const newUsers = users.map(user => (user.id === response.user?.id ? response.user : user));
          setUsers(newUsers);
          setTimeout(() => setSuccessMessage(''), 3000);
        }
      })
      .catch(error => {
        setErrorMessage(`User ${userToUpdatePut.name} Has not been updated => ${error}`);
        setTimeout(() => setErrorMessage(''), 3000);
      })
      .finally(() => setIsLoading(false));
  };

  const handleUpdateUserPatch = (userToUpdatePatch: userPartial) => {
    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    updateUserPatch(userToUpdatePatch)
      .then(response => {
        if (response.errorMessage) throw response.errorMessage;
        if (response.user) {
          setSuccessMessage(`The user ID: ${userToUpdatePatch.id} - ${userToUpdatePatch.name}, has been updated`);
          const newUsers = users.map(user => (user.id === response.user?.id ? response.user : user));
          setUsers(newUsers);
          setTimeout(() => setSuccessMessage(''), 3000);
        }
      })
      .catch(error => {
        setErrorMessage(`User ${userToUpdatePatch.name} Has not been updated => ${error}`);
        setTimeout(() => setErrorMessage(''), 3000);
      })
      .finally(() => setIsLoading(false));
  };

  const handleDeleteUser = (userToDelete: user) => {
    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    const isConfirm = confirm(`The user with id: "${userToDelete.id}", will be deleted`);
    if (isConfirm) {
      deleteUser(userToDelete)
        .then(response => {
          if (response.errorMessage) throw response.errorMessage;
          setSuccessMessage(`The user ID: ${userToDelete.id} - ${userToDelete.name}, has been deleted`);
          const newUsers = users && users.filter(user => user.id !== userToDelete.id);
          setUsers(newUsers);
          setTimeout(() => setSuccessMessage(''), 3000);
        })
        .catch(error => {
          setErrorMessage(`User ${userToDelete.name} Not Deleted => ${error}`);
          setTimeout(() => setErrorMessage(''), 3000);
        })
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  };

  return (
    <>
      <GlobalStyles />
      <Title text='React with TS - Fetching 03' />
      <UserForm
        userToEdit={userToEdit}
        setUserToEdit={setUserToEdit}
        isUpdatePut={isUpdatePut}
        handleCreateUser={handleCreateUser}
        handleUpdateUserPut={handleUpdateUserPut}
        handleUpdateUserPatch={handleUpdateUserPatch}
      />
      <SearchForm />

      {isLoading && <Loader />}
      {!isLoading && !errorMessage && successMessage && <Message type='success' text={successMessage} />}
      {!isLoading && errorMessage && <Message type='error' text={errorMessage} />}
      {!isLoading && !errorMessage ? (
        users && users.length ? (
          <UsersList
            users={users}
            setUserToEdit={setUserToEdit}
            setIsUpdatePut={setIsUpdatePut}
            handleDeleteUser={handleDeleteUser}
          />
        ) : (
          <Message type='error' text='Not users yet...' />
        )
      ) : null}
    </>
  );
};
