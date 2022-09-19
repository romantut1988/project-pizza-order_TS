import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setCategoryId } from "../redux/slices/filterSlice";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Sceleton from "../components/PizzaBlock/Sceleton";
import Pagination from "../components/Pagination";
import { SearchContext } from "../App";

const Home = () => {
  const dispatch = useDispatch();
  const { categoryId, sort } = useSelector((state) => state.filter);

  const { searchValue } = useContext(SearchContext);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  useEffect(() => {
    setIsLoading(true);

    const sortBy = sort.sortProperty.replace("-", "");
    const order = sort.sortProperty.includes("-") ? "asc" : "desc";
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";

    fetch(
      `https://6321bcd7fd698dfa29fde888.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    )
      .then((res) => res.json())
      .then((arr) => {
        setItems(arr);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);

  const skeletons = [...new Array(6)].map((_, index) => (
    <Sceleton key={index} />
  ));

  const onClickCatedory = (id) => {};

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </div>
  );
};

export default Home;
