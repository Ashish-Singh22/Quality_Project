
// const backendDomain = "http://localhost:8080"
const backendDomain = "https://quality-project-backend-mern.onrender.com";

const SummaryApiMern = {
  clUpload: {
    url: `${backendDomain}/api/cl-upload`,
    method: "post",
  },
  clFind: {
    url: `${backendDomain}/api/cl-find`,
    method: "post",
  },
  cnUpload: {
    url: `${backendDomain}/api/cn-upload`,
    method: "post",
  },
  cnFind: {
    url: `${backendDomain}/api/cn-find`,
    method: "post",
  },
  crUpload: {
    url: `${backendDomain}/api/cr-upload`,
    method: "post",
  },
  crFind: {
    url: `${backendDomain}/api/cr-find`,
    method: "post",
  },
  ctUpload: {
    url: `${backendDomain}/api/ct-upload`,
    method: "post",
  },
  ctFind: {
    url: `${backendDomain}/api/ct-find`,
    method: "post",
  },
  tocUpload: {
    url: `${backendDomain}/api/toc-upload`,
    method: "post",
  },
  tocFind: {
    url: `${backendDomain}/api/toc-find`,
    method: "post",
  },
  pftUpload: {
    url: `${backendDomain}/api/pft-upload`,
    method: "post",
  },
  pftFind: {
    url: `${backendDomain}/api/pft-find`,
    method: "post",
  },
  
};

export default SummaryApiMern;