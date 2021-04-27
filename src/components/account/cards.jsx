import React, { useState, useEffect} from 'react';
import { PaymentInputsContainer } from 'react-payment-inputs';
import images from 'react-payment-inputs/images';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { getPaymentMethods, addPaymentMethod } from '../../actions/paymentMethods';

export const Cards = ({ selectedCard, setSelectedCard }) => {
    const [formData, setFormData] = useState({});
    const cards = useSelector((state) => state.paymentMethods);
    const [addCard, setAddCard] = useState(false);
    const dispatch = useDispatch();

    const setCard = (cardType) => {
        if (cardType === 'visa') return '4242';
        if (cardType === 'mastercard') return '5555';
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = JSON.parse(localStorage.getItem('profile'));
        dispatch(addPaymentMethod(user?.username, formData));
    };

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleExpireDateChange = (e) => {
        const value = e.target.value.split("/");
        if ( value[1]) {
            const expMonth = value[0].trim();
            const expYear = value[1].trim();
            setFormData({ ...formData, expMonth, expYear })
        }
    };

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('profile'));
        dispatch(getPaymentMethods(user?.username));
    }, [dispatch]);

    useEffect(() => {
        setSelectedCard(cards[0]?.id);
    }, [cards]);

    return (
        <>
            <div className="card-list">
                {
                    cards.map((card, index) => (
                        <div 
                            key={`key-${card.id}`} 
                            className={"d-flex flex-row align-items-center justify-content-between card " + (selectedCard === card.id ? "active" : "")}
                            onClick={()=>setSelectedCard(card.id)}
                        >
                            <div className="d-flex card-info">
                                <PaymentInputsContainer>
                                    {({ getCardNumberProps, getCardImageProps }) => (
                                        <div className="d-flex">
                                            <svg {...getCardImageProps({ images })} />
                                            <div>
                                                <p className="name">{card.billing_details.name}</p>
                                                <input {...getCardNumberProps()} value={`${setCard(card.card.brand)}`} id={`card-${index}`} readOnly />
                                                <span className="card-number">*****************{card.card.last4}</span>
                                            </div>
                                        </div>
                                    )}
                                </PaymentInputsContainer>
                            </div>
                            <div className="img-container">
                                { selectedCard === card.id && <img src={require("../../assets/icon/card-active.svg")} alt="" /> } 
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className="add-card-container">
                { addCard ? 
                    <div className="card">
                        <PaymentInputsContainer>
                            {({ meta, getCardNumberProps, getCardImageProps, getExpiryDateProps, getCVCProps }) => (
                                <div className="d-flex align-items-center justify-content-between">
                                    <svg {...getCardImageProps({ images })} />
                                    <div className="form-container">
                                        <div className="inputs-container">
                                            <input {...getCardNumberProps({onChange: handleChange})} autoFocus />
                                            <input {...getExpiryDateProps({onChange: handleExpireDateChange})} />
                                            <input {...getCVCProps({onChange: handleChange})} />
                                        </div>
                                        {meta.isTouched && meta.error && <span className="error">{meta.error}</span>}
                                    </div>
                                    <button disabled={meta.isTouched && !meta.error ? false : true} onClick={handleSubmit}>Add Card</button>
                                    <a href="#!" onClick={()=>setAddCard(false)}>Cancel</a>
                                </div>
                            )}
                        </PaymentInputsContainer>
                    </div>
                    :
                    <button className="add-btn" onClick={()=>setAddCard(true)}>+ Add new card</button>
                }
            </div>
        </>
    )
}