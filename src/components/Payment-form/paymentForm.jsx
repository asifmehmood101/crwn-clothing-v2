import { async } from '@firebase/util';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import React from 'react';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import { FormContainer, PaymentFormContainer } from './PaymentForm.style';

export const PaymentForm = () => {
  const stripe = useStripe(); // make payment in stripe format
  const elements = useElements();
  const paymentHandler = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const response = await fetch(
      '/.netlify/functions/create-payment-intent.js',
      {
        method: 'post',
        headers: {
          'content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: 1000 }),
      },
    ).then((res) => res.json());

    console.log(response);
  };

  return (
    <PaymentFormContainer>
      <FormContainer onSubmit={paymentHandler}>
        <h2>Credit Card Payment:</h2>
        <CardElement />
        <Button buttonType={BUTTON_TYPE_CLASSES.inverted}>Pay Now</Button>
      </FormContainer>
    </PaymentFormContainer>
  );
};
