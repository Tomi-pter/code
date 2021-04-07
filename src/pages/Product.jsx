import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { ProductConsumer } from '../context';

export default class Product extends Component {
    render() {
        const { page, products, view, setView } = this.props;
        const { id,
            item_no,
            ndc,
            name,
            compare_to,
            img,
            company,
            size,
            strength,
            price,
            ppu,
            category,
            inCart
        } = this.props.product
        return (

            <ProductConsumer>
                {value => (
                    <div key={`key-${id}`} className={(view === "list" ? " col-12" : "col-12 col-md-6 col-lg-4")}>
                        <Link to="/details" onClick={() => value.handleDetail(id)}>
                            <div
                                className={"product" + (category === "pharmacies" ? " pharma-product" : category === "vetirinary" ? " vet-product" : " medsurg-product")}
                            >
                                <div className="mobile-wrapper">
                                    <div className={"mobile-list-header " + (view === "list" ? " d-flex" : "d-none")}>
                                        <div className="product-image-head"></div>
                                        <div className="header-name-wrapper">
                                            <p className="flex-fill list-header-name">
                                                Name
                                                            </p>
                                        </div>
                                        <div className="header-price-wrapper">
                                            <p className="list-header-price">
                                                Price
                                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className={"product-details-container"}>
                                    <div className="img-container">
                                        <div>
                                            <img src={img} alt="" />
                                        </div>
                                    </div>
                                    <div className="details-container">
                                        <div className="no-container for-list">
                                            <p className="item-no">{item_no}</p>
                                            <p className="ndc">{ndc}</p>
                                        </div>
                                        <div className="name-container">
                                            <p className="name">{name}</p>
                                            <p className="compare for-list">({compare_to})</p>
                                        </div>
                                        <p className="company for-list">{company}</p>
                                        <p className="size for-list">{size}</p>
                                        <p className="strength for-list">{strength}</p>
                                        <div className="price-container">
                                            <p className="price">${price}</p>
                                            <p className="ppu for-list">({ppu})</p>
                                        </div>
                                        <div className="buy-container">
                                            <input className="qty for-list" type="number" min="1" placeholder="1" />
                                            <button className="cart-btn"></button>
                                        </div>
                                        <p className="incart for-list">1</p>
                                    </div>
                                    <div className={(view === "list" ? " d-block" : "d-none")}>
                                        <div className="price-wrapper">
                                            <div className="flex-fill">
                                                <p className="price">${price}</p>
                                                <p className="ppu">({ppu})</p>
                                            </div>
                                            <div className="buy-container">
                                                <button className="cart-btn"></button>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </Link>
                    </div>

                )}
            </ProductConsumer>
        )
    }
}

Product.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.number,
        img: PropTypes.string,
        title: PropTypes.string,
        price: PropTypes.number,
        inCart: PropTypes.bool
    }).isRequired
};

const ProductWrapper = styled.div`
    .card {
        border-color: transparent;
        transition: all 1s linear;
    }
    .card-footer {
        background: transparent;
        border-top: transparent;
        transition: all 1s linear;
    }
    &:hover {
        .card {
            border: 0.04rem solid rgba(0,0,0,0.2);
            box-shadow: 2px 2px 5px 0px rgba(0,0,0,0.2);
        }
        .card-footer {
            background: rgba(247, 247, 247);
        }
    }
    .img-container {
        position: relative;
        overflow: hidden;
    }
    .card-img-top {
        transition: all 1s linear;
    }
    .img-container:hover .card-img-top {
        transform: scale(1.2);
    }
    .cart-btn {
        position: absolute;
        bottom: 0;
        right: 0;
        padding: 0.2rem 0.4rem;
        background: var(--lightBlue);
        border: none;
        color: var(--mainWhite);
        font-size: 1.4rem;
        border-radius: 0.5rem 0 0 0;
        transform: translate(100%, 100%);
        transition: all 1s linear;
    }
    .img-container:hover .cart-btn {
        transform: translate(0,0);
    }
    .cart-btn:hover {
        color: var(--mainBlue);
        cursor: pointer;
    }
`;