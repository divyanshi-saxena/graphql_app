import "./App.css";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import DisplayData from "./DisplayData";
// for connection to backend we need ApolloClient
// useQuery hook used to make request to query api - it fetches data when the component renders
function App() {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    // able to cache data in browser
    uri: "http://localhost:4000/graphql",
    // url to graphql api
  });
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <DisplayData />
      </div>
    </ApolloProvider>
  );
}

export default App;
