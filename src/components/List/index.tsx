import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import * as actions from "../store/actions";
import { reducers } from "../store/reducers";

import styles from "./styles";
import { Ionicons } from "@expo/vector-icons";
import { metrics } from "../../styles";

import Price from "./Price";
import Amount from "./Amount";
import { AirbnbRating } from "react-native-ratings";

interface StateProps {
  data: reducers;
  removeTodo: (dispatch: () => void) => void;
  updateTodo: (dispatch: () => void) => void;
  updateFavorite: (dispatch: () => void) => void;
  listId: number;
  mode: number; // 0 remove, 1 complete
}

const List = ({
  removeTodo,
  updateTodo,
  updateFavorite,
  data,
  listId,
  mode,
}: StateProps) => {
  console.log(data);

  function completeTask(id: number) {
    const item = data.reducerMain.data.find((item) => item.id === id);

    updateTodo({
      id,
      list: listId,
      complete: item?.complete ? 0 : 1,
    });
  }

  function removeTask(id: number) {
    removeTodo({
      id,
      list: listId,
    });
  }

  function handleUpdateFavorite(
    id: number,
    favorite: boolean,
    productId: number
  ) {
    updateFavorite({
      id,
      favorite: !favorite,
      productId,
    });
  }

  return (
    <FlatList
      data={data.reducerMain.data}
      keyExtractor={(item) => item.name}
      style={styles.container}
      /*numColumns={2}
        showsVerticalScrollIndicator={false}*/
      /*onEndReached={loadData}
        onEndReachedThreshold={0.4}
        ListFooterComponent={()=>(<ActivityIndicator size="large"/>)}*/
      renderItem={({ item }) => {
        return (
          <View
            style={{
              width: "99%",
              flexDirection: "row",
              justifyContent: "space-between",
              paddingVertical: metrics.rem * 5,
            }}
          >
            {mode === 1 ? (
              <TouchableOpacity
                style={{}}
                onPress={() => completeTask(item.id)}
                hitSlop={{ top: 20, bottom: 20, left: 50, right: 50 }}
              >
                <Text
                  style={[
                    item.complete
                      ? {
                          textDecorationLine: "underline line-through",
                          textDecorationColor: "blue",
                          textDecorationStyle: "solid",
                        }
                      : null,
                    {
                      fontSize: metrics.rem * 18,
                    },
                  ]}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  paddingHorizontal: metrics.rem * 5,
                }}
                onPress={() =>
                  handleUpdateFavorite(
                    item.id,
                    item.favorite || false,
                    item.productId
                  )
                }
              >
                <Text style={{ fontSize: metrics.rem * 18 }}>{item.name}</Text>
                <AirbnbRating
                  defaultRating={item.favorite ? 1 : 0}
                  isDisabled
                  showRating={false}
                  count={1}
                  size={metrics.rem * 20}
                />
              </TouchableOpacity>
            )}
            {mode === 0 ? (
              <TouchableOpacity
                style={{ padding: metrics.rem * 5 }}
                onPress={() => removeTask(item.id)}
                hitSlop={{ top: 20, bottom: 20, left: 50, right: 50 }}
              >
                <Ionicons
                  name="ios-trash"
                  size={metrics.rem * 20}
                  color="black"
                />
              </TouchableOpacity>
            ) : (
              <>
                <Amount
                  itemId={item.id}
                  listId={listId}
                  amount={item?.amount || 1}
                />
                <Price
                  itemId={item.id}
                  listId={listId}
                  price={String(item?.price) || ""}
                />
              </>
            )}
          </View>
        );
      }}
    />
  );
};

const mapStateToProps = (state: reducers) => ({
  data: state,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  removeTodo: (todo: any) => dispatch(actions.removeTodo(todo)),
  updateTodo: (todo: any) => dispatch(actions.updateTodo(todo)),
  updateFavorite: (todo: any) => dispatch(actions.updateTodoFavorite(todo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(List);
