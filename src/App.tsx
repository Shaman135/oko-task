import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import SearchPage from "./Pages/SearchPage/SearchPage";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route path="/" exact>
            <SearchPage />
          </Route>
        </Switch>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
