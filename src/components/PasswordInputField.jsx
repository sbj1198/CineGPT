import { Stack } from "@chakra-ui/react";
import { passwordStrength } from "check-password-strength";
import { PasswordInput, PasswordStrengthMeter } from "./ui/password-input";
import { useMemo } from "react";

const strengthOptions = [
  { id: 1, value: "weak", minDiversity: 0, minLength: 0 },
  { id: 2, value: "medium", minDiversity: 2, minLength: 6 },
  { id: 3, value: "strong", minDiversity: 3, minLength: 8 },
  { id: 4, value: "very-strong", minDiversity: 4, minLength: 10 },
];

const PasswordInputField = ({ password, onChange, clearErrors }) => {
  const strength = useMemo(() => {
    if (!password) return 0;
    const result = passwordStrength(password, strengthOptions);
    return result.id;
  }, [password]);

  return (
    <Stack w="100%" gap="3">
      <PasswordInput
        value={password}
        onChange={(e) => {
          (onChange(e.currentTarget.value), clearErrors("password"));
        }}
        placeholder="Enter your password"
      />
      <PasswordStrengthMeter value={strength} />
    </Stack>
  );
};

export default PasswordInputField;
