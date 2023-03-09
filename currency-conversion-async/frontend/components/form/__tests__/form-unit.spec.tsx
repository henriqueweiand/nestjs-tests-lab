import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Form from '../index';

global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve({
        USD: 'US Dollar',
        EUR: 'Euro',
        GBP: 'British Pound',
    })
}))

describe('Form', () => {
    it('renders all form fields', async () => {
        await act(async () => {
            render(<Form />)
        })

        expect(screen.getByLabelText('Email address')).toBeInTheDocument();
        expect(screen.getByLabelText('From')).toBeInTheDocument();
        expect(screen.getByLabelText('To')).toBeInTheDocument();
        expect(screen.getByLabelText('Amount')).toBeInTheDocument();
        expect(screen.getByLabelText('Comment')).toBeInTheDocument();
    });

    describe('Should render the select option', () => {
        it('Should render the select option field from', async () => {
            await act(async () => {
                render(<Form />)
            })

            await screen.findByLabelText('From');

            expect(screen.getByLabelText('From')).toHaveTextContent('US Dollar');
            expect(screen.getByLabelText('From')).toHaveTextContent('Euro');
            expect(screen.getByLabelText('From')).toHaveTextContent('British Pound');
        })

        it('Should render the select option field to', async () => {
            await act(async () => {
                render(<Form />)
            })

            await screen.findByLabelText('To');

            expect(screen.getByLabelText('To')).toHaveTextContent('US Dollar');
            expect(screen.getByLabelText('To')).toHaveTextContent('Euro');
            expect(screen.getByLabelText('To')).toHaveTextContent('British Pound');
        })
    })

})
