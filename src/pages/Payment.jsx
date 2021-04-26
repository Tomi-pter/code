import React, { useState, useEffect} from 'react';
import { HeaderNav } from '../components/partials/HeaderNav';
import { Footer } from '../components/partials/Footer';
// import { Radio } from 'antd';
import GooglePay from '../assets/img/Payment/Google_Pay.svg';
import ApplePay from '../assets/img/Payment/Apple_Pay.svg';
// import { CreditCardOptions } from '../components/pages/payment/CreditCardOptions'

import { PaymentInputsWrapper, usePaymentInputs } from 'react-payment-inputs';
import images from 'react-payment-inputs/images';

// import {loadStripe} from '@stripe/stripe-js';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

// import {
//   CardElement,
//   useStripe,
//   useElements
// } from '@stripe/react-stripe-js';

import { getPaymentMethods, addPaymentMethod } from '../actions/paymentMethods';
import { useHistory } from 'react-router';
import { payment } from '../actions/payment';

// const useOptions = () => {
//     const options = {hidePostalCode: true}
  
//     return options;
//   };

export const PaymentContainer = () => {
    const user = JSON.parse(localStorage.getItem('profile'));
    const paymentMethods = useSelector((state) => state.paymentMethods);
    const [formData, setFormData] = useState({});
    const [paymentformData, setPaymentFormData] = useState({});
    const dispatch = useDispatch();
    const history = useHistory();

    const {
        wrapperProps,
        getCardImageProps,
        getCardNumberProps,
        getExpiryDateProps,
        getCVCProps
      } = usePaymentInputs();

    // const [value, setValue] = useState("credit_card");

    console.log(paymentMethods);

    const paymentInfo = [
        {
            name: 'Credit Card',
            value: 'credit_card'
        },
        {
            name: <img className="payment-icon" src={GooglePay} alt="" />,
            value: 'google_pay'
        },
        {
            name: <img className="payment-icon" src={ApplePay} alt="" />,
            value: 'apple_pay'
        }
    ]
    // const selectedPaymentMethod = (value) => {
    //     setValue(value);
    //     console.log(value);
    // }

    // const stripe = useStripe();
    console.log(images);
//   const elements = useElements();
//   const options = useOptions();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const cardDetails = {
    //     type: 'card',
    //     card: elements.getElement(CardElement),
    // };

    // console.log(elements.getElement(CardElement));

    dispatch(addPaymentMethod(user?.username, formData));
    
    // const {error, paymentMethod} = await stripe.createPaymentMethod({
    //   type: 'card',
    //   card: elements.getElement(CardElement),
    // });

    // console.log(error, paymentMethod);
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    dispatch(payment(user?.username, paymentformData, history));
  }

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('profile'));
        dispatch(getPaymentMethods(user?.username));
    }, [dispatch]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleExpireDateChange = (e) => {
    const value = e.target.value.split("/");
    if ( value[1]) {
        const expMonth = value[0].trim();
        const expYear = value[1].trim();
        setFormData({ ...formData, expMonth, expYear })
    }
  };

  const handlePaymentChange = (e) => setPaymentFormData({ ...paymentformData, [e.target.name]: e.target.value });

    return (
        <>
            <HeaderNav />
            <div className="payment-page">
                <div className="container-fluid">
                    <div className="row row-wrapper">
                        <div className="col-12">
                            <h1 className="section-title">Payment</h1>
                        </div>
                    </div>
                    <div className="row row-wrapper">
                        <div className="col-lg-8">
                            <div className="card payment-card position-relative">
                                <div className="row row-wrapper">
                                    <div className="col-lg-12">
                                        <h2 className="card-title">Payment Methods</h2>
                                        {/* <Radio.Group className="radioButtonWrapper col-lg-12" buttonStyle="solid" onChange={(e) => selectedPaymentMethod(e.target.value)} value={value}> */}
                                            <div className="row text-center justify-content-center justify-content-md-center">
                                                {paymentInfo.map((item, index) => (
                                                    <div key={`key-${index}`} className="col-lg-4 text-center mb-5">
                                                        {/* <Radio.Button
                                                            key={index}
                                                            value={item.value}
                                                            className="col-lg-12 d-flex align-items-center justify-content-center payment-option"
                                                        > */}
                                                            {item.name}
                                                        {/* </Radio.Button> */}
                                                    </div>
                                                ))}
                                            </div>
                                        {/* </Radio.Group> */}
                                    </div>
                                    <div className="col-lg-12">
                                        {/* <CreditCardOptions value={value} /> */}
                                            <PaymentInputsWrapper {...wrapperProps}>
                                                <svg {...getCardImageProps({ images })} />
                                                <input {...getCardNumberProps({onChange: handleChange})} />
                                                <input {...getExpiryDateProps({onChange: handleExpireDateChange})} />
                                                <input {...getCVCProps({onChange: handleChange})} />
                                            </PaymentInputsWrapper>

                                            <button onClick={handleSubmit}>
                                                    ADD
                                            </button>

                                        <form onSubmit={handlePayment}>
                                            <input type="text" placeholder="Payment Method ID" name="paymentMethodId" onChange={handlePaymentChange} required />
                                            <input type="number" placeholder="Amount" name="amount" onChange={handlePaymentChange} required />
                                            <button type="submit">
                                                PAY
                                            </button>
                                        </form> 


                                        {/* <form onSubmit={handleSubmit}>
                                            <input type="number" placeholder="Card Number" name="cardNumber" onChange={handleChange} required />
                                            <input type="text" placeholder="Month" name="expMonth" onChange={handleChange} required />
                                            <input type="number" placeholder="Year" name="expYear" onChange={handleChange} required />
                                            <input type="number" placeholder="CVC" name="cvc" onChange={handleChange} required />
                                            <button type="submit">
                                                ADD
                                            </button>
                                        </form> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="card total-card position-relative">
                                <div className="row row-wrapper">
                                    <div className="col-lg-12">
                                        <h2 className="card-title">Total Amount</h2>
                                        <h1 className="price-text">320.00 <span className="currency-text">USD</span></h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};
