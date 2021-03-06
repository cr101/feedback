import {
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  CloseButton,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import React from "react";

type TeamFormProps = {
  initialValues: any;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  isLoading: boolean;
  isError: boolean;
};

const TeamForm = ({
  onSubmit,
  isLoading,
  isError,
  initialValues,
}: TeamFormProps) => {
  const alertNode = () => {
    if (!isError) {
      return false;
    }

    return (
      <Alert status="error" rounded="md">
        <AlertIcon />
        <AlertTitle>Something went wrong! Please try again.</AlertTitle>
        <CloseButton position="absolute" right="8px" top="8px" />
      </Alert>
    );
  };

  return (
    <Box
      p={8}
      bgColor="white"
      rounded="md"
      shadow="sm"
      borderWidth={1}
      w={["100%", "100%", "50%"]}
    >
      <VStack spacing={8} align="left">
        {alertNode()}
        <form
          onSubmit={(event) => {
            event.preventDefault();

            onSubmit(event);
          }}
        >
          <VStack spacing={8} align="left">
            <Box>
              <FormControl id="name" isRequired isDisabled={isLoading}>
                <FormLabel>Name</FormLabel>
                <Input
                  placeholder="Personal portfolio"
                  defaultValue={initialValues.name}
                />
              </FormControl>
            </Box>
            <Box>
              <FormControl id="description" isDisabled={isLoading}>
                <FormLabel>Description</FormLabel>
                <Textarea
                  placeholder="Personal portfolio"
                  defaultValue={initialValues.description}
                />
              </FormControl>
            </Box>
            <Box>
              <Button colorScheme="blue" type="submit" isLoading={isLoading}>
                Submit
              </Button>
            </Box>
          </VStack>
        </form>
      </VStack>
    </Box>
  );
};

export default TeamForm;
