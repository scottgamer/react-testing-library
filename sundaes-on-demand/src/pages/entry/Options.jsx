import React, { useState, useEffect } from "react";

import axios from "axios";
import Row from "react-bootstrap/Row";
import Scoop from "./Scoop";
import Topping from "./Topping";
import AlertBanner from "../common/AlertBanner";

const Options = ({ optionType }) => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3030/${optionType}`);
        setItems(response.data);
      } catch (error) {
        setError(true);
      }
    };

    fetchData();
  }, [optionType]);

  if (error) {
    return <AlertBanner />;
  }

  const ItemComponent = optionType === "scoops" ? Scoop : Topping;

  const optionItems = items.map((item) => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
    />
  ));

  return <Row>{optionItems}</Row>;
};

export default Options;
