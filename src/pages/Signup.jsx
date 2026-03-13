import {
  Box,
  Button,
  Card,
  Field,
  Input,
  Stack,
  Text,
  Alert,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router";
import PasswordInputField from "../components/PasswordInputField";
import { validateSignupInputs } from "../utils/validateInputs";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [firebaseError, setFirebaseError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    setFirebaseError("");
    const validationErrors = validateSignupInputs({
      firstName,
      lastName,
      email,
      password,
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      navigate("/browse");
    } catch (error) {
      setEmail("");
      setPassword("");
      if (error.code === "auth/email-already-in-use") {
        setErrors((prev) => ({
          ...prev,
          email: "This email is already registered",
        }));
      } else if (error.code === "auth/weak-password") {
        setErrors((prev) => ({
          ...prev,
          password: "Password too weak",
        }));
      } else {
        setFirebaseError("Something went wrong. Please try again.");
      }
    }
  };

  // To clear the previous errors present on the field
  const clearErrors = (field) => {
    setErrors((prev) => ({ ...prev, [field]: "" }));
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
      <Card.Root maxW="sm" w="100%" size="lg" mt="24">
        <Card.Header>
          <Card.Title>Enter your info to sign up</Card.Title>
        </Card.Header>

        <Card.Body>
          {firebaseError && (
            <Alert.Root status="error" variant={"outline"} mb="6" size={"sm"}>
              <Alert.Indicator />
              <Alert.Title>{firebaseError}</Alert.Title>
            </Alert.Root>
          )}
          <Stack gap="4" w="full">
            <Field.Root required invalid={errors.firstName}>
              <Field.Label>
                First Name <Field.RequiredIndicator />
              </Field.Label>
              <Input
                type="text"
                minLength={3}
                value={firstName}
                onChange={(e) => {
                  (setFirstName(e.target.value), clearErrors("firstName"));
                }}
              />
              <Field.ErrorText>{errors.firstName}</Field.ErrorText>
            </Field.Root>

            <Field.Root required invalid={errors.lastName}>
              <Field.Label>
                Last Name <Field.RequiredIndicator />
              </Field.Label>
              <Input
                type="text"
                minLength={3}
                value={lastName}
                onChange={(e) => {
                  (setLastName(e.target.value), clearErrors("lastName"));
                }}
              />
              <Field.ErrorText>{errors.lastName}</Field.ErrorText>
            </Field.Root>

            <Field.Root required invalid={errors.email}>
              <Field.Label>
                Email <Field.RequiredIndicator />
              </Field.Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => {
                  (setEmail(e.target.value), clearErrors("email"));
                }}
              />
              <Field.ErrorText>{errors.email}</Field.ErrorText>
            </Field.Root>

            <Field.Root required invalid={errors.password}>
              <Field.Label>
                Password <Field.RequiredIndicator />
              </Field.Label>
              {/* <Input /> */}
              <PasswordInputField
                password={password}
                onChange={(value) => setPassword(value)}
                clearErrors={clearErrors}
              />
              <Field.ErrorText>{errors.password}</Field.ErrorText>
            </Field.Root>
          </Stack>
        </Card.Body>

        <Card.Footer>
          <Box display="flex" flexDirection={"column"} w="100%">
            <Button
              onClick={handleSignup}
              variant="solid"
              colorPalette={"red"}
              color={"white"}
            >
              Sign Up
            </Button>
            <Text mt="14px" textAlign="center">
              Already have an account? <Link to="/login">Sign in</Link>
            </Text>
          </Box>
        </Card.Footer>
      </Card.Root>
    </Box>
  );
};

export default Signup;
