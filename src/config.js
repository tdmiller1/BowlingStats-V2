const host = {
  email: localStorage.getItem("email"),
  url: (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') ? "http://localhost:3001" : "https://bowling-stats-server.herokuapp.com"
}

export default host;