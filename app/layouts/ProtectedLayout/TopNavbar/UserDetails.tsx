import { Button } from "@chakra-ui/react";
import logout from "app/auth/mutations/logout";
import { useCurrentUser } from "app/hooks/useCurrentUser";
import { Link, useMutation, useRouter } from "blitz";
import React from "react";

const UserDetails = () => {
  const currentUser = useCurrentUser();
  const [logoutMutation] = useMutation(logout);
  const router = useRouter();

  if (currentUser) {
    return (
      <Button
        colorScheme="red"
        size="sm"
        variant="outline"
        onClick={async () => {
          await logoutMutation();

          router.push("/sign-in");
        }}
      >
        Sign Out
      </Button>
    );
  } else {
    return (
      <>
        <Link href="/sign-up">
          <Button colorScheme="blue" type="submit" size="sm">
            Sign Up
          </Button>
        </Link>
        <Link href="/sign-in">
          <Button colorScheme="blue" type="submit" size="sm" variant="outline">
            Sign In
          </Button>
        </Link>
      </>
    );
  }
};

export default UserDetails;
