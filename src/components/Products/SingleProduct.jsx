import React, { useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import { useGetProductQuery } from "../../features/api/apiSlice";
import { getRelatedProducts } from "../../features/products/productsSlice";

import { ROUTES } from "../../utils/routes";

import Product from "./Product";
import Products from "./Products";

const SingleProduct = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const { list, related } = useSelector(({ products }) => products)

  const { data, isLoading, isFetching, isSuccess } = useGetProductQuery({ id });


  useEffect(() => {
    if (!isFetching && !isLoading && !isSuccess) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      navigate(ROUTES.HOME)
    }
  }, [isLoading, isFetching, isSuccess])

  useEffect(() => {
    if (!data || !list.length) return
    dispatch(getRelatedProducts(data.category.id))
  }, [data, dispatch, list.length])

  return (
    !data
    ? <section className="preloader">Loading...</section>
    : <>
        <Product {...data} />
        <Products products={related} amount={5} title="Related products" />
      </>
  );
};

export default SingleProduct;
