import { useEffect, useState } from "react";
import { listProduct } from "../services/ProductService";
import { ProductGrid } from "./ProductGrid";
import { PropTypes } from 'prop-types'
import { ProductForm } from "./ProductForm";

export const ProductApp = ({title}) => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const result = listProduct();
        setProducts(result);
    }, []);
    
    return (
        <div>
            <h1>{title}</h1>
            <div>
                <div>
                    <ProductForm />
                </div>
                <div>
                    <ProductGrid products={products}/>
                </div>
            </div>
        </div>
    )
}

ProductApp.propTypes = {
    title: PropTypes.string.isRequired
}