import { Button, ButtonGroup, Card, CardBody, CardFooter, CardHeader, Divider, FormControl, FormHelperText, FormLabel, Heading, Input, NumberInput, NumberInputField, Select, Stack, Textarea, useToast } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const newTopicFormSchema = z.object({
    email: z.string().email(),
    from: z.string(),
    to: z.string(),
    amount: z.string().transform((val) => parseInt(val, 10)),
    comment: z.string().optional(),
})

type NewTopicFormInputs = z.infer<typeof newTopicFormSchema>

const Form: React.FC = () => {
    const toast = useToast()
    const [currencies, setCurrencies] = useState([])

    const {
        register,
        handleSubmit,
        reset,
        formState: { isSubmitting },
    } = useForm<NewTopicFormInputs>({
        resolver: zodResolver(newTopicFormSchema),
    })

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('/currency-list.json')
            const data = await response.json()
            setCurrencies(data)
        }
        fetchData()
    }, [])

    async function handleCreateTopic(form: NewTopicFormInputs) {
        try {
            await fetch('/api/queue', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form)
            })

            reset()
            toast({
                description: 'Your order was received',
                status: 'success',
                isClosable: true,
            })
        } catch (e) {
            toast({
                description: 'Was not possible to receive your order',
                status: 'error',
                isClosable: true,
            })
        }

    }

    return (
        <Card maxW='100%'>
            <CardHeader>
                <Heading size='md'>Currency exchange order</Heading>
            </CardHeader>

            <form onSubmit={handleSubmit(handleCreateTopic)}>
                <CardBody pt={0}>

                    <Stack spacing='4'>
                        <FormControl>
                            <FormLabel>Email address</FormLabel>
                            <Input required type='email' {...register('email')} />
                            <FormHelperText>We'll never share your email.</FormHelperText>
                        </FormControl>

                        <FormControl>
                            <FormLabel>From</FormLabel>
                            <Select required placeholder='Select currency' {...register('from')}>
                                {Object.keys(currencies).map((key) => <option key={key} value={key}>{currencies[key]}</option>)}
                            </Select>
                        </FormControl>

                        <FormControl>
                            <FormLabel>To</FormLabel>
                            <Select required placeholder='Select currency' {...register('to')}>
                                {Object.keys(currencies).map((key) => <option key={key} value={key}>{currencies[key]}</option>)}
                            </Select>
                        </FormControl>

                        <FormControl>
                            <FormLabel>Amount</FormLabel>
                            <NumberInput min={1}>
                                <NumberInputField required {...register('amount')} />
                            </NumberInput>
                        </FormControl>

                        <FormControl>
                            <FormLabel>Comment</FormLabel>
                            <Textarea {...register('comment')} />
                        </FormControl>
                    </Stack>

                </CardBody>

                <Divider />

                <CardFooter>
                    <ButtonGroup spacing='2'>
                        <Button type='submit' variant='solid' colorScheme='blue'>
                            Send
                        </Button>
                        <Button onClick={() => reset()} variant='ghost' colorScheme='blue'>
                            Clear
                        </Button>
                    </ButtonGroup>
                </CardFooter>
            </form>
        </Card>
    )
}

export default Form;