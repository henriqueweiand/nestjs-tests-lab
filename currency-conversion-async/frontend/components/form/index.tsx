import { Alert, AlertIcon, Button, ButtonGroup, Card, CardBody, CardFooter, CardHeader, Divider, FormControl, FormHelperText, FormLabel, Heading, Input, NumberInput, NumberInputField, Select, Stack, Textarea, useToast } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

export const newTopicFormSchema = z.object({
    email: z.string().email(),
    from: z.string().nonempty(),
    to: z.string().nonempty(),
    amount: z.string().nonempty().transform((val) => parseInt(val, 10)),
    comment: z.string().optional(),
})

export type NewTopicFormInputs = z.infer<typeof newTopicFormSchema>

const Form: React.FC = () => {
    const toast = useToast()
    const [currencies, setCurrencies] = useState([])

    const {
        register,
        handleSubmit,
        reset,
        formState: { isValid, defaultValues },
    } = useForm<NewTopicFormInputs>({
        defaultValues: {
            from: 'USD',
            to: 'EUR',
        },
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
                            <Input value={defaultValues?.email} required data-testid="email" type='email' {...register('email')} />
                            <FormHelperText>We'll never share your email.</FormHelperText>
                        </FormControl>

                        {
                            currencies.length == 0 ? 'Loading' : (
                                <>
                                    <FormControl>
                                        <FormLabel>From</FormLabel>
                                        <Select defaultValue={defaultValues?.from} required data-testid="from" placeholder='Select currency' {...register('from')}>
                                            {Object.keys(currencies).map((key) => <option key={key} value={key}>{currencies[key]}</option>)}
                                        </Select>
                                    </FormControl>

                                    <FormControl>
                                        <FormLabel>To</FormLabel>
                                        <Select defaultValue={defaultValues?.to} required data-testid="to" placeholder='Select currency' {...register('to')}>
                                            {Object.keys(currencies).map((key) => <option key={key} value={key}>{currencies[key]}</option>)}
                                        </Select>
                                    </FormControl>
                                </>
                            )
                        }

                        <FormControl>
                            <FormLabel>Amount</FormLabel>
                            <NumberInput min={1}>
                                <NumberInputField data-testid="amount" required {...register('amount')} />
                            </NumberInput>
                        </FormControl>

                        <FormControl>
                            <FormLabel>Comment</FormLabel>
                            <Textarea data-testid="comment" {...register('comment')} />
                        </FormControl>
                    </Stack>

                </CardBody>

                <Divider />

                {
                    !isValid && (
                        <Alert status='info' data-testid="alert">
                            <AlertIcon />
                            Fill out all the fields
                        </Alert>
                    )
                }
                <CardFooter display={"flex"} gap={4}>
                    <ButtonGroup spacing='2'>
                        <Button data-testid="submit" disabled={!isValid} type='submit' variant='solid' colorScheme={isValid ? 'blue' : 'red'}>
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