import React, { useState, useEffect } from 'react';
import { render } from "react-dom";
import { HeaderNav } from '../components/partials/HeaderNav';
import { Footer } from '../components/partials/Footer';
import { Radio, Input, Button } from 'antd';
import { Formik, Field, Form, FieldArray } from "formik";
import GooglePay from '../assets/img/Payment/Google_Pay.svg';
import ApplePay from '../assets/img/Payment/Apple_Pay.svg';
import MasterCardLogo from '../assets/img/Payment/master-card-logo.svg';
import DefaultCard from '../assets/img/Payment/default-check-icon.svg';
import { PaymentInputsWrapper, usePaymentInputs } from 'react-payment-inputs';
import images from 'react-payment-inputs/images';
export const Payment = () => {
    const {
        wrapperProps,
        getCardImageProps,
        getCardNumberProps,
        getExpiryDateProps,
        getCVCProps,
        meta
    } = usePaymentInputs();
    const initialValues = {
        creditCardInfo: [
            {
                holderName: "",
                cardNumber: "",
                expiryDate: "",
                ccv: ""
            }
        ]
    };

    const [value, setValue] = useState("credit_card");
    const [cardInfo, setCardInfo] = useState([]);
    const [defaultCard, setDefaultCard] = useState();
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
    const selectedPaymentMethod = (value) => {
        // You can use Hooks here!
        setValue(value);
        console.log(value);
    }
    const addNewCard = (cardInfo) => {
        setCardInfo(cardInfo => [...cardInfo, {
            creditCardHolder: cardInfo.creditCardHolder,
            creditCardNumber: cardInfo.creditCardNumber,
            creditCardExpiry: cardInfo.creditCardNumber,
            creditCardCvv: cardInfo.creditCardNumber
        }]);
    }
    const defaultCreditCard = (event) => {
        setDefaultCard(event.values);
    }
    return (
        <>
            <HeaderNav />
            <div className="payment-page">
                <div className="container-fluid">
                    <div className="row row-wrapper">
                        <div chlassName="col-12">
                            <h1 className="section-title">Payment</h1>
                        </div>
                    </div>
                    <div className="row row-wrapper">
                        <div className="col-md-8">
                            <div className="card payment-card position-relative">
                                <div className="row row-wrapper">
                                    <div className="col-md-12">
                                        <h2 className="card-title">Payment Methods</h2>
                                        <Radio.Group className="radioButtonWrapper col-md-12" buttonStyle="solid" onChange={(e) => selectedPaymentMethod(e.target.value)} value={value}>
                                            <div className="row text-center justify-content-center justify-content-md-center">
                                                {paymentInfo.map((item, index) => (
                                                    <div className="col-md-4 text-center">
                                                        <Radio.Button
                                                            key={index}
                                                            value={item.value}
                                                            className="col-md-12 d-flex align-items-center justify-content-center payment-option"
                                                        >
                                                            {item.name}
                                                        </Radio.Button>
                                                    </div>
                                                ))}
                                            </div>
                                        </Radio.Group>
                                    </div>
                                    <div className="col-md-12">
                                        {(() => {
                                            switch (value) {
                                                case 'google_pay':
                                                    return (
                                                        <>
                                                            <div>
                                                                <h1>
                                                                    Google Play
                                                                </h1>
                                                            </div>
                                                        </>
                                                    );
                                                case 'apple_pay':
                                                    return (
                                                        <>
                                                            <div>
                                                                <h1>
                                                                    Apple Play
                                                                </h1>
                                                            </div>
                                                        </>
                                                    );
                                                default:
                                                    return (
                                                        <>
                                                            <div >
                                                                <Formik
                                                                    initialValues={initialValues}
                                                                    validate={() => {
                                                                        let errors = {};
                                                                        if (meta.erroredInputs.cardNumber) {
                                                                            errors.cardNumber = meta.erroredInputs.cardNumber;
                                                                        }
                                                                        if (meta.erroredInputs.expiryDate) {
                                                                            errors.expiryDate = meta.erroredInputs.expiryDate;
                                                                        }
                                                                        if (meta.erroredInputs.cvc) {
                                                                            errors.cvc = meta.erroredInputs.cvc;
                                                                        }
                                                                        return errors;
                                                                    }}
                                                                    onSubmit={values => {
                                                                        setTimeout(() => {
                                                                            alert(JSON.stringify(values, null, 2));
                                                                        }, 500);
                                                                    }}
                                                                    render={({ values, errors, touched, handleReset }) => {
                                                                        // console.group("formik");
                                                                        // console.log("touched", touched);
                                                                        console.log("values", values);
                                                                        // console.groupEnd("formik");
                                                                        return (
                                                                            <Form>
                                                                                <FieldArray
                                                                                    name="creditCardInfo"
                                                                                    render={({ insert, remove, push }) => (
                                                                                        <div className="paymentContainer">
                                                                                            <div role="group" aria-labelledby="my-radio-group">
                                                                                                {values.creditCardInfo.length > 0 &&
                                                                                                    values.creditCardInfo.map((item, index) => (
                                                                                                        <div className="paymentWrapper row d-flex align-items-center justify-content-center position-relative" >
                                                                                                            <div className="position-absolute" style={{ top: "0", right: "0" }}>
                                                                                                                <a onClick={() => remove(index)}>
                                                                                                                    <img className="delete-icon mr-4 mt-4" src={require("../assets/img/delete_icon.svg")} />
                                                                                                                </a>
                                                                                                            </div>
                                                                                                            <div className="col-md-2">
                                                                                                                <svg className="creditCard-icon" {...getCardImageProps({ images })} />
                                                                                                            </div>
                                                                                                            <div className="col-md-5 d-flex flex-column">
                                                                                                                <div>
                                                                                                                    <Field className="cardName">
                                                                                                                        {({ field }) => (
                                                                                                                            <input className="creditCard-Name" placeholder="John Doe" />
                                                                                                                        )}
                                                                                                                    </Field>
                                                                                                                </div>
                                                                                                                <div>
                                                                                                                    <Field className="cardNumber" name="cardNumber">
                                                                                                                        {({ field }) => (
                                                                                                                            <input className="creditCard-Number" {...getCardNumberProps({ onBlur: field.onBlur, onChange: field.onChange })} />
                                                                                                                        )}
                                                                                                                    </Field>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                            <div className="col-md-3  d-flex flex-column text-center">
                                                                                                                <Field className="expiryDate" name="expiryDate">
                                                                                                                    {({ field }) => (
                                                                                                                        <input {...getExpiryDateProps({ onBlur: field.onBlur, onChange: field.onChange })} />
                                                                                                                    )}
                                                                                                                </Field>
                                                                                                                <Field className="cvc" name="cvc">
                                                                                                                    {({ field }) => <input {...getCVCProps({ onBlur: field.onBlur, onChange: field.onChange })} />}
                                                                                                                </Field>
                                                                                                            </div>
                                                                                                            <div className="col-md-2 text-center">
                                                                                                                <img src={DefaultCard} />
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    ))}
                                                                                            </div>
                                                                                            <button
                                                                                                type="button"
                                                                                                className="addCardInfo"
                                                                                                onClick={() => push({ name: "", email: "" })}
                                                                                            >
                                                                                                + Add Credit Card
                                                                                            </button>
                                                                                        </div>
                                                                                    )}
                                                                                />
                                                                                <br />
                                                                                <button className="placeOrder" type="submit">Place Order</button>
                                                                            </Form>
                                                                        );
                                                                    }}
                                                                />
                                                            </div>
                                                        </>
                                                    );
                                            }
                                        })()}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card total-card position-relative">
                                <div className="row row-wrapper">
                                    <div className="col-md-12">
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
