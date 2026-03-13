export const validateSignupInputs = ({
  firstName,
  lastName,
  email,
  password,
}) => {
  const errors = {};

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;

  if (!firstName?.trim()) {
    errors.firstName = "First name is required";
  }

  if (!lastName?.trim()) {
    errors.lastName = "Last name is required";
  }

  if (!email) {
    errors.email = "Email is required";
  } else if (!emailRegex.test(email)) {
    errors.email = "Invalid email format";
  }

  if (!password) {
    errors.password = "Password is required";
  } else if (!passwordRegex.test(password)) {
    errors.password =
      "Password must be 4-8 characters and include uppercase, lowercase, and a number";
  }

  return errors;
};
