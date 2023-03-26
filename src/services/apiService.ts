import instance from './axios';

abstract class ApiService {
  static getPhotos = async () => {
    const { data } = await instance.get('http://localhost:8080/photos');
    return data;
  };
  static deletePhoto = async (id: number) => {
    await instance.delete(`http://localhost:8080/photos/${id}`);
  };

  static postFile = async (formData: FormData) => {
    const response = await instance.post('http://localhost:8080/photos', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response;
  };

  static fetchFile = async (id: number) => {
    const response = await instance.get(`http://localhost:8080/download/${id}`, {
      responseType: 'blob',
    });
    console.log(response);

    return response.data;
  };
}

export default ApiService;
