import React, {useState} from 'react'
import { HeaderNav } from '../components/partials/HeaderNav';
import { Footer } from '../components/partials/Footer';
import { Products } from '../components/shared/products';

export default props => {
    const [view, setView] = useState('grid');
    const [products, setProducts] = useState([
        {
            id: "1A",
            item_no: "129384",
            ndc: "6238-1838-01",
            name: `Vitamin D3 2000iu 250ct Vitamin D3 50mcg (2000IU) 250 Softgels`,
            compare_to: "Synthroid/Unithroid/Levox",
            img: 'product-sample.png',
            company: "Amneal Pharm.",
            size: "100",
            strength: "50mcg",
            price: "25.89",
            ppu: ".259",
            category: "pharmacies"
        },
        {
            id: "2B",
            item_no: "129384",
            ndc: "6238-1838-01",
            name: `Vitamin D3 2000iu 250ct Vitamin D3 50mcg (2000IU) 250 Softgels`,
            compare_to: "Synthroid/Unithroid/Levox",
            img: 'product-sample.png',
            company: "Amneal Pharm.",
            size: "100",
            strength: "50mcg",
            price: "25.89",
            ppu: ".259",
            category: "vetirinary"
        },
        {
            id: "3C",
            item_no: "129384",
            ndc: "6238-1838-01",
            name: `Vitamin D3 2000iu 250ct Vitamin D3 50mcg (2000IU) 250 Softgels`,
            compare_to: "Synthroid/Unithroid/Levox",
            img: 'product-sample.png',
            company: "Amneal Pharm.",
            size: "100",
            strength: "50mcg",
            price: "25.89",
            ppu: ".259",
            category: "surgical"
        }
    ]);

    const setDisplay = () => {
        return (
            <Products
                page="search"
                view={view}
                setView={setView}
                products={products}
            />
        )
    }

    return (
        <>
            <HeaderNav />
            <div className="search-page">
                <div className="container-fluid content">
                    {
                        setDisplay()
                    }
                </div>
            </div>
            <Footer />
        </>
    )
}