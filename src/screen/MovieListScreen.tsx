import React, { useState, memo, useEffect } from "react";
import axios from "axios";
import { Card, Text, Button } from "react-native-paper";
import { View, FlatList, Alert } from "react-native";
import FavouriteMovieModalList from "../modal/FavouriteMovieListModal";
import LocalStorage from "../utils/LocalStorage";
import sampleJson from "../utils/saved_data.json";
import {
  AddedToFavorite,
  AddToFavorite,
  ViewDetails,
  URL,
  ComingSoonText,
} from "../utils/StringConstants";
import { commonListstyles } from "../utils/Messages";
import Loader from "../utils/Loader";

const MovieListScreen = () => {
  const [loading, setLoading] = useState(false);
  const [apiData, setListData] = useState<FavouriteMovieModalList[]>(null);

  useEffect(() => {
    callMoviewURL();
    //setListData(sampleJson);
  }, []);

  function callMoviewURL() {
    setLoading(true);
    axios
      .get(URL)
      .then((response) => {
        console.log("getting data from axios", response.data);
        setTimeout(() => {
          setLoading(false);
          setListData(response.data);
        }, 200);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        setListData(sampleJson);
      });
  }

  function addToFavorite(id) {
    const newList = apiData.map((item) => {
      if (item.id === id) {
        const updatedItem = {
          ...item,
          isAdded: !item.isAdded,
        };
        item.isAdded = updatedItem.isAdded;
        if (updatedItem.isAdded === false) {
          LocalStorage.deleteFavItem(updatedItem.id);
        } else {
          LocalStorage.setFavItemLocal(updatedItem);
        }
        return updatedItem;
      }
      return item;
    });
    setListData(newList);
  }
  function showDetailAlert(){
    Alert.alert(ComingSoonText);
  }

  const renderMovieItem = (result: { item: FavouriteMovieModalList }) => {
    return (
      <Card style={commonListstyles.cardStyle}>
        <Text numberOfLines={1} style={commonListstyles.textStyle}>
          {result.item.title}
        </Text>
        <Card.Cover source={{ uri: result.item.url }} />
        <Card.Actions>
          <Button onPress={() => addToFavorite(result.item.id)}>
            {result.item.isAdded ? AddedToFavorite : AddToFavorite}
          </Button>
          <Button onPress={() => showDetailAlert()}> {ViewDetails} </Button>
        </Card.Actions>
      </Card>
    );
  };
  return (
    <View style={commonListstyles.container}>
      <FlatList
        data={apiData}
        renderItem={renderMovieItem}
        keyExtractor={(item) => `row-${item.id}`} />
      <View style={commonListstyles.loader}>{loading && Loader()}</View>
    </View>
  );
};
export default memo(MovieListScreen);
