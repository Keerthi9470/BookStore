
import React, { useState, useEffect } from "react";

import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { getProducts, deleteProduct } from "./helper/adminapicall";
import productImg from '../images/addProduct.png';

const ManageProducts = () => {
 const [products, setProducts] = useState([]);

 const { user, token } = isAuthenticated();
 const val=products.length;
 const preload = () => {
   getProducts().then(data => {
     if (data.error) {
       console.log(data.error);
     } else {
       setProducts(data);
     }
   });
 };

 useEffect(() => {
   preload();
 }, []);

 const deleteThisProduct = productId => {
   deleteProduct(productId, user._id, token).then(data => {
     if (data.error) {
       console.log(data.error);
     } else {
       preload();
     }
   });
 };

 return (
   <Base title="Welcome admin" description="Manage products here"
   imageSrc= {productImg}
    imageAlt="Product Image"
    imageWidth={2500}
    imageHeight={300}>
     <h2 className="mb-4">All products:</h2>
     <Link className="btn btn-info" to={`/admin/dashboard`}>
       <span className="">Admin Home</span>
     </Link>
     <div className="row">
       <div className="col-12">
         <h2 className="text-center text-dark my-3">Total {val} products</h2>

         {products.map((product, index) => {
           return (
             <div key={index} className="row text-center mb-2 ">
               <div className="col-4">
                 <h3 className="text-dark text-left">{product.name}</h3>
               </div>
               <div className="col-4">
                 <Link
                   className="btn btn-success"
                   to={`/admin/product/update/${product._id}`}
                 >
                   <span className="">Update</span>
                 </Link>
               </div>
               <div className="col-4">
                 <button
                   onClick={() => {
                     deleteThisProduct(product._id);
                   }}
                   className="btn btn-danger"
                 >
                   Delete
                 </button>
               </div>
             </div>
           );
         })}
       </div>
     </div>
   </Base>
 );
};

export default ManageProducts;
