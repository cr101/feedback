import {
  Box,
  ChakraProvider,
  extendTheme,
  Flex,
  LightMode,
} from "@chakra-ui/react";
import TopNavbar from "app/layouts/TopNavbar";
import { Head } from "blitz";
import React, { ReactNode } from "react";

type LayoutProps = {
  title?: string;
  children: ReactNode;
};

const Layout = ({ title, children }: LayoutProps) => {
  const config = {
    useSystemColorMode: false,
    initialColorMode: "light",
  };
  const customTheme = extendTheme({
    config,
  });

  return (
    <>
      <Head>
        <title>{title || "feedback"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ChakraProvider theme={customTheme}>
        <LightMode>
          <Box minH="100vh" bgColor="gray.100">
            <TopNavbar />
            <Flex p={8}>{children}</Flex>
          </Box>
        </LightMode>
      </ChakraProvider>
    </>
  );
};

export default Layout;