import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";

test("renders App without crashing", () => {
  render(<App />);
});


/*************test if the form can be filled in and submitted *****/
test('form can be filled in and submitted', () => {

  const { getByTestId, getByPlaceholderText } = render(<App />);
  const firstNameInput = getByPlaceholderText(/edd/i);
  const lastNameInput = getByPlaceholderText(/burke/i);
  const emailInput = getByTestId(/email/i);
  const messageInput = getByTestId(/message/i);

  expect(firstNameInput).toBeInTheDocument();
  expect(lastNameInput).toBeInTheDocument();
  expect(emailInput).toBeInTheDocument();
  expect(messageInput).toBeInTheDocument();

  fireEvent.change(firstNameInput , {
    target: { name: 'firstName', value: 'Tom'}
  });
  fireEvent.change(lastNameInput, {
    target: {name: "lastName", value: "Forrest"}
  });
  fireEvent.change(emailInput, {
      target: {name: "email", value: "tf@hotmail.com"}
  });
  fireEvent.change(messageInput , {
      target: {name: "message", value: "what's up with tests"}
  });

  const submitButton = getByTestId(/submit/i);
  fireEvent.click(submitButton);

})

/*******test if you get error messages *****************/
test('make sure the error messages are shown', async() => {
  const{ getByTestId, getByPlaceholderText,queryByText } = render(<App />);
  const firstNameInput = getByPlaceholderText(/edd/i);

  fireEvent.change(firstNameInput , {
    target: { name: 'firstName', value: 'Chris'}
  });

  await waitFor(() => expect(queryByText(/looks like there was an error/i)))

})