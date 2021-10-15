import { Container } from "@mui/material";
import React from "react";

interface PageContainerProps {
  children?: React.ReactNode;
  id?: string;
}

const PageContainer: React.FC<PageContainerProps> = ({ children, id }) => {
  return (
    <Container id={id}>
      <>{children}</>
    </Container>
  );
};

export default PageContainer;
