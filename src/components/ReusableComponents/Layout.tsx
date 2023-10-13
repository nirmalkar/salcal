import styled from "@emotion/styled";
import React from "react";

type LayoutProps = {
  children: React.ReactElement;
};

const LayoutContainer = styled.div``;

function Layout({ children }: LayoutProps) {
  return <LayoutContainer>{children}</LayoutContainer>;
}

export default Layout;
