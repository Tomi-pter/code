import React, { useState, useEffect } from 'react';
import { PaymentInputsContainer } from 'react-payment-inputs';
import images from 'react-payment-inputs/images';
import DeleteIcon from '../../assets/img/Account/delete-icon.svg';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { getCards, addCard, getDefaultCard, setDefaultCard, removeCard } from '../../actions/cards';

export const Cards = ({ selectedCard, setSelectedCard, page, disable }) => {
    const [formData, setFormData] = useState({});
    const cards = useSelector((state) => state.cards);
    const [stateAddCard, setStateAddCard] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

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

    const handleSetDefault = (id) => {
        const user = JSON.parse(localStorage.getItem('profile'));
        dispatch(setDefaultCard(user?.username, id));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const user = JSON.parse(localStorage.getItem('profile'));
        dispatch(addCard(user?.username, formData));
    };
    const removeCreditCard = (card) => {
        const user = JSON.parse(localStorage.getItem('profile'));
        dispatch(removeCard(user?.username, {
            "paymentMethodId": card.id
        }));
    };

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleExpireDateChange = (e) => {
        const value = e.target.value.split("/");
        if (value[1]) {
            const expMonth = value[0].trim();
            const expYear = value[1].trim();
            setFormData({ ...formData, expMonth, expYear })
        }
    };

    useEffect(() => {
        setSelectedCard(cards?.customerData?.invoice_settings.default_payment_method);
        setIsLoading(false);
        setStateAddCard(false);
        setFormData({});
    }, [cards]);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('profile'));
        dispatch(getCards(user?.username));
        dispatch(getDefaultCard(user?.username));
    }, [dispatch]);

    return (
        <>
            <div className="cardWrapper">
                <h2 className="sub-title">Payment Options</h2>
                <h3 className="credit-title">Credit/Debit Card</h3>
                <div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Card Number</th>
                                <th scope="col">Expiry Date</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                cards.cardsData?.map((card, index) => (
                                    <tr key={`key-${index}`} onClick={() => page === 'payment' ? setSelectedCard(card.id) : handleSetDefault(card.id)}>
                                        <td>
                                            <PaymentInputsContainer>
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
                                            </PaymentInputsContainer>
                                        </td>
                                        <td>
                                            <div>
                                                {card.card.exp_month}/{card.card.exp_year}
                                            </div>
                                        </td>
                                        <td>
                                            <a className="delete-wrapper" onClick={() => removeCreditCard(card)}>
                                                <img className="delete-icon" src={DeleteIcon} alt="" />
                                            </a>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
                <div className="col-12 d-flex align-items-center justify-content-end">
                    <div>
                        <button className="addCardButton" data-toggle="modal" data-target="#addCardModal" onClick={() => setStateAddCard(true)}>+ Add New Card</button>
                    </div>
                </div>
                <div className="modal fade" id="addCardModal" tabindex="-1" role="dialog" aria-labelledby="addCardModal" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-body">
                                <h2 className="sub-title">Add New Card</h2>
                                {stateAddCard ?
                                    <div className="card">
                                        <PaymentInputsContainer>
                                            {({ meta, getCardNumberProps, getCardImageProps, getExpiryDateProps, getCVCProps }) => (
                                                <div >
                                                    {/* <svg {...getCardImageProps({ images })} /> */}
                                                    <div className="form-container">
                                                        <div className="row inputs-container">
                                                            <div className="col-12 form-group">
                                                                <label for="cardHolderName">Cardholder Name</label>
                                                                <input type="text" className="form-control" id="cardHolderName" name="cardholderName" placeholder="John Doe" />
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col">
                                                                <label for="cardNumber">Card Number</label>
                                                                <input className="col-12" className="form-control" id="cardNumber" {...getCardNumberProps({ onChange: handleChange })} autoFocus />
                                                            </div>
                                                            <div className="col-md-auto">
                                                                <label for="expiry">Valid Thru</label>
                                                                <input className="col-12" className="form-control" id="expiry" {...getExpiryDateProps({ onChange: handleExpireDateChange })} />
                                                            </div>
                                                            <div className="col col-lg-2">
                                                                <label for="cvv">CVV</label>
                                                                <input className="col-12" className="form-control"   {...getCVCProps({ onChange: handleChange })} />
                                                            </div>
                                                        </div>
                                                        {meta.isTouched && meta.error && <span className="error">{meta.error}</span>}
                                                    </div>
                                                    <div className="button-wrapper d-flex align-items-center justify-content-end">
                                                        <button className="cancelCardButton close" data-dismiss="modal" aria-label="Close">
                                                            Cancel
                                                        </button>
                                                        <button className="addCardButton" disabled={meta.isTouched && !meta.error ? false : true} onClick={handleSubmit}>
                                                            {isLoading ?
                                                                <div className="spinner-border text-light" role="status">
                                                                    <span className="sr-only">Loading...</span>
                                                                </div>
                                                                :
                                                                <>
                                                                    Add Card
                                                        </>
                                                            }
                                                        </button>
                                                    </div>
                                                </div>


                                            )}
                                        </PaymentInputsContainer>
                                    </div>
                                    : ''
                                    // <button className="add-btn" onClick={() => setStateAddCard(true)} >+ Add new card</button>
                                }
                                <p className="add-error">{cards.cardError && stateAddCard ? cards.cardError : ''}</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}