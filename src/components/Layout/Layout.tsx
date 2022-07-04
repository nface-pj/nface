import React, { PropsWithChildren, useCallback, useState } from "react";
import { NextPage } from "next";
import Link from "next/link";
import Head from "next/head";
import {
  AppShell,
  Navbar,
  Header,
  Text,
  Title,
  Box,
  MediaQuery,
  Burger,
  useMantineTheme,
} from "@mantine/core";
import { Home, DogBowl } from "tabler-icons-react";
import { useSession, signIn, signOut } from "next-auth/react";

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  const { data: session } = useSession();

  const handleSignIn = useCallback((e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log("signIn : ", signIn());
  }, []);

  const handleSignOut = useCallback((e: React.SyntheticEvent) => {
    e.preventDefault();
    signOut();
  }, []);

  return (
    <div>
      <Head>
        <title>Oregon Humane Adoptable Dogs</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <AppShell
        padding="md"
        navbarOffsetBreakpoint="sm"
        fixed
        navbar={
          <Navbar
            p="md"
            hiddenBreakpoint="sm"
            hidden={!opened}
            width={{ sm: 200 }}
          >
            <Link href="/" passHref>
              <Box sx={{ display: "flex" }}>
                <Home />
                <Title order={5} ml={10}>
                  Home
                </Title>
              </Box>
            </Link>
          </Navbar>
        }
        header={
          <Header
            height={60}
            p="xs"
            sx={(theme) => ({
              backgroundColor: theme.colors.blue[9],
              color: "white",
            })}
          >
            <div
              style={{ display: "flex", alignItems: "center", height: "100%" }}
            >
              <DogBowl />
              <Text ml={10} size="md">
                Oregon Humane Adoptable Dogs
              </Text>
              <MediaQuery largerThan="sm" styles={{ display: "none" }}>
                <Burger
                  opened={opened}
                  onClick={() => setOpened((o) => !o)}
                  size="sm"
                  color={theme.colors.gray[3]}
                  mr="xl"
                />
              </MediaQuery>
            </div>
            <div>
              {!session ? (
                <li>
                  <a href="#" onClick={(e) => handleSignIn(e)}>
                    로그인
                  </a>
                </li>
              ) : (
                <>
                  <div>
                    <p>
                      <img
                        src={session?.user?.image as string}
                        width="32px"
                        height="32px"
                        // alt={session.user.image}
                      />
                      <strong>{session?.user?.name}</strong>
                    </p>
                  </div>
                  <li>
                    <a href="#" onClick={(e) => handleSignOut(e)}>
                      로그아웃
                    </a>
                  </li>
                </>
              )}
            </div>
          </Header>
        }
        styles={(theme) => ({
          main: {
            backgroundColor: theme.colors.gray[0],
          },
        })}
      >
        {children}
      </AppShell>
    </div>
  );
};

export default Layout;
