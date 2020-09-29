import http from './http.js';

export const apiGetUser = async userId => {
  const response = await http({
    method: 'get',
    url: 'get_user_info',
    data: { client_code: userId }
  });

  const data = response.data.client_data;

  return {
    email: data.e_mail,
    firstName: data.first_name,
    lastName: data.last_name
  };
};

export const apiUserChangePassword = async data => {
  const params = {
    old_password: data.password,
    new_password: data.newPassword,
    client_code: data.userId
  };

  const response = await http.post('change_password', params);
  return +response.data.result;
};

export default {
  apiGetUser,
  apiUserChangePassword
};
