import React, { useState, useEffect } from 'react';
import { PaymentInputsContainer } from 'react-payment-inputs';
import images from 'react-payment-inputs/images';
import DeleteIcon from '../../assets/img/Account/delete-icon.svg';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { getCards, addCard, getDefaultCard, setDefaultCard, removeCard } from '../../actions/cards';

// import 'react-square-payment-form/lib/default.css'

import {
  SquarePaymentForm,
  CreditCardNumberInput,
  CreditCardExpirationDateInput,
  CreditCardPostalCodeInput,
  CreditCardCVVInput,
  CreditCardSubmitButton
} from 'react-square-payment-form'

// const initialState = { cardNumber: "", cardholderName: "", cvc: "", expiry: "" };
const initialState = { cardNonce: "", cardholderName: "" };

export const Cards = ({ selectedCard, setSelectedCard, page }) => {
    const [formData, setFormData] = useState(initialState);
    const cards = useSelector((state) => state.cards);
    const [stateAddCard, setStateAddCard] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedDefaultCard, setSelectedDefaultCard] = useState('');
    const [selectedDeleteCard, setSelectedDeleteCard] = useState('');
    const [isDefaultLoading, setIsDefaultLoading] = useState(false);
    const [isDeleteLoading, setIsDeleteLoading] = useState(false);
    const [cardholderName, setCardholderName] = useState('');
    const dispatch = useDispatch();

    const [errorMessages, setErrorMEssage] = useState([]);

    const cardNonceResponseReceived = (errors, nonce, cardData, buyerVerificationToken) => {
        if (errors) {
            console.log(errors);
            setErrorMEssage(errors);
            return
        }

        setErrorMEssage([]);
        // console.log("nonce created: " + nonce + ", buyerVerificationToken: " + buyerVerificationToken)
        setIsLoading(true);
        const user = JSON.parse(localStorage.getItem('profile'));
        dispatch(addCard(user?.username, {...formData, cardNonce: nonce }));
        // console.log("nonce created: " + nonce + 'cardholder' + cardholderName);
    }

    const setCard = (cardType) => {
        switch (cardType) {
            case 'visa':
                return '4242';
            case 'mastercard':
                return '5555';
            case 'discover':
                return '6011';
            case 'amex':
                return '3784';
            case 'unionpay':
                return '6200';
            case 'diners':
                return '3056';
            case 'jcb':
                return '3566';
            default:
                return '';
        }
    }

    const handleAddCard = () => {
        setFormData(initialState);
        setStateAddCard(true);
    }

    const handleSetDefault = (id) => {
        setSelectedDefaultCard(id);
        setIsDefaultLoading(true);
        const user = JSON.parse(localStorage.getItem('profile'));
        dispatch(setDefaultCard(user?.username, id));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const user = JSON.parse(localStorage.getItem('profile'));
        dispatch(addCard(user?.username, formData));
    };

    const removeCreditCard = (id) => {
        setSelectedDeleteCard(id);
        setIsDeleteLoading(true);
        const user = JSON.parse(localStorage.getItem('profile'));
        dispatch(removeCard(user?.username, id));
    };

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    
    const handleExpireDateChange = (e) => {
        const value = e.target.value.split("/");
        if (value[1]) {
            const expMonth = value[0].trim();
            const expYear = value[1].trim();
            setFormData({ ...formData, expMonth, expYear, expiry: e.target.value })
        }
    };

    useEffect(() => {
        // const defaultCard = cards?.customerData?.invoice_settings?.default_payment_method;
        // if (defaultCard) {
        //     setSelectedCard(cards?.customerData?.invoice_settings?.default_payment_method);
        // } else {
        if (cards?.cardsData?.length > 0) setSelectedCard(cards?.cardsData[0].id);
        // };
        setIsLoading(false);
        setIsDeleteLoading(false);
        if (!cards.cardError) {
            setStateAddCard(false);
            setFormData(initialState);
            document.getElementById("modalClose").click();
        }
    }, [cards]);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('profile'));
        dispatch(getCards(user?.username));
        // dispatch(getDefaultCard(user?.username));
    }, [dispatch]);

    return (
        <div className="cardWrapper">
            { page === "payment" ?
                <div className="card-list">
                    {
                        cards.cardsData?.map((card, index) => (
                            <div
                                key={`key-list-${index}`}
                                className={"d-flex flex-row align-items-center justify-content-between card " + (selectedCard === card.id ? "active" : "")}
                                onClick={() => setSelectedCard(card.id)}
                            >
                                <div className="d-flex card-info">
                                    {/* <PaymentInputsContainer>
                                        {({ getCardNumberProps, getCardImageProps }) => (
                                            <div className="d-flex">
                                                <svg {...getCardImageProps({ images })} />
                                                <div>
                                                    <p className="name">{card.billing_details.name}</p>
                                                    <input {...getCardNumberProps()} value={`${setCard(card.card.brand)}`} id={`card-list-${index}`} readOnly />
                                                    <span className="card-number">*****************{card.card.last4}</span>
                                                </div>
                                            </div>
                                        )}
                                    </PaymentInputsContainer> */}
                                    <span className="card-number">*****************{card.last4}</span>
                                </div>
                                <div className="img-container">
                                    {selectedCard === card.id && <img src={require("../../assets/icon/card-active.svg")} alt="" />}
                                </div>
                            </div>
                        ))
                    }
                    <button className="add-card card" data-toggle="modal" data-target="#addCardModal" onClick={() => handleAddCard()}>
                        + Add New Card
                    </button>
                </div>
                :
                <div className="card-table">
                    <h2 className="sub-title">Payment Options</h2>
                    <h3 className="credit-title">Credit/Debit Card</h3>
                    <div className="">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Card Number</th>
                                    <th scope="col" colSpan="2">Expiry Date</th>
                                    {/* <th></th> */}
                                    {/* <th></th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    cards.cardsData?.map((card, index) => (
                                        <tr key={`key-${index}`} >
                                            <td>
                                                <span className="card-number">*****************{card.last4}</span>
                                                {/* <PaymentInputsContainer>
                                                    {({ getCardNumberProps, getCardImageProps, getExpiryDateProps }) => (
                                                        <div className="d-flex align-items-center">
                                                            <div className="mr-2">
                                                                <svg {...getCardImageProps({ images })} />
                                                            </div>
                                                            <div>
                                                                <input hidden {...getCardNumberProps()} value={`${setCard(card.card.brand)}`} id={`card-${index}`} readOnly />
                                                                <span className="card-number">*****************{card.card.last4}</span>
                                                            </div>
                                                        </div>
                                                    )}
                                                </PaymentInputsContainer> */}
                                            </td>
                                            <td>
                                                <div>
                                                    {card.expMonth}/{card.expYear}
                                                </div>
                                            </td>
                                            {/* <td>
                                                {
                                                    cards?.customerData?.invoice_settings.default_payment_method === card.id ?
                                                        <span className="default">Default</span>
                                                        :
                                                        <button className="default-btn" onClick={() => handleSetDefault(card.id)}>
                                                            {isDefaultLoading && selectedDefaultCard === card.id ?
                                                                <div className="spinner-border text-light" role="status">
                                                                    <span className="sr-only">Loading...</span>
                                                                </div>
                                                                :
                                                                <>
                                                                    Make Default
                                                    </>
                                                            }
                                                        </button>
                                                }
                                            </td> */}
                                            <td>
                                                {isDeleteLoading && selectedDeleteCard === card.id ?
                                                    <div className="spinner-border text-danger delete-spinner" role="status">
                                                        <span className="sr-only">Loading...</span>
                                                    </div>
                                                    :
                                                    <a className="delete-wrapper" onClick={() => removeCreditCard(card.id)}>
                                                        <img className="delete-icon" src={DeleteIcon} alt="" />
                                                    </a>
                                                }
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="w-100 d-flex align-items-center justify-content-end">
                        <button className="addCardButton" data-toggle="modal" data-target="#addCardModal" onClick={() => handleAddCard()}>+ Add New Card</button>
                    </div>
                </div>
            }
            <div className="modal fade" id="addCardModal" tabIndex="-1" role="dialog" aria-labelledby="addCardModal" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-body">
                            <h2 className="sub-title">Add New Card</h2>
                            <div className="card">
                                <SquarePaymentForm 
                                    sandbox={true}
                                    applicationId={'sandbox-sq0idb-krQT_NJnn_raAz8vXvvioA'}
                                    locationId={'LXRGNHX6SSJRT'}
                                    cardNonceResponseReceived={cardNonceResponseReceived}
                                    className="w-100"
                                >
                                    <fieldset className="sq-fieldset">
                                        <div>
                                            <p>Cardholder Name</p>
                                            <input type="text" placeholder="Name" name="cardholderName" onChange={handleChange} />
                                        </div>
                                        <CreditCardNumberInput />
                                        <div className="sq-form-third">
                                            <CreditCardExpirationDateInput />
                                        </div>

                                        <div className="sq-form-third">
                                            <CreditCardPostalCodeInput />
                                        </div>

                                        <div className="sq-form-third">
                                            <CreditCardCVVInput />
                                        </div>
                                    </fieldset>

                                    {/* <CreditCardSubmitButton>
                                        Add Card
                                    </CreditCardSubmitButton> */}
                                    <ul className="sq-error-message">
                                        {errorMessages.map((errorMessage, index) =>
                                            <li key={`sq-error-${index}`}>{errorMessage.message}</li>
                                        )}
                                    </ul>
                                    <div className="button-wrapper d-flex align-items-center justify-content-end">
                                        <button className="cancelCardButton close" id="modalClose" data-dismiss="modal" aria-label="Close">
                                            Cancel
                                        </button>
                                        <CreditCardSubmitButton>
                                            {isLoading ?
                                                <div className="spinner-border text-light" role="status">
                                                    <span className="sr-only">Loading...</span>
                                                </div>
                                                :
                                                <>
                                                    Add Card
                                                </>
                                            }
                                        </CreditCardSubmitButton>
                                        {/* <button className={"addCardButton " + (isLoading ? "loading" : "")} disabled={formData.cardholderName !== "" && !isLoading ? false : true} onClick={handleSubmit}>
                                            {isLoading ?
                                                <div className="spinner-border text-light" role="status">
                                                    <span className="sr-only">Loading...</span>
                                                </div>
                                                :
                                                <>
                                                    Add Card
                                                </>
                                            }
                                        </button> */}
                                    </div>
                                </SquarePaymentForm>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}