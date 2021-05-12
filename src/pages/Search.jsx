import React,  {useState, useEffect} from 'react';
import { HeaderNav } from '../components/partials/HeaderNav';
import { Footer } from '../components/partials/Footer';
import { Products } from '../components/shared/products';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getProducts } from '../actions/products';

export default props => {
    const products = useSelector((state) => state.products);
    const [view, setView] = useState('grid');
    const [isLoading, setIsLoading] = useState(true);
    const query = new URLSearchParams(props.location.search);
    const name =  query.get('name') || "";

    const dispatch = useDispatch();

    useEffect(() => {
        setIsLoading(true);
        dispatch(getProducts(name, null, null));
    }, [dispatch, name]);

    useEffect(() => {
        setIsLoading(false);
    }, [products]);

    return (
        <>
            <HeaderNav />
            <div className="search-page">
                <div className="container-fluid">
                    {isLoading ? 
                        <div className="spinner-container d-flex align-items-center justify-content-center">
                            <div className="spinner-border text-primary" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                        :
                        <Products
                            page="search"
                            view={view}
                            setView={setView}
                            products={products}
                            name={name}
                        />
                    }
                </div>
            </div>
            <Footer />
        </>
    )
}