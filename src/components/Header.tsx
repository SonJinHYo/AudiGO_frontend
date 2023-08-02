import { FaHome, FaMoon, FaSun } from "react-icons/fa";
import {
  Box,
  Button,
  HStack,
  IconButton,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  Text,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useToast,
  Flex,
  Spacer,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";
import useUser from "../lib/useUser";
import { logOut } from "../api";
import { useQueryClient } from "@tanstack/react-query";

export default function Header() {
  const { userLoading, isLoggedIn, user } = useUser();
  const logoFontSize = useBreakpointValue({
    lg: "50px",
    md: "35px",
    base: "20px",
  });

  const {
    isOpen: isLoginOpen,
    onClose: onLoginClose,
    onOpen: onLoginOpen,
  } = useDisclosure();
  const {
    isOpen: isSignUpOpen,
    onClose: onSignUpClose,
    onOpen: onSignUpOpen,
  } = useDisclosure();

  const { toggleColorMode } = useColorMode();
  const logoColor = useColorModeValue("white.500", "black.200");
  const Icon = useColorModeValue(FaMoon, FaSun);

  const toast = useToast();
  const queryClient = useQueryClient();
  const onLogOut = async () => {
    const toastId = toast({
      title: "Login out...",
      status: "loading",
      position: "bottom-right",
    });

    await logOut();
    queryClient.refetchQueries(["me"]);
    toast.update(toastId, {
      status: "success",
      title: "Done!",
      description: "See you later!",
    });
  };

  return (
    <HStack
      justifyContent={"space-between"}
      py={5}
      px={10}
      borderBottomWidth={1}
    >
      <Box w="10%"></Box>
      <Box color={logoColor} w="20%">
        <Link to={"/"}>
          <FaHome size={"48"} />
        </Link>
      </Box>

      <Box as="i" fontSize={logoFontSize} fontWeight="bold" w="20%">
        <Text>AudiGo</Text>
      </Box>

      <Flex gap={2} alignItems="center" w="20%">
        <Spacer />
        <IconButton
          onClick={toggleColorMode}
          variant={"ghost"}
          aria-label="Toggle dark mode"
          icon={<Icon />}
        />
        {!userLoading ? (
          !isLoggedIn ? (
            <Button onClick={onLoginOpen} colorScheme={"red"}>
              Log in
            </Button>
          ) : (
            // <>
            //   <Button onClick={onLoginOpen}>Log in</Button>
            //   <LightMode>
            //     <Button onClick={onSignUpOpen} colorScheme={"red"}>
            //       Sign up
            //     </Button>
            //   </LightMode>
            // </>
            <Menu>
              <MenuButton>
                <Avatar size={"md"} />
              </MenuButton>
              <MenuList>
                <Link to={`/users/me`}>
                  <MenuItem>My Scripts</MenuItem>
                </Link>
                <Link to={`scripts/create`}>
                  <MenuItem>Create a Script</MenuItem>
                </Link>
                <MenuItem onClick={onLogOut}>Log Out</MenuItem>
              </MenuList>
            </Menu>
          )
        ) : null}
      </Flex>
      <LoginModal isOpen={isLoginOpen} onClose={onLoginClose} />
      <SignUpModal isOpen={isSignUpOpen} onClose={onSignUpClose} />
      <Box w="10%"></Box>
    </HStack>
  );
}
