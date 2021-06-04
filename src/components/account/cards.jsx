import React, { useState, useEffect } from 'react';
import { PaymentInputsContainer } from 'react-payment-inputs';
import images from 'react-payment-inputs/images';
import DeleteIcon from '../../assets/img/Account/delete-icon.svg';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { getCards, addCard, removeCard, getDefaultCard, setDefaultCard } from '../../actions/cards';

import {
  SquarePaymentForm,
  CreditCardNumberInput,
  CreditCardExpirationDateInput,
  CreditCardPostalCodeInput,
  CreditCardCVVInput,
  CreditCardSubmitButton
} from 'react-square-payment-form'

const initialState = { cardNonce: "", cardholderName: "" };

export const Cards = ({ selectedCard, setSelectedCard, page }) => {
    const [formData, setFormData] = useState(initialState);
    const cards = useSelector((state) => state.cards);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedDeleteCard, setSelectedDeleteCard] = useState('');
    const [isDeleteLoading, setIsDeleteLoading] = useState(false);
    const [isDefaultLoading, setIsDefaultLoading] = useState(false);
    const [selectedDefaultCard, setSelectedDefaultCard] = useState('');
    const dispatch = useDispatch();

    const [errorMessages, setErrorMEssage] = useState([]);

    const cardNonceResponseReceived = (errors, nonce, cardData, buyerVerificationToken) => {
        if (errors) {
            setErrorMEssage(errors);
            return
        }

        if (formData.cardholderName === "") {
            setErrorMEssage([{message: 'Provide Cardholder name'}]);
            return
        }

        setErrorMEssage([]);
        setIsLoading(true);
        const user = JSON.parse(localStorage.getItem('profile'));
        dispatch(addCard(user?.username, {...formData, cardNonce: nonce }));
    }

    const setCard = (cardType) => {
        switch (cardType) {
            case 'VISA':
                return '4242';
            case 'MASTERCARD':
                return '5555';
            case 'DISCOVER':
                return '6011';
            case 'AMEX':
                return '3784';
            case 'UNIONPAY':
                return '6200';
            case 'DINERS':
                return '3056';
            case 'JCB':
                return '3566';
            default:
                return '';
        }
    }

    const handleAddCard = () => {
        setFormData(initialState);
    }

    const removeCreditCard = (id) => {
        setSelectedDeleteCard(id);
        setIsDeleteLoading(true);
        const user = JSON.parse(localStorage.getItem('profile'));
        dispatch(removeCard(user?.username, id));
    };

    const handleSetDefault = (id) => {
        setSelectedDefaultCard(id);
        setIsDefaultLoading(true);
        const user = JSON.parse(localStorage.getItem('profile'));
        dispatch(setDefaultCard(user?.username, id));
    }

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    useEffect(() => {
        if (cards?.defaultCard?.paymentMethodId) { 
            setSelectedCard(cards?.defaultCard?.paymentMethodId);
        } else {
            setSelectedCard(cards?.cardsData[0]?.id);
        };
        setIsLoading(false);
        setIsDeleteLoading(false);
        setIsDefaultLoading(false);
        if (!cards.cardError) {
            setFormData(initialState);
            document.getElementById("modalClose").click();
        }
    }, [cards]);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('profile'));
        dispatch(getCards(user?.username));
        dispatch(getDefaultCard(user?.username));
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
                                    <PaymentInputsContainer>
                                        {({ getCardNumberProps, getCardImageProps }) => (
                                            <div className="d-flex">
                                                <svg {...getCardImageProps({ images })} />
                                                <div>
                                                    <p className="name">{card.cardholderName}</p>
                                                    <input {...getCardNumberProps()} value={`${setCard(card.cardBrand)}`} id={`card-list-${index}`} readOnly />
                                                    <span className="card-number">*****************{card.last4}</span>
                                                </div>
                                            </div>
                                        )}
                                    </PaymentInputsContainer>
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
                                    <th className="d-none d-sm-table-cell" scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    cards.cardsData?.map((card, index) => (
                                        <tr key={`key-${index}`} >
                                            <td>
                                                <PaymentInputsContainer>
                                                    {({ getCardNumberProps, getCardImageProps, getExpiryDateProps }) => (
                                                        <div className="d-flex align-items-center">
                                                            <div className="mr-2">
                                                                <svg {...getCardImageProps({ images })} />
                                                            </div>
                                                            <div>
                                                                <input hidden {...getCardNumberProps()} value={`${setCard(card.cardBrand)}`} id={`card-${index}`} readOnly />
                                                                <span className="card-number">*****************{card.last4}</span>
                                                            </div>
                                                        </div>
                                                    )}
                                                </PaymentInputsContainer>
                                                <div className="mt-5 d-block d-sm-none">
                                                    {
                                                        cards?.defaultCard?.paymentMethodId === card.id ?
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
                                                </div>
                                            </td>
                                            <td>
                                                <div>
                                                    {card.expMonth}/{card.expYear}
                                                </div>
                                                <div className="mt-5 d-block d-sm-none d-flex justify-content-end">
                                                    { 
                                                        isDeleteLoading && selectedDeleteCard === card.id ?
                                                        <div className="spinner-border text-danger delete-spinner" role="status">
                                                            <span className="sr-only">Loading...</span>
                                                        </div>
                                                        :
                                                        <a className="delete-wrapper" onClick={() => removeCreditCard(card.id)}>
                                                            <img className="delete-icon" src={DeleteIcon} alt="" />
                                                        </a>
                                                    }
                                                </div>
                                            </td>
                                            <td className="d-none d-sm-table-cell">
                                                {
                                                    cards?.defaultCard?.paymentMethodId === card.id ?
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
                                            </td> 
                                            <td className="d-none d-sm-table-cell">
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