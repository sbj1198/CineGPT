import {
  Box,
  Button,
  Card,
  Field,
  Input,
  Stack,
  Alert,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { signInWithEmailAndPassword } from "firebase/auth/web-extension";
import { auth } from "../utils/firebase";
import { PasswordInput } from "../components/ui/password-input";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firebaseError, setFirebaseError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    setFirebaseError("");
    try {
      const signinCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      navigate("/browse");
    } catch (error) {
      setEmail("");
      setPassword("");
      if (error.code === "auth/invalid-credential") {
        setFirebaseError("Invalid email or password");
      } else {
        setFirebaseError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <Box
      minH="100vh"
      w="100%"
      background="
      linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.95)),
      linear-gradient(
        to bottom,
        rgba(229,9,20,0.55) 0%,
        rgba(229,9,20,0.45) 40%,
        rgba(229,9,20,0.25) 65%,
        rgba(0,0,0,0.95) 90%
      )"
      display="flex"
      alignItems="start"
      justifyContent="center"
    >
      <Card.Root maxW="sm" w="100%" size="lg" mt="36">
        <Card.Header>
          <Card.Title>Enter your info to sign in</Card.Title>
        </Card.Header>

        <Card.Body>
          {firebaseError && (
            <Alert.Root status="error" variant={"outline"} mb="6" size={"sm"}>
              <Alert.Indicator />
              <Alert.Title>{firebaseError}</Alert.Title>
            </Alert.Root>
          )}
          <Stack gap="4" w="full">
            <Field.Root required>
              <Field.Label>
                Email <Field.RequiredIndicator />
              </Field.Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </Field.Root>

            <Field.Root required>
              <Field.Label>
                Password <Field.RequiredIndicator />
              </Field.Label>
              <PasswordInput
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              {/* <Input
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              /> */}
            </Field.Root>
          </Stack>
        </Card.Body>

        <Card.Footer>
          <Button
            onClick={handleLogin}
            w="100%"
            variant="solid"
            color={"white"}
            colorPalette={"red"}
          >
            Sign In
          </Button>
        </Card.Footer>
      </Card.Root>
    </Box>
  );
};

export default Login;
