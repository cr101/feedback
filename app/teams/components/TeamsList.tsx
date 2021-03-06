import { Box, Grid, Heading, Text, VStack } from "@chakra-ui/react";
import { Team } from "@prisma/client";
import { useCurrentUser } from "app/hooks/useCurrentUser";
import getTeams from "app/teams/queries/getTeams";
import { Link, usePaginatedQuery } from "blitz";
import React from "react";
const TeamsList = () => {
  const currentUser = useCurrentUser();
  const [{ teams }] = usePaginatedQuery(getTeams, {
    orderBy: { updatedAt: "desc" },
    where: {
      users: {
        some: {
          id: currentUser?.id,
        },
      },
    },
  });

  const nameNode = (team: Team) => {
    return (
      <Box p={4}>
        <Heading size="md">{team.name}</Heading>
      </Box>
    );
  };

  const descriptionNode = (team: Team) => {
    if (!team.description) {
      return false;
    }

    return (
      <Box p={4} borderTopWidth={1}>
        <Text>{team.description}</Text>
      </Box>
    );
  };

  return (
    <Grid
      templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)", "repeat(3, 1fr)"]}
      gap={8}
      w="100%"
    >
      {teams.map((team) => {
        return (
          <Link key={team.id} href={`/teams/${team.id}`} passHref>
            <Box
              as="a"
              bgColor="white"
              rounded="md"
              shadow="sm"
              borderWidth={1}
            >
              <VStack align="left" spacing={0}>
                {nameNode(team)}
                {descriptionNode(team)}
              </VStack>
            </Box>
          </Link>
        );
      })}
    </Grid>
  );
};

export default TeamsList;
