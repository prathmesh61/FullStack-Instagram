export const useGetStrogeItem = () => {
  const user = localStorage.getItem("user");
  const loginUser = JSON.parse(user);
  return { user, loginUser };
};
