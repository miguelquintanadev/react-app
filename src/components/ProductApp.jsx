import { useEffect, useState } from "react";
import { listProduct } from "../services/ProductService";
import { ProductGrid } from "./ProductGrid";
import { PropTypes } from 'prop-types'
import { ProductForm } from "./ProductForm";

export const ProductApp = ({title}) => {

    const [products, setProducts] = useState([]);

    const[productSelected, setProductSelected] = useState({
        id: 0,
        name: '',
        description: '',
        price: ''
    })

    useEffect(() => {
        const result = listProduct();
        setProducts(result);
    }, []);
    
    /* EL NUEVO OBJETO SE AÑADE A LOS QUE YA EXISTEN */
    const handlerAddProduct = (product) => {
        console.log(product);
        
        if(product.id > 0){
            setProducts(products.map(prod => {
                if(prod.id == product.id){
                    return {...product}
                }
                return prod;
            }));
        }else{
            setProducts([...products, {...product, id: new Date().getTime()}])
        }
        
    }

    /* ELIMINAR OBJETO CON BOTON REMOVE. */
    const handlerRemoveProduct = (id) => {
        console.log(id);
        setProducts(products.filter(product => product.id != id));
    }

    /* EDITAR OBJETO PRODUCT */
    const handlerProductSelected = (product) => {
        setProductSelected({...product});
    }

    return (
        <div className="container my-4">
            <h2>{title}</h2>
            <div className="row">
                <div className="col">
                    <ProductForm handlerAdd = {handlerAddProduct} productSelected={productSelected} />
                </div>
                <div className="col">
                    {
                        products.length > 0 ? <ProductGrid products={products} handlerRemove ={handlerRemoveProduct} handlerProductSelected={handlerProductSelected} />
                        : <div className="alert alert-warning">No hay productos en el sistema.</div>
                    }
                    
                </div>
            </div>
        </div>
    )
}

ProductApp.propTypes = {
    title: PropTypes.string.isRequired
}