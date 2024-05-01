import axios from "./axios";

export const getAllUsersRequest = async () => axios.get(`/users`);
export const deleteUserRequest = async (id) => axios.delete(`/user/${id}`);
