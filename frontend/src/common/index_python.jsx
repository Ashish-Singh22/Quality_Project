
// const backendDomain = "http://127.0.0.1:5000";
const backendDomain = "https://quality-project-backend-python.onrender.com";


const SummaryApiPython = {
  uploadController: {
    url: `${backendDomain}/api/quality-upload`,
    method: "post",
  },
  findController: {
    url: `${backendDomain}/api/quality-find`,
    method: "post",
  },
  
};
export default SummaryApiPython