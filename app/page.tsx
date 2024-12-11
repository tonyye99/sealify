import { Button } from '@/components/ui/button'
import { HStack } from '@chakra-ui/react'

export default function Home() {
  return (
    <div>
      <HStack>
        <Button color="purple.emphasized" bgColor="green.200" padding="2">
          Click me
        </Button>
      </HStack>
    </div>
  )
}
