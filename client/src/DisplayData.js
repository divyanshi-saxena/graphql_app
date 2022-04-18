import React, { useState } from "react";
import { useQuery, useLazyQuery, gql, useMutation } from "@apollo/client";
// useLazyQuery - fetch the data when we want you to fetch

const QUERY_ALL_USERS = gql`
  query GetAllUsers {
    users {
      id
      name
      age
      username
      nationality
    }
  }
`;

const QUERY_ALL_MOVIES = gql`
  query GetAllMovies {
    movies {
      id
      name
    }
  }
`;

const GET_MOVIE_BY_NAME = gql`
  query GetMovieByName($name: String!) {
    movie(name: $name) {
      name
      yearOfPublication
    }
  }
`;

const CREATE_USER_MUTATION = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      name
    }
  }
`;

function DisplayData() {
  const [movieSearched, setMovieSearched] = useState("");

  // Create user states
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [age, setAge] = useState(0);
  const [nationality, setNationality] = useState("");

  const { data, loading, error, refetch } = useQuery(QUERY_ALL_USERS);
  const { data: movieData } = useQuery(QUERY_ALL_MOVIES);
  const [fetchMovie, { data: movieSearchData, error: movieError }] =
    useLazyQuery(GET_MOVIE_BY_NAME);
  // here we define a function which we will call when we have to fetch the data
  const [createUser] = useMutation(CREATE_USER_MUTATION);

  if (loading) {
    return <h1>Data is loading...</h1>;
  }

  if (data) {
    console.log(data);
  }

  if (error) {
    console.log(error);
  }

  if (movieError) {
    console.log("movie error: ", movieError);
  }

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Name..."
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Username..."
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="number"
          placeholder="Age..."
          onChange={(e) => setAge(e.target.value)}
        />
        <input
          type="text"
          placeholder="Nationality..."
          onChange={(e) => setNationality(e.target.value.toUpperCase())}
        />
        <button
          onClick={() => {
            createUser({
              variables: {
                input: {
                  name,
                  username,
                  age: Number(age),
                  nationality,
                },
              },
            });
            refetch();
          }}
        >
          Create User
        </button>
      </div>
      {data &&
        data.users &&
        data.users.map((user) => {
          return (
            <div key={user.id}>
              <h1>Name: {user.name}</h1>
              <h1>Age: {user.age}</h1>
              <h1>User name: {user.username}</h1>
              <h1>Nationality: {user.nationality}</h1>
            </div>
          );
        })}

      {movieData &&
        movieData.movies &&
        movieData.movies.map((movie) => <h1 key={movie.id}>{movie.name}</h1>)}

      <div>
        <input
          type="text"
          placeholder="Interstellar..."
          onChange={(e) => setMovieSearched(e.target.value)}
        />
        <button
          onClick={() =>
            fetchMovie({
              variables: {
                name: movieSearched,
              },
            })
          }
        >
          Fetch Data
        </button>
        <div>
          {movieSearchData && (
            <div>
              <h1>MovieName: {movieSearchData.movie.name}</h1>
              <h1>
                Year Of Publication: {movieSearchData.movie.yearOfPublication}
              </h1>
            </div>
          )}
          {movieError && <h1>There was error fetching the data</h1>}
        </div>
      </div>
    </div>
  );
}

export default DisplayData;
