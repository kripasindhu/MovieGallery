import React, { memo } from 'react';
import { StyleSheet, StatusBar,Text } from "react-native";
import { EmptyListMessage } from "../utils/StringConstants";

export function emptyListMessage(){
    return (
      // Flat List Item
      <Text
        style={commonListstyles.emptyListStyle}>
        { EmptyListMessage}
      </Text>
    );
  };

 export const commonListstyles = StyleSheet.create({
    container: {
      flex: 1,
      elevation: 20,
      marginTop: StatusBar.currentHeight || 0,
      justifyContent: 'center',
      
    },
    cardStyle: {
      padding: 10,
    },
    textStyle: {
      fontSize: 18,
      textAlign: "center",
      paddingTop: 32,
      color: "red",
    },
  
    loader: {
      flex: 5,
      justifyContent: 'center',
      alignItems: "center",
    },
    btnNormal: {
      borderColor: "blue",
      borderWidth: 1,
      borderRadius: 10,
      height: 30,
      width: 100,
    },
    btnPress: {
      borderColor: "blue",
      borderWidth: 1,
      height: 30,
      width: 100,
    },
    emptyListStyle: {
      marginTop:100,
      textAlign: 'center',
    },

  });