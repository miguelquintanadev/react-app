import { useEffect, useState } from "react";
import { listProduct } from "../services/ProductService";
import { ProductGrid } from "./ProductGrid";
import { PropTypes } from 'prop-types'

export const ProductApp = ({title}) => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const result = listProduct();
        setProducts(result);
    }, []);
    
    return (
        <>
        <h1>{title}</h1>
        <ProductGrid products={products}/>
        </>
    )
}

ProductApp.propTypes = {
    title: PropTypes.string.isRequired
}