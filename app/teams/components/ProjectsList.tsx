import { Box, Grid, Heading } from "@chakra-ui/react";
import getProjects from "app/projects/queries/getProjects";
import { Link, usePaginatedQuery, useParam } from "blitz";
import { Project } from "db";
import React, { FC } from "react";

const ProjectsList: FC = () => {
  const teamId = useParam("teamId", "number");
  const [{ projects }] = usePaginatedQuery(getProjects, {
    orderBy: { updatedAt: "desc" },
    where: {
      team: {
        id: teamId,
      },
    },
  });

  const nameNode = (project: Project) => {
    return (
      <Box p={4}>
        <Heading size="md">{project.name}</Heading>
      </Box>
    );
  };

  return (
    <Grid
      templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)", "repeat(3, 1fr)"]}
      gap={8}
      w="100%"
    >
      {projects.map((project) => {
        return (
          <Link key={project.id} href={`/projects/${project.id}`} passHref>
            <Box
              as="a"
              bgColor="white"
              rounded="md"
              shadow="sm"
              borderWidth={1}
            >
              {nameNode(project)}
            </Box>
          </Link>
        );
      })}
    </Grid>
  );
};

export default ProjectsList;
