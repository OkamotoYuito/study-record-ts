import { Center, Spinner, Text, VStack } from "@chakra-ui/react";

export const Loading = () => {
  return (
    <Center h="100vh">
      <VStack colorPalette="gray.600" gap="4">
        <Spinner borderWidth="5px" size="xl" />
        <Text>Loading...</Text>
      </VStack>
    </Center>
  );
};
