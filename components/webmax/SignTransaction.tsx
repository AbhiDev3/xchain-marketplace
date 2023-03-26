/* eslint-disable */
// @ts-nocheck
import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IntmaxWalletSigner, NoRedirect } from "webmax";

type Inputs = {
  to: string;
  value: string;
  gasLimit: number;
};

export const SignTransaction = (auctionListing , marketplace , directListing) => {
  const [result, setResult] = useState("");
  const toast = useToast();
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async ({
    to,
    value,
    gasLimit,
  }: Inputs): Promise<void> => {
    try {
      let txResult;
  
      if (auctionListing?.[0]) {
        txResult = await marketplace?.englishAuctions.buyoutAuction(
          auctionListing[0].id
        );
      } else if (directListing?.[0]) {
        txResult = await marketplace?.directListings.buyFromListing(
          directListing[0].id,
          1
        );
      } else {
        throw new Error("No valid listing found for this NFT");
      }
  
      const tx = {
        to,
        value: value,
        gasLimit,
        data: txResult.encodeABI(),
      };
  
      const signer = new IntmaxWalletSigner();
      const receipt = await signer.sendTransaction(tx);
      setResult(JSON.stringify(receipt));
  
      toast({
        title: "Success Send Transaction",
        position: "top",
        status: "success",
        isClosable: true,
      });
    } catch (error) {
      console.error(error);
  
      toast({
        title: (error as Error).message,
        position: "top",
        status: "error",
        isClosable: true,
      });
    }
  };
  
  const handleClick = (key: "to" | "value" | "gasLimit"): void => void resetField(key);

  return (
    <Flex textAlign="center" fontSize="xl" direction="column">
      <VStack as="form" spacing={6} onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={3} my={2}>
          <Flex w="100%" alignItems="center" flexDirection="column">
            <Flex w="100%" alignItems="center">
              <Text fontWeight="bold" fontSize={{ base: "xs" }} w="150px" mr={{ base: 2, md: 8 }}>
                To Address
              </Text>
              <InputGroup>
                <Input
                  type="text"
                  placeholder="0x..."
                  {...register("to", {
                    required: "address is required",
                  })}
                />
                <InputRightElement
                  children={<button>close</button>}
                  onClick={() => handleClick("to")}
                />
              </InputGroup>
            </Flex>
            {errors.to && (
              <Text color="red.500" fontWeight="medium" mt={2}>
                {errors.to.message}
              </Text>
            )}
          </Flex>
          <Flex w="100%" alignItems="center" flexDirection="column">
            <Flex w="100%" alignItems="center">
              <Text fontWeight="bold" fontSize={{ base: "xs" }} w="150px" mr={{ base: 2, md: 8 }}>
                Transaction Value
              </Text>
              <InputGroup>
                <Input
                  type="text"
                  placeholder="0.01"
                  {...register("value", {
                    required: "value is required",
                  })}
                />
                <InputRightElement
                  children={<Button>close</Button>}
                  onClick={() => handleClick("value")}
                />
              </InputGroup>
            </Flex>
            {errors.value && (
              <Text color="red.500" fontWeight="medium" mt={2}>
                {errors.value.message}
              </Text>
            )}
          </Flex>
          <Flex w="100%" alignItems="center" flexDirection="column">
            <Flex w="100%" alignItems="center">
              <Text fontWeight="bold" fontSize={{ base: "xs" }} w="150px" mr={{ base: 2, md: 8 }}>
                gas
              </Text>
              <InputGroup>
                <Input
                  type="text"
                  placeholder="21000"
                  {...register("gasLimit", {
                    required: "gasLimit is required",
                    valueAsNumber: true,
                  })}
                />
                <InputRightElement
                  children={<button>close</button>}
                  onClick={() => handleClick("gasLimit")}
                />
              </InputGroup>
            </Flex>
            {errors.gasLimit && (
              <Text color="red.500" fontWeight="medium" mt={2}>
                {errors.gasLimit.message}
              </Text>
            )}
          </Flex>
        </VStack>
        <Button type="submit">Sign Transaction</Button>
        <Box wordBreak="break-word">
          <Text>result: {result}</Text>
        </Box>
      </VStack>
    </Flex>
  );
};