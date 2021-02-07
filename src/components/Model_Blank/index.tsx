import React from "react";
import { View } from "react-native";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import * as actions from "../store/actions";
import { reducers } from "../store/reducers";

import styles from "./styles";

interface StateProps {
  data: reducers;
  removeTodo: (dispatch: () => void) => void;
}

const List = ({ removeTodo, data }: StateProps) => {
  return <View />;
};

const mapStateToProps = (state: reducers) => ({
  data: state,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  removeTodo: (todo: any) => dispatch(actions.addTodo(todo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(List);
