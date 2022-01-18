import { ReactNode, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Box,
  Flex,
  HStack,
  Button,
  Text,
  Input,
  useColorModeValue,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

export default function withAction() {
  const [voting, setVoting] = useState<boolean>(false);
  const [resulting, setResulting] = useState<boolean>(false);

  const [code, setCode] = useState<string>('');

  return (
    <>
      <Box bg={"#001027"} px="13%" w="full">
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <HStack spacing={8} alignItems={'center'}>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}>
              <Box px={2}
                py={1}
                rounded={'md'}
                _hover={{
                  textDecoration: 'none',
                  bg: "#255fb3",
                  cursor: 'pointer'
                }}>

                <Text fontSize="xl" onClick={e => setVoting(true)}>Vote</Text>
              </Box>
              <Box px={2}
                py={1}
                rounded={'md'}
                _hover={{
                  textDecoration: 'none',
                  bg: "#255fb3",
                  cursor: 'pointer'
                }}>
                <Text fontSize="xl" onClick={e => setResulting(true)}>Results</Text>
              </Box>
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            <Link href={'/create'}>
              <Button
                variant={'solid'}
                colorScheme={'teal'}
                size={'sm'}
                mr={2}
                leftIcon={<AddIcon />}
                fontSize="xl">
                Create poll
              </Button>
            </Link>
            <Image src={'/logo_dark_bg.svg'} height="50" width="200"></Image>
          </Flex>
        </Flex>
      </Box >

      <Modal motionPreset="slideInBottom" isOpen={voting} onClose={() => setVoting(false)}>
        <ModalOverlay />
        <ModalContent bgColor="#122A48">
          <Flex direction="column" alignItems="center">
            <ModalHeader>Poll created!</ModalHeader>
            <ModalCloseButton />
            <ModalBody content="center">
              <Text>Enter poll code</Text>
              <Input value={code} onChange={(e) => setCode(e.target.value)}></Input>
            </ModalBody>

            <ModalFooter>
              <Link href={`/${code}/vote`}>
                <Button colorScheme='blue' mr={3}>
                  Go to poll vote page
                </Button>
              </Link>
            </ModalFooter>
          </Flex>
        </ModalContent>
      </Modal>

      <Modal motionPreset="slideInBottom" isOpen={resulting} onClose={() => setResulting(false)}>
        <ModalOverlay />
        <ModalContent bgColor="#122A48">
          <Flex direction="column" alignItems="center">
            <ModalHeader>Poll created!</ModalHeader>
            <ModalCloseButton />
            <ModalBody content="center">
              <Text>Enter poll code</Text>
              <Input value={code} onChange={(e) => setCode(e.target.value)}></Input>
            </ModalBody>

            <ModalFooter>
              <Link href={`/${code}/results`}>
                <Button colorScheme='blue' mr={3}>
                  Go to poll results page
                </Button>
              </Link>
            </ModalFooter>
          </Flex>
        </ModalContent>
      </Modal>
    </>
  );
}