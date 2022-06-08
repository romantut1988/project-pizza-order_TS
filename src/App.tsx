import React, {useEffect, useState} from "react";
import "./scss/app.scss";
import "./components/Header";
import {Header} from "./components/Header";
import {Categories} from "./components/Categories";
import {Sort} from "./components/Sort";
import {PizzaBlock} from "./components/PizzaBlock/PizzaBlock";
import {Skeleton} from "./components/PizzaBlock/Skeleton";

function App() {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch("https://629e737c8b939d3dc2820978.mockapi.io/items")
            .then((res) => res.json())
            .then((arr) => {
                setItems(arr);
                setIsLoading(false); 
            });
    }, []);

    return (
        <div className="wrapper">
            <Header/>
            <div className="content">
                <div className="container">
                    <div className="content__top">
                        <Categories/>
                        <Sort/>
                    </div>
                    <h2 className="content__title">Все пиццы</h2>
                    <div className="content__items">
                        {isLoading
                            ? [...new Array(6)].map((_, index) => <Skeleton key={index}/>)
                            : items.map(({id, imageUrl, price, sizes, title, types}) => (
                                <PizzaBlock key={id} title={title} price={price} imageUrl={imageUrl} sizes={sizes} types={types}/>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
