import React, {useEffect, useState} from 'react';
import './scss/app.scss';
import './components/Header';
import {Header} from "./components/Header";
import {Categories} from "./components/Categories";
import {Sort} from "./components/Sort";
import {PizzaBlock} from "./components/PizzaBlock";

function App() {
    const [items, setItems] = useState([])

    useEffect(() => {
        fetch('https://629e737c8b939d3dc2820978.mockapi.io/items')
            .then((res) => res.json())
            .then((arr) => {
                setItems(arr);
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
                        {items.map(({id, imageUrl, price, sizes, title, types}) => (
                            <PizzaBlock
                                key={id}
                                title={title}
                                price={price}
                                imageUrl={imageUrl}
                                sizes={sizes}
                                types={types}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App;
