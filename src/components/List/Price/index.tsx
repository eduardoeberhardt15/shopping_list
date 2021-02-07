import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { View } from "react-native";
import * as actions from "../../store/actions";
import { InputPrice } from "./styles";
import {
  formatStringToMoney,
  formatMoneyToDecimal,
} from "../../../extras/money";

interface Props {
  listId: number;
  itemId: number;
  price: string;
}

const Price: React.FC<Props> = ({ itemId, listId, price: parentPrice }) => {
  const [price, setPrice] = useState(
    parentPrice ? `${formatStringToMoney(Number(parentPrice).toFixed(2))}` : ""
  );
  const dispatch = useDispatch();
  const updateTodoPrice = useCallback((values) => {
    dispatch(actions.updateTodoPrice(values));
  }, []);

  const handleFormatMoney = (value: string) => {
    const money = formatStringToMoney(value);

    setPrice(money);
  };

  const handleUpdatePrice = () => {
    updateTodoPrice({
      id: itemId,
      list: listId,
      price: Number(formatMoneyToDecimal(price)),
    });
  };

  return (
    <InputPrice
      placeholder="R$"
      keyboardType="decimal-pad"
      onBlur={handleUpdatePrice}
      value={price}
      onChangeText={handleFormatMoney}
      selection={{
        start: price.length,
        end: price.length,
      }}
    />
  );
};

export default Price;
