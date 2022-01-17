import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      body: {
        color: 'white',
        backgroundImage: 'url(/bg.svg)',
        backgroundSize: 'cover'
      }

    }
  }
});

export default theme;