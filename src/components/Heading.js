import React, { Component } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default class SignUp extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.onPress(this.props.text);
        }}
      >
        <Text
          style={{
            fontSize: 16,
            color:
              this.props.currentPage === this.props.text
                ? "#fff"
                : "#rgba(255,255,255,0.6)"
          }}
        >
          {this.props.text ? this.props.text : "Login"}
        </Text>
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({});
