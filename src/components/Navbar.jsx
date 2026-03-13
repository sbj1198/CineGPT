import {
  Box,
  Button,
  Flex,
  NativeSelect,
  Spacer,
  Text,
} from "@chakra-ui/react";
import CineGPTIcon from "../components/CineGPTIcon";

const Navbar = () => {
  return (
    <Box p="30px">
      <Flex justify={"space-between"} alignItems={"center"}>
        <Box>
          <Flex alignItems="center" border="1px solid red">
            <CineGPTIcon />
            <Text pl="4px">CineGPT</Text>
          </Flex>
        </Box>
        <Box pr="48px">
          <Flex justify={"space-between"}>
            <Box mr="20px">
              <NativeSelect.Root size={"sm"}>
                <NativeSelect.Field>
                  <option value="1">English</option>
                  <option value="2">Hindi</option>
                </NativeSelect.Field>
                <NativeSelect.Indicator />
              </NativeSelect.Root>
            </Box>
            <Spacer />
            <Box>
              <Button
                variant={"solid"}
                colorPalette={"red"}
                color={"white"}
                size={"sm"}
              >
                Sign In
              </Button>
            </Box>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default Navbar;
