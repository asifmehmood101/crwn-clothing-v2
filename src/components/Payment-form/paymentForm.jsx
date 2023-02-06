import { async } from '@firebase/util';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import React from 'react';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import { FormContainer, paymentFormContainer } from './PaymentForm.style';

export const PaymentForm = () => {
  const stripe = useStripe(); // make payment in stripe format
  const elements = useElements();
  const paymentHandler = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }
  };

  return (
    <paymentFormContainer>
      <FormContainer onSubmit={paymentHandler}>
        <h2>Credit Card Payment</h2>
        <CardElement />
        <Button buttonType={BUTTON_TYPE_CLASSES.inverted}>Pay Now</Button>
      </FormContainer>
    </paymentFormContainer>
  );
};
