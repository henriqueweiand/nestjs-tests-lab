import Form from '@/components/form'
import { Container, VStack } from '@chakra-ui/react'

import type { NextPage } from 'next'

const Home: NextPage = () => {
  return (
    <VStack height={"100vh"} justifyContent="center" display="flex">
      <Container maxW='md' minW={'xs'} >
        <Form />
      </Container>
    </VStack>
  )
}

export default Home