import React, { useState, useEffect } from "react";

import axios from "axios";
import Row from "react-bootstrap/Row"
import Scoop from "./Scoop";

const Options = ({ optionType }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3030/${optionType}`);
        setItems(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [optionType]);

  const ItemComponent = optionType === "scoops" ? Scoop : null;

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
