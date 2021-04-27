import React, { useState, useEffect} from 'react';
import { PaymentInputsContainer } from 'react-payment-inputs';
import images from 'react-payment-inputs/images';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { getCards, addCard } from '../../actions/cards';

export const Cards = ({ selectedCard, setSelectedCard }) => {
    const [formData, setFormData] = useState({});
    const cards = useSelector((state) => state.cards);
    const [stateAddCard, setStateAddCard] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    const setCard = (cardType) => {
        if (cardType === 'visa') return '4242';
        if (cardType === 'mastercard') return '5555';
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const user = JSON.parse(localStorage.getItem('profile'));
        dispatch(addCard(user?.username, formData));
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
        dispatch(getCards(user?.username));
    }, [dispatch]);

    useEffect(() => {
        setSelectedCard(cards?.cardsData[0]?.id);
        setIsLoading(false);
    }, [cards]);

    return (
        <>
            <div className="card-list">
                {
                    cards?.cardsData?.map((card, index) => (
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
                { stateAddCard ? 
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
                                    <button disabled={meta.isTouched && !meta.error ? false : true} onClick={handleSubmit}>
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
                                    <a href="#!" onClick={()=>setStateAddCard(false)}>Cancel</a>
                                </div>
                            )}
                        </PaymentInputsContainer>
                    </div>
                    :
                    <button className="add-btn" onClick={()=>setStateAddCard(true)}>+ Add new card</button>
                }
                <p className="add-error">{cards.cardError && stateAddCard ? cards.cardError : ''}</p>
            </div>
        </>
    )
}