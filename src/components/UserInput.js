import React, { Component } from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";
import { Ionicons } from "react-native-vector-icons";
export default class UserInput extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputWrapper}>
          <Ionicons
            name={
              this.props.iconName ? this.props.iconName : "ios-mail-outline"
            }
            size={30}
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            underlineColorAndroid={"transparent"}
            placeholder={
              this.props.placeholder ? this.props.placeholder : "Email:"
            }
            value={this.props.value}
            onChangeText={value => {
              this.props.onChangeText(value);
            }}
            secureTextEntry={this.props.secureTextEntry}
          />
        </View>
        <Text
          style={[
            styles.errorText,
            {
              color: this.props.errorText
                ? "rgba(255,00,00,0.5)"
                : "transparent"
            }
          ]}
        >
          {this.props.errorText}
        </Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 55
  },
  inputWrapper: {
    flexDirection: "row",
    margin: 8,
    marginBottom: 0,
    borderBottomWidth: 1
  },
  input: {
    flex: 1
  },
  icon: {
    paddingRight: 8,
    alignSelf: "center"
  },
  errorText: {
    alignSelf: "flex-end",
    paddingRight: 8,
    fontSize: 12,
    flex: 1
  }
});
