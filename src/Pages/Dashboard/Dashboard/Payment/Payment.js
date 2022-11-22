import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js'
import React from 'react';
import { useLoaderData, useNavigation } from 'react-router-dom';
import CheckoutForm from './CheckoutForm';
import Loading from '../../../Shared/Loading/Loading';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

const Payment = () => {
    const booking = useLoaderData();
    const navigation = useNavigation()
    const {treatment, price, appointmentDate, slot} = booking;

    if(navigation.state === "loading") {
        return <Loading />
    }

    return (
        <div>
            <h2 className="text-4xl">Payment for {treatment}</h2>
            <p className="text-xl">Please pay ${price} for yor appointment on {appointmentDate} at {slot}.</p>
            <div className="w-96 my-12">
                <Elements stripe={stripePromise}>
                    <CheckoutForm booking={booking} />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;