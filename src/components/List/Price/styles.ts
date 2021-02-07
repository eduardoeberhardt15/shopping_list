import { StyleSheet } from "react-native";
import styled from "styled-components/native";

const styles = StyleSheet.create({
  container: {
    width: "90%",
    flexGrow: 0,
  },

  viewList: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 5,
    padding: 10,
  },
});

export const InputPrice = styled.TextInput`
  font-size: 18px;
`;

export default styles;
