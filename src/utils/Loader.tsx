import React from 'react';
import LottieView from 'lottie-react-native';

const Loader = () => {
    return (
              <LottieView
              autoPlay loop
              source={require("../assets/loader.json")}/>
    )};       
export default Loader;
