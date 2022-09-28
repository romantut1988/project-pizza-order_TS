import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const FullPizza = () => {
  const [pizza, setPizza] = useState();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          "https://6321bcd7fd698dfa29fde888.mockapi.io/items/" + id
        );
        setPizza(data);
      } catch (error) {
        alert("Ошибка при получении пиццы!");
        navigate('/');
      }
    }
    fetchPizza();
  }, []);

  if (!pizza) {
    return 'Загрузка...';
  }

  return (
    <div className="container">
      <img src={pizza.imageUrl} />
      <h2>{pizza.title}</h2>
      <h2>{pizza.price} ₽</h2>
    </div>
  );
};

export default FullPizza;
