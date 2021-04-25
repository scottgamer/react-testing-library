import React from "react";
import { useOrderDetails } from "../../context/OrderDetails";

import Options from "./Options";

const OrderEntry = () => {
  const [orderDetails] = useOrderDetails();

  return (
    <>
      <h1>Design Your Sundae!</h1>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>Grand total: {orderDetails.totals.grandTotal}</h2>
    </>
  );
};

export default OrderEntry;
