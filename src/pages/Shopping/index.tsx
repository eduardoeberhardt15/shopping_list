import React, { useEffect, useState, useRef } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  Animated,
} from "react-native";
import {
  PanGestureHandler,
  PanGestureHandlerStateChangeEvent,
  State,
} from "react-native-gesture-handler";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";

import { Dispatch } from "redux";
import { connect } from "react-redux";
import * as actions from "../../components/store/actions";
import { reducers } from "../../components/store/reducers";

import { Bottom } from "./styles";
import {
  Container,
  Content,
  Row,
  Column,
  Input,
  TransparentButton,
  SubTitle,
  NormalText,
} from "../../styles/styled";
import Header from "../../components/Header";
import AutoCompleteSelect from "../../components/AutoCompleteSelect";
import List from "../../components/List";

import listController, { list } from "../../database/controllers/list";
import listItemController from "../../database/controllers/list_item";
//import Animated, { Easing } from "react-native-reanimated";

interface StateProps {
  data: reducers;
  removeTodo: (dispatch: number) => void;
  getList: (dispatch: number) => void;
}

type ParamList = {
  Detail: {
    listId: number;
  };
};

const Shopping = ({ removeTodo, data, getList }: StateProps) => {
  const route = useRoute<RouteProp<ParamList, "Detail">>();
  const listId = route.params.listId;
  const controller = listController();
  const [listName, setListName] = useState("Lista");
  const translateY = new Animated.Value(0);
  let offset = 0;
  const maxDrag = -200;

  const animatedEvent = Animated.event(
    [
      {
        nativeEvent: {
          translationY: translateY,
        },
      },
    ],
    {
      useNativeDriver: true,
    }
  );

  useEffect(() => {
    (async () => {
      getList(listId);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const list = await controller.findById(listId);
      setListName(list?.name || "Lista");
    })();
  }, []);

  const onHandlerStateChange = (e: PanGestureHandlerStateChangeEvent) => {
    if (e.nativeEvent.oldState === State.ACTIVE) {
      let opened = false;
      const { translationY } = e.nativeEvent;
      offset += translationY;

      if (translationY <= -50) {
        opened = true;
      } else {
        translateY.setOffset(0);
        translateY.setValue(offset);
        offset = 0;
      }

      Animated.timing(translateY, {
        toValue: opened ? maxDrag : 0,
        duration: opened ? 500 : 200,
        useNativeDriver: true,
      }).start(() => {
        offset = opened ? maxDrag : 0;
        translateY.setOffset(offset);
        translateY.setValue(0);
      });
    }
  };

  return (
    <TouchableWithoutFeedback
      accessible={false}
      onPress={() => Keyboard.dismiss()}
    >
      <Container>
        <Header goBack title={listName} />
        <Content startAlign paddingTop={40}>
          <List listId={listId} mode={1} />
        </Content>
        <PanGestureHandler
          onGestureEvent={animatedEvent}
          onHandlerStateChange={onHandlerStateChange}
        >
          <Bottom
            style={{
              transform: [
                {
                  translateY: translateY.interpolate({
                    inputRange: [maxDrag, 0, 100],
                    outputRange: [maxDrag, 0, 10],
                    extrapolate: "clamp",
                  }),
                },
              ],
            }}
          >
            <Text style={{ fontSize: 22 }}>
              Total - R${data.reducerMain.total.toFixed(2)}
            </Text>
          </Bottom>
        </PanGestureHandler>
      </Container>
    </TouchableWithoutFeedback>
  );
};

const mapStateToProps = (state: reducers) => ({
  data: state,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  removeTodo: (todo: number) => dispatch(actions.addTodo(todo)),
  getList: (listId: number) => dispatch(actions.getList(listId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Shopping);
