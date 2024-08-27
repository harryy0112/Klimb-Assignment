import axios from "axios";

const handleUpload = (file) => {
  if (!file) {
    return;
  }

  let formData = new FormData();
  formData.append("xlsx", file);

  const config = {
    headers: { "content-type": "multipart/form-data" },
  };

  return axios
    .post("http://localhost:3001/candidates/", formData, config)
    .then((res) => res.data)
    .catch((err) => err.response.data);
};

export default handleUpload;
