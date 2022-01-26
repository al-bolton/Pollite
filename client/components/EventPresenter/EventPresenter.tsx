import {
  Container,
  SimpleGrid,
  Image,
  Flex,
  Heading,
  Text,
  Stack,
  StackDivider,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  MdWebAsset,
  MdPhone,
  MdMap,
} from 'react-icons/md';
import { ReactElement } from 'react';
import { DBDate } from 'data/types/db/DBDate.type';
import { DBVenue } from 'data/types/db/DBVenue.type';
import styles from './EventPresenter.module.css'

interface FeatureProps {
  text: string;
  iconBg: string;
  icon?: ReactElement;
}

const Feature = ({ text, icon, iconBg }: FeatureProps) => {
  return (
    <Stack direction={'row'} align={'center'}>
      <Flex
        w={8}
        h={8}
        align={'center'}
        justify={'center'}
        rounded={'full'}
        bg={iconBg}>
        {icon}
      </Flex>
      <Text fontWeight={600}>{text}</Text>
    </Stack>
  );
};

interface SplitWithImageProps {
  date: DBDate,
  venue: DBVenue,
}

export default function SplitWithImage({ date, venue }: SplitWithImageProps) {
  return (
    <Container className={styles.jackInTheBox} maxW={'5xl'} py={12} bg="#122A48" border="1px solid white" borderLeftRadius={0} borderRightRadius={10} my={10}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
        <Stack spacing={4}>
          <Text
            textTransform={'uppercase'}
            color={'blue.400'}
            fontWeight={600}
            fontSize={'sm'}
            bg={useColorModeValue('blue.50', 'blue.900')}
            p={2}
            alignSelf={'flex-start'}
            rounded={'md'}>
            Good to go!
          </Text>
          <Heading>Your event details are ready to go!</Heading>
          <Text fontSize={'lg'}>
            {`${date.votes} ${date.votes > 1 ? 'people' : 'person'} can attend on ${date.dateString}, and you're heading to ${venue.name}!`}
          </Text>
          <Stack
            spacing={4}
            divider={
              <StackDivider
                borderColor={useColorModeValue('gray.100', 'gray.700')}
              />
            }>
            <Feature
              icon={
                <Icon as={MdWebAsset} color={'yellow.500'} w={5} h={5} />
              }
              iconBg={useColorModeValue('yellow.100', 'yellow.900')}
              text={venue.website}
            />
            <Feature
              icon={<Icon as={MdPhone} color={'green.500'} w={5} h={5} />}
              iconBg={useColorModeValue('green.100', 'green.900')}
              text={venue.phone}
            />
            <Feature
              icon={
                <Icon as={MdMap} color={'purple.500'} w={5} h={5} />
              }
              iconBg={useColorModeValue('purple.100', 'purple.900')}
              text={venue.address}
            />
          </Stack>
        </Stack>
        <Flex>
          <Image
            rounded={'md'}
            alt={'feature image'}
            src={venue.imgUrl}
            objectFit={'cover'}
          />
        </Flex>
      </SimpleGrid>
    </Container>
  );
}