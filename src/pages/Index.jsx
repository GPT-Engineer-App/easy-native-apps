import { useState } from "react";
import { Box, Heading, Text, Button, Input, FormControl, FormLabel, VStack, useToast } from "@chakra-ui/react";
import { FaPlus, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";

const API_BASE_URL = "https://backengine-roah.fly.dev";

const Index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  const toast = useToast();

  const handleLogin = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setAccessToken(data.accessToken);
        setIsLoggedIn(true);
        toast({
          title: "Login Successful",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        const errorData = await response.json();
        toast({
          title: "Login Failed",
          description: errorData.error,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login Failed",
        description: "An error occurred during login.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleSignup = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.status === 204) {
        toast({
          title: "Signup Successful",
          description: "You can now log in with your credentials.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        const errorData = await response.json();
        toast({
          title: "Signup Failed",
          description: errorData.error,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast({
        title: "Signup Failed",
        description: "An error occurred during signup.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setAccessToken("");
    toast({
      title: "Logged Out",
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box maxWidth="600px" margin="auto" padding={8}>
      <Heading as="h1" size="xl" textAlign="center" mb={8}>
        Native App Builder
      </Heading>
      {!isLoggedIn ? (
        <VStack spacing={4}>
          <FormControl id="email">
            <FormLabel>Email</FormLabel>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </FormControl>
          <Button leftIcon={<FaSignInAlt />} colorScheme="blue" onClick={handleLogin}>
            Login
          </Button>
          <Text>
            Don't have an account?{" "}
            <Button variant="link" onClick={handleSignup}>
              Sign up
            </Button>
          </Text>
        </VStack>
      ) : (
        <Box>
          <Text fontSize="xl" mb={4}>
            Welcome! You are logged in.
          </Text>
          <Button leftIcon={<FaPlus />} colorScheme="green" mb={4} isFullWidth>
            Create New App
          </Button>
          <Button leftIcon={<FaSignOutAlt />} colorScheme="red" onClick={handleLogout} isFullWidth>
            Logout
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Index;
