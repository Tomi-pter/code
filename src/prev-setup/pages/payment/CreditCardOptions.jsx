import React, { useState, useEffect } from 'react';
import { Formik, Field, Form, FieldArray } from "formik";
import DefaultCard from '../../../assets/img/Payment/default-check-icon.svg';
import { PaymentInputsWrapper, usePaymentInputs } from 'react-payment-inputs';
import images from 'react-payment-inputs/images';
export const CreditCardOptions = (props) => {
    const {
        value
    } = props;
    const {
        wrapperProps,
        getCardImageProps,
        getCardNumberProps,
        getExpiryDateProps,
        getCVCProps,
        meta
    } = usePaymentInputs();
    const [cardInfo, setCardInfo] = useState([]);
    const [defaultCard, setDefaultCard] = useState();
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

    return (
        <>
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
                                                                                        <img className="delete-icon mr-4 mt-4" src={require("../../../assets/img/delete_icon.svg")} />
                                                                                    </a>
                                                                                </div>
                                                                                <div className="col-lg-2">
                                                                                    <svg className="creditCard-icon" {...getCardImageProps({ images })} />
                                                                                </div>
                                                                                <div className="col-lg-5 d-flex flex-column">
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
                                                                                <div className="col-lg-3 d-flex flex-row flex-lg-column text-center">
                                                                                    <Field className="expiryDate" name="expiryDate">
                                                                                        {({ field }) => (
                                                                                            <input {...getExpiryDateProps({ onBlur: field.onBlur, onChange: field.onChange })} />
                                                                                        )}
                                                                                    </Field>
                                                                                    <Field className="cvc" name="cvc">
                                                                                        {({ field }) => <input {...getCVCProps({ onBlur: field.onBlur, onChange: field.onChange })} />}
                                                                                    </Field>
                                                                                </div>
                                                                                <div className="col-lg-2 text-center">
                                                                                    <img className="defaultCardIcon" src={DefaultCard} />
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
        </>
    )

}