'use client'

import { Box, Flex, Text, IconButton, Button, Stack, useBreakpointValue, useDisclosure } from '@chakra-ui/react'
import { AlignJustify, X } from 'lucide-react'
import { useColorModeValue } from '@/components/ui/color-mode'

export default function NavBar() {
  const { open, onToggle } = useDisclosure()

  return (
    <Box>
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}
      >
        <Flex flex={{ base: 1, md: 'auto' }} ml={{ base: -2 }} display={{ base: 'flex', md: 'none' }}>
          <IconButton onClick={onToggle} variant={'ghost'} aria-label={'Toggle Navigation'}>
            {open ? <X size={12} /> : <AlignJustify size={12} />}
          </IconButton>
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          <Text
            textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
            fontFamily={'heading'}
            color={useColorModeValue('gray.800', 'white')}
          >
            Sealify
          </Text>

          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            {/* <DesktopNav /> */}
          </Flex>
        </Flex>

        <Stack flex={{ base: 1, md: 0 }} justify={'flex-end'} direction={'row'} spaceX={6}>
          <Button as={'a'} fontSize={'sm'} fontWeight={400} variant="ghost">
            Sign In
          </Button>
          <Button
            as={'a'}
            display={{ base: 'none', md: 'inline-flex' }}
            fontSize={'sm'}
            fontWeight={600}
            color={'white'}
            bg={'blue.600'}
            _hover={{
              bg: 'blue.700',
            }}
          >
            Sign Up
          </Button>
        </Stack>
      </Flex>
    </Box>
  )
}
