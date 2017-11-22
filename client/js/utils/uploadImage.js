import axios from 'axios';

const uploadImage = (image) => {
  const formData = new FormData();
  formData.append('file', image);
  formData.append('upload_preset', 'zw7fxoht');
  return axios({
    method: 'POST',
    url: 'https://api.cloudinary.com/v1_1/ffrreedd/upload',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: formData
  });
};
export default uploadImage;
