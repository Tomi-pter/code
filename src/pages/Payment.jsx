import React, { useState} from 'react';
import { HeaderNav } from '../components/partials/HeaderNav';
import { Footer } from '../components/partials/Footer';
import { Radio } from 'antd';
import GooglePay from '../assets/img/Payment/Google_Pay.svg';
import ApplePay from '../assets/img/Payment/Apple_Pay.svg';
import { CreditCardOptions } from '../components/pages/payment/CreditCardOptions'
export const Payment = () => {

    const [value, setValue] = useState("credit_card");

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
        setValue(value);
        console.log(value);
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
                                        <CreditCardOptions value={value} />
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
