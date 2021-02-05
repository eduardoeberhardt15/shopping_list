import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { FlatList, Swipeable, RectButton } from "react-native-gesture-handler";
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
  removeTodo: (dispatch: {}) => void;
  updateTodo: (dispatch: {}) => void;
  updateFavorite: (dispatch: {}) => void;
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
    <ScrollView style={styles.container}>
      <FlatList
        data={data.reducerMain.data}
        keyExtractor={(item) => item.name}
        /*numColumns={2}
        showsVerticalScrollIndicator={false}*/
        /*onEndReached={loadData}
        onEndReachedThreshold={0.4}
        ListFooterComponent={()=>(<ActivityIndicator size="large"/>)}*/
        renderItem={({ item }) => {
          return (
            <Swipeable
              friction={2}
              leftThreshold={80}
              rightThreshold={41}
              renderLeftActions={(progress, dragX) => {
                const scale = dragX.interpolate({
                  inputRange: [0, 80],
                  outputRange: [0, 1],
                  extrapolate: "clamp",
                });
                return (
                  <RectButton onPress={() => {}}>
                    <Text>Ola</Text>
                  </RectButton>
                );
              }}
            >
              <RectButton>
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
                        { fontSize: metrics.rem * 16 },
                      ]}
                    >
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={{ flexDirection: "row" }}
                    onPress={() =>
                      handleUpdateFavorite(
                        item.id,
                        item.favorite || false,
                        item.productId
                      )
                    }
                  >
                    <Text style={{ fontSize: metrics.rem * 16 }}>
                      {item.name}
                    </Text>
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
                    style={{}}
                    onPress={() => removeTask(item.id)}
                    hitSlop={{ top: 20, bottom: 20, left: 50, right: 50 }}
                  >
                    <Ionicons name="ios-trash" size={18} color="black" />
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
              </RectButton>
            </Swipeable>
          );
        }}
      />
    </ScrollView>
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
