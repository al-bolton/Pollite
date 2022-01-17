import { Flex, Image } from "@chakra-ui/react"

type Props = {

}

const LogoBar: React.FC<Props> = () => {
  return (
    <Flex direction="row-reverse">
      <Image my={10} src="logo_dark_bg.svg" h="5rem"></Image>
    </Flex>
  )
}

export default LogoBar;