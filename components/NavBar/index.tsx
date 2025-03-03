'use client'

import { Box, Flex, Text, IconButton, useBreakpointValue, useDisclosure, Stack } from '@chakra-ui/react'
import { AlignJustify, X } from 'lucide-react'
import { useColorModeValue } from '@/components/ui/color-mode'

interface NavBarProps {
  userMenu: React.ReactNode
}

export default function NavBar({ userMenu }: NavBarProps) {
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
            color={useColorModeValue('blue.800', 'white')}
          >
            Sealify
          </Text>

          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            {/* <DesktopNav /> */}
          </Flex>
        </Flex>

        <Stack flex={{ base: 1, md: 0 }} justify={'flex-end'} direction={'row'} spaceX={6}>
          {userMenu}
        </Stack>
      </Flex>
    </Box>
  )
}
