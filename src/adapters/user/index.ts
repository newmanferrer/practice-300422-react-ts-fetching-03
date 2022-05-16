export const userAdapter = (user: any) => ({
  id: user.data.id,
  name: user.data.name,
  username: user.data.username,
  email: user.data.email
});
