import axios from 'axios';
import { user, userPartial } from '../../models';

const baseURL = 'http://localhost:5000';
const allUsers = 'users';
const headers = { 'Content-Type': 'application/json' };

const axiosInstace = axios.create({
  baseURL: baseURL,
  headers: headers
});

export const getAllUsers = async () => {
  let users: user[] | [] = [];
  let errorMessage: string = '';

  try {
    const response = await axiosInstace.get<user[]>(`${allUsers}`);
    users = response.data;
  } catch (error: any) {
    errorMessage = error.message;
  }

  return { users, errorMessage };
};

export const createUser = async (userToCreate: user) => {
  let user: user | null = null;
  let errorMessage: string = '';

  try {
    const response = await axiosInstace.post(`${allUsers}`, {
      name: userToCreate.name,
      username: userToCreate.username,
      email: userToCreate.email
    });
    user = response.data;
  } catch (error: any) {
    errorMessage = error.message || 'Error creating user...';
  }

  return { user, errorMessage };
};

export const updateUserPut = async (userToUpdatePut: user) => {
  let user: user | null = null;
  let errorMessage: string = '';

  try {
    const response = await axiosInstace.put(`${allUsers}/${userToUpdatePut.id}`, {
      name: userToUpdatePut.name,
      username: userToUpdatePut.username,
      email: userToUpdatePut.email
    });
    user = response.data;
  } catch (error: any) {
    errorMessage = error.message || 'Error updating user...';
  }

  return { user, errorMessage };
};

export const updateUserPatch = async ({ id, ...rest }: user | userPartial) => {
  let user: user | null = null;
  let errorMessage: string = '';

  try {
    const response = await axiosInstace.put(`${allUsers}/${id}`, {
      name: rest.name && rest.name,
      username: rest.username && rest.username,
      email: rest.email && rest.email
    });
    user = response.data;
  } catch (error: any) {
    errorMessage = error.message || 'Error updating user...';
  }

  return { user, errorMessage };
};

export const deleteUser = async (userToDelete: user) => {
  let user: user | null = null;
  let errorMessage: string | null = null;

  try {
    await axiosInstace.delete(`${allUsers}/${userToDelete.id}`);
    user = userToDelete;
  } catch (error: any) {
    errorMessage = error.message;
  }

  return { user, errorMessage };
};
