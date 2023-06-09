import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import ContactForm from './ContactForm';

test('renders without errors', () => {
render (<ContactForm /> );
});

test('renders the contact form header', () => {
    render (<ContactForm /> );
    const contactFormHeader = screen.getByText(/contact form/i);
    expect(contactFormHeader).toBeInTheDocument();
    expect(contactFormHeader).toBeTruthy();
    expect(contactFormHeader).toHaveTextContent(/contact form/i);
});

test('renders ONE error message if user enters less than 5 chars into the first Name input field', async () => {
    render (<ContactForm />);

    const firstNameField = screen.getByLabelText(/First Name/i);
    userEvent.type(firstNameField, '123');

    const errorMessages = await screen.findAllByTestId('error');
    expect(errorMessages).toHaveLength(1);
} );

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render (<ContactForm />);

    const submitButton = screen.getByRole('button');
    userEvent.click(submitButton);

    const errorMessages = await screen.findAllByTestId('error');
    expect(errorMessages).toHaveLength(3);
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm />);

    const firstNameInput = screen.getByLabelText(/first name*/i);
    userEvent.type(firstNameInput, 'peter');

    const lastNameInput = screen.getByLabelText(/last name*/i);
    userEvent.type(lastNameInput, 'arguelles');
    
    const button = screen.getByRole('button');
    userEvent.click(button);

    const errorMessages = await screen.findAllByTestId('error');
    expect(errorMessages).toHaveLength(1);

});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm /> );
    
    const emailInput = screen.getByLabelText(/email*/i);
    userEvent.type(emailInput, 'testing');

    const emailError = await screen.findByText(/email must be a valid email address/i);
    expect(emailError).toBeInTheDocument();
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm />);
    const firstNameInput = screen.getByLabelText(/first name*/i);
    userEvent.type(firstNameInput, 'peter');

    const emailInput = screen.getByLabelText(/email*/i);
    userEvent.type(emailInput, 'testing@mdail.com');
    
    const button = screen.getByRole('button');
    userEvent.click(button);

    const lastNameError = screen.getByText(/lastName is a required field/i);
    expect(lastNameError).toBeInTheDocument();
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm /> );
    const emailInput = screen.getByLabelText(/email*/i);
    const firstNameInput = screen.getByLabelText(/first name*/i);
    const lastNameInput = screen.getByLabelText(/last name*/i);
    userEvent.type(emailInput, 'testing@mdail.com');
    userEvent.type(firstNameInput, 'peter');
    userEvent.type(lastNameInput, 'arguelles');
    const button = screen.getByRole('button');
    userEvent.click(button);

    await waitFor(() => {
        const firstnameDisplay = screen.queryByTestId('firstnameDisplay');
        const lastnameDisplay = screen.queryByTestId('lastnameDisplay');
        const emailDisplay = screen.queryByTestId('emailDisplay');
        const messageDisplay = screen.queryByTestId('messageDisplay');

        expect(firstnameDisplay).toBeInTheDocument();
        expect(lastnameDisplay).toBeInTheDocument();
        expect(emailDisplay).toBeInTheDocument();
        expect(messageDisplay).not.toBeInTheDocument();

    });
});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm /> );
    const emailInput = screen.getByLabelText(/email*/i);
    const firstNameInput = screen.getByLabelText(/first name*/i);
    const lastNameInput = screen.getByLabelText(/last name*/i);
    const messageInput = screen.getByLabelText(/message/i)
    userEvent.type(emailInput, 'testing@mdail.com');
    userEvent.type(firstNameInput, 'peter');
    userEvent.type(lastNameInput, 'arguelles');
    userEvent.type(messageInput, 'hello');
    const button = screen.getByRole('button');
    userEvent.click(button);

    await waitFor(() => {
        const firstnameDisplay = screen.queryByTestId('firstnameDisplay');
        const lastnameDisplay = screen.queryByTestId('lastnameDisplay');
        const emailDisplay = screen.queryByTestId('emailDisplay');
        const messageDisplay = screen.queryByTestId('messageDisplay');

        expect(firstnameDisplay).toBeInTheDocument();
        expect(lastnameDisplay).toBeInTheDocument();
        expect(emailDisplay).toBeInTheDocument();
        expect(messageDisplay).toBeInTheDocument();

    });

});
