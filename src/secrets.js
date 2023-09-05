

const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZjMxM2U1ZDhmNTkxNWEwNGE0YWE0YTU1YTY1NWE0NCIsInN1YiI6IjYzZmVjMGI2OWYxYmU3MDBjZDYxOTRmZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0UA1mEv4Xtn6EfCrQ7Ao6z78YKZW6JJmGILtAZEaEsg'
    }
  };

const apiAxios = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZjMxM2U1ZDhmNTkxNWEwNGE0YWE0YTU1YTY1NWE0NCIsInN1YiI6IjYzZmVjMGI2OWYxYmU3MDBjZDYxOTRmZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0UA1mEv4Xtn6EfCrQ7Ao6z78YKZW6JJmGILtAZEaEsg'
  }
}) 