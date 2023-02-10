import { TextInput } from "react-native-paper";
import { Navigation } from "./types";
import React, { memo, useState, useEffect } from "react";
import Background from "../utils/Background";
import { emailValidator, passwordValidator } from "../utils/EmailValidation";
import {Image, TouchableOpacity, Alert,ToastAndroid } from "react-native";
import Button from "../utils/Button";
import { commonstyles } from "../utils/theme";
import LocalStorage from "../utils/LocalStorage";
import { LoginFirstWarning } from "../utils/StringConstants";
import * as LocalAuthentication from "expo-local-authentication";

type Props = {
  navigation: Navigation;
};

const LoginScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);
  const [autenticateResult, setAutenticateResult] = useState();

  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
        setIsBiometricSupported(compatible);
    })();
  });

  const handleBiometricAuth = async () => {
    const isLoggedIn = LocalStorage.getLoginData();
    if ((await isLoggedIn).toString.length <= 0) {
      const savedBiometrics = await LocalAuthentication.isEnrolledAsync();
      const results = await LocalAuthentication.authenticateAsync();
      if (savedBiometrics && results.success === true) {
        navigation.navigate("BottomNavigationScreen");
        return;
      } else {
        return Alert.alert(results.error);
      }
    } else {
      return Alert.alert(LoginFirstWarning);
    }
  };
  const display = isBiometricSupported ? "flex" : "none"; // check if biometric supported

  const onLoginPressed = () => {
    checkLogin();
  };
  function checkLogin(){
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    if(emailError || passwordError){
          setEmail({ ...email, error: emailError });
        setPassword({ ...password, error: passwordError });
        if(emailError.length>0){
            ToastAndroid.show(emailError, ToastAndroid.SHORT);
        }
        if(passwordError.length>0){
            ToastAndroid.show(passwordError, ToastAndroid.SHORT);
        }
     return;
    }
    LocalStorage.storLoginInfo("true"); // save login info
    navigation.navigate("BottomNavigationScreen");
   
  }

  return (
    <Background>
     <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: "" })}
        error={!!email.error}
        autoCapitalize="none"
        textContentType="emailAddress"
        keyboardType="email-address"
        underlineColorAndroid="transparent"
        style ={commonstyles.textInput}
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        underlineColorAndroid="transparent"
        onChangeText={(text) => setPassword({ value: text, error: "" })}
        error={!!password.error}
        secureTextEntry
        style ={commonstyles.textInput}
      />
      <Button onPress={onLoginPressed}> Login</Button>
      <TouchableOpacity
        activeOpacity={10}
        onPress={handleBiometricAuth}
        style={[commonstyles.container, {display}]}>
        <Image
          source={require("../assets/fingerprint.png")}
          style={commonstyles.button} />
      </TouchableOpacity>
    </Background>
  );
};
export default memo(LoginScreen);
