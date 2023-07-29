import { FaAirbnb, FaMoon, FaSun } from "react-icons/fa";
import {
  Box,
  Button,
  HStack,
  IconButton,
  LightMode,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  VStack,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";

export default function Header() {
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
  const logoColor = useColorModeValue("red.500", "red.200");
  const Icon = useColorModeValue(FaMoon, FaSun);

  return (
    <HStack
      justifyContent={"space-between"}
      py={5}
      px={10}
      borderBottomWidth={1}
    >
      <Box color={logoColor} w="60">
        <Link to={"/"}>
          <FaAirbnb size={"48"} />
        </Link>
      </Box>
      <Box w="60">
        <Text as="i" fontSize={45} fontWeight="bold">
          AudiGo
        </Text>
      </Box>
      <HStack spacing={2} w="50">
        <IconButton
          onClick={toggleColorMode}
          variant={"ghost"}
          aria-label="Toggle dark mode"
          icon={<Icon />}
        />
        <Button onClick={onLoginOpen}>Log in</Button>
        <LightMode>
          <Button onClick={onSignUpOpen} colorScheme={"red"}>
            Sign up
          </Button>
        </LightMode>
      </HStack>
      <LoginModal isOpen={isLoginOpen} onClose={onLoginClose} />
      <SignUpModal isOpen={isSignUpOpen} onClose={onSignUpClose} />
    </HStack>
  );
}
