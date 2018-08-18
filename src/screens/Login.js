import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  Animated,
  TouchableOpacity,
  ImageBackground,
  LayoutAnimation,
  UIManager
} from "react-native";
import Toast, { DURATION } from "react-native-easy-toast";
import UserInput from "../components/UserInput";
import Heading from "../components/Heading";

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: "Login",
      email: "",
      password: "",
      confirmPassword: "",
      submitting: false
    };
  }
  onSubmit() {
    this.setState({ submitting: true });
    var data = {
      email: this.state.email,
      password: this.state.password
    };

    if (this.state.currentPage === "Login") {
      if (this.validateEmail() && !this.validatePassword()) {
        this.refs.toast.show("Logged in successfully", 100);
      }
    } else {
      if (
        this.validateEmail() &&
        !this.validatePassword() &&
        !this.validateName() &&
        !this.validateConfirmPassword()
      ) {
        this.refs.toast.show("User registered successfully", 100);
      }
    }
  }
  onChangeText(key, value) {
    this.setState({ [key]: value });
  }
  validateEmail() {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(this.state.email);
  }
  validatePassword() {
    return this.state.password.length < 6;
  }
  validateConfirmPassword() {
    return this.state.password !== this.state.confirmPassword;
  }
  resetState(currentPage) {
    this.setState({
      currentPage,
      email: "",
      password: "",
      confirmPassword: "",
      submitting: false
    });
  }
  onPress(currentPage) {
    this.resetState(currentPage);
    LayoutAnimation.easeInEaseOut();
  }
  render() {
    return (
      <ImageBackground
        source={require("../assets/bg_screen.jpg")}
        style={styles.container}
      >
        <Text style={styles.headingText}>SAMPLE APP</Text>
        <View style={styles.headingWrapper}>
          <Heading
            text={"Login"}
            currentPage={this.state.currentPage}
            onPress={currentPage => this.onPress(currentPage)}
          />
          <Heading
            text={"SignUp"}
            currentPage={this.state.currentPage}
            onPress={currentPage => this.onPress(currentPage)}
          />
        </View>
        <Animated.View style={styles.wrapper}>
          <UserInput
            secureTextEntry={false}
            errorText={
              this.state.submitting && !this.validateEmail()
                ? "Invalid Email"
                : ""
            }
            onChangeText={value => {
              this.onChangeText("email", value);
            }}
            value={this.state.email}
          />

          <UserInput
            secureTextEntry={true}
            iconName="ios-lock-outline"
            placeholder="Password:"
            errorText={
              this.state.submitting && this.validatePassword()
                ? "Password must contain atlest 6 character"
                : ""
            }
            onChangeText={value => {
              this.onChangeText("password", value);
            }}
            value={this.state.password}
          />

          {this.state.currentPage !== "Login" ? (
            <UserInput
              secureTextEntry={true}
              iconName="ios-lock-outline"
              placeholder="Confirm Password:"
              errorText={
                this.state.submitting && this.validateConfirmPassword()
                  ? "Password doesn't match"
                  : ""
              }
              onChangeText={value => {
                this.onChangeText("confirmPassword", value);
              }}
              value={this.state.confirmPassword}
            />
          ) : null}
          <TouchableOpacity
            style={styles.submitBtn}
            onPress={() => {
              this.onSubmit();
            }}
          >
            <Text style={styles.submitBtnText}>
              {this.state.currentPage === "Login" ? "LOGIN" : "SIGN UP"}
            </Text>
          </TouchableOpacity>
        </Animated.View>
        <Toast ref="toast" />
      </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  headingText: {
    color: "#fff",
    fontSize: 24,
    top: "15%",
    position: "absolute"
  },
  wrapper: {
    backgroundColor: "#fff",
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    padding: 20
  },
  headingWrapper: {
    width: "60%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    margin: 10
  },
  styleInput: {
    padding: 10,
    width: "100%"
  },
  submitBtn: {
    width: 100,
    marginTop: 20,
    borderRadius: 5,
    height: 30,
    backgroundColor: "rgb(247, 139, 136)",
    alignItems: "center",
    justifyContent: "center"
  },
  submitBtnText: {
    color: "#fff"
  }
});
