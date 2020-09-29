import http from './http.js';

export const apiGetCompany = async userId => {
  const response = await http({
    method: 'get',
    url: 'get_company_info',
    data: { client_code: userId }
  });

  const data = response.data.client_data[0];

  return {
    organizationCode: data.edrpou,
    organizationName: data.company_name,
    address: data.adress,
    manager: data.director_name
  };
};

export default {
  apiGetCompany
};
