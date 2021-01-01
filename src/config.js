const host = {
  id: localStorage.getItem("authId"),
  url: (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') ? "http://localhost:4000/api/bowling" : process.env.REACT_APP_BACKEND_URL
}

export default host;