import React,  {useState, useEffect} from 'react';
import { HeaderNav } from '../components/partials/HeaderNav';
import { Footer } from '../components/partials/Footer';
import { Products } from '../components/shared/products';
import { Helmet } from 'react-helmet';

export default props => {
    const [view, setView] = useState('list');
    const [isLoading, setIsLoading] = useState(false);
    const query = new URLSearchParams(props.location.search);
    const name =  query.get('name') || "";

    console.log(name)
    
    return (
        <>
            <Helmet>
                <title>Search | Premier Pharmaceuticals</title>
            </Helmet>
            <HeaderNav />
            <div className="search-page">
                <div className="container-fluid">
                        <Products
                            page="search"
                            view={view}
                            setView={setView}
                            name={name}
                            isLoading={isLoading}
                            setIsLoading={setIsLoading}
                        />
                </div>
            </div>
            <Footer />
        </>
    )
}