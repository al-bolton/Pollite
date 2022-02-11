import { Flex } from "@chakra-ui/react";
import Image from 'next/image';

type Props = {

}

const LogoBar: React.FC<Props> = () => {
  return (
    <Flex my={10} direction="row-reverse" >
      <Image src={'/logo_dark_bg.svg'} height="100" width="200" alt="Pollite logo"></Image>
    </Flex>
  )
}

export default LogoBar;