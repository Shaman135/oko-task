import { CircularProgress, Snackbar, Stack, Typography } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { useHistory, withRouter } from "react-router-dom";
import PageContainer from "../../components/PageContainer/PageContainer";
import RepositoryCard from "../../components/RepositoryCard/RepositoryCard";
import SearchBar from "../../components/SearchBar/SearchBar";
import useRepositoriesSearch from "../../hooks/useRepositories";
import { Edge } from "../../models/Response";

const SearchPage = (props: any) => {
  const history = useHistory();
  const params = new URLSearchParams(props.location.search);
  const queryClient = useQueryClient();
  const [query, setQuery] = useState<string>(params.get("q") || "");
  const { status, data, fetchNextPage, isFetchingNextPage } =
    useRepositoriesSearch(query);

  const handleScroll = () => {
    const bottom =
      Math.ceil(window.innerHeight + window.scrollY) >=
      document.documentElement.scrollHeight;
    if (bottom) {
      setTimeout(fetchNextPage, 100);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    updateQuery(query);
  }, []);

  const updateQuery = (q: string) => {
    setQuery(q);
    history.push({
      pathname: "/",
      search: `?q=${q}`,
    });
    if (q.length >= 3) {
      queryClient.clear();
      setTimeout(fetchNextPage, 500);
    }
  };

  return (
    <PageContainer id="search-page">
      <SearchBar
        placeholder="Wprowadź zapytanie"
        query={query}
        onQueryUpdate={updateQuery}
      ></SearchBar>
      {status === "success" ? (
        <>
          <Typography variant="h5" component="div" gutterBottom>
            {`Liczba wyników: ${data?.pages[0].repositoryCount}`}
          </Typography>
          {data?.pages.map((page, idx) => (
            <Fragment key={idx}>
              <Stack spacing={2} sx={{ marginY: "16px" }}>
                {page.edges.map((edge: Edge) => (
                  <RepositoryCard
                    key={edge.node.databaseId}
                    repository={edge.node}
                  />
                ))}
              </Stack>
            </Fragment>
          ))}
        </>
      ) : status === "loading" ? (
        <div style={{ textAlign: "center" }}>
          <CircularProgress />
        </div>
      ) : (
        <div>Brak wyników wyszukiwania</div>
      )}
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={isFetchingNextPage}
        message="Pobieram dane"
      />
    </PageContainer>
  );
};

export default withRouter(SearchPage);
