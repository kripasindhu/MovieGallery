import React, { useState, memo, useEffect } from "react";
import { Card, Text, Button } from "react-native-paper";
import { View, FlatList,Alert } from "react-native";
import FavouriteMovieModalList from "../modal/FavouriteMovieListModal";
import LocalStorage from "../utils/LocalStorage";
import { AddedToFavorite, RemoveFromFavorite,ViewDetails,ComingSoonText } from "../utils/StringConstants";
import { emptyListMessage, commonListstyles } from "../utils/Messages";


const FavoriteListScreen = () => {
  const [savedList, setSavedList] = useState<FavouriteMovieModalList[]>(null);

  useEffect(() => {
 callSavedFavoriteListData();
  }, [callSavedFavoriteListData]);

  function callSavedFavoriteListData() {
    var itemsFromLocalStorage = LocalStorage.getAllItems();
    itemsFromLocalStorage.then((item) => {
     if( item.length>=0){
      setSavedList(item);
      }
    });
  }

  function removeItem(id) {
    LocalStorage.deleteFavItem(id);
  }
  function checkItemAdded(result:FavouriteMovieModalList):string {
    if(result != null){
      if(result.isAdded){
        return RemoveFromFavorite
      }else{
      return  AddedToFavorite
      }
    }
  }
  function showDetailAlert(){
    Alert.alert(ComingSoonText);
  }
  const renderMovieItem = (result: { item: FavouriteMovieModalList }) => {
    if(result.item == null){
      return;
    }
    return (
      <Card style={commonListstyles.cardStyle}>
        <Text numberOfLines={1} style={commonListstyles.textStyle}>
          { result.item.title}
        </Text>
        <Card.Cover source={{ uri: result.item.url}} />
        <Card.Actions>
          <Button onPress={() => removeItem(result.item.id)}>
            {checkItemAdded(result.item)}
          </Button>
          <Button onPress={() => showDetailAlert()}> {ViewDetails} </Button>
        </Card.Actions>
      </Card>
    );
  };
  return (
    <View style={commonListstyles.container}>
      <FlatList
        data={savedList}
        renderItem={renderMovieItem}
        keyExtractor={(item) => `row-${item != null ?item.id:""}`}
        ListEmptyComponent={emptyListMessage}
      />
    </View>
  );
};
export default FavoriteListScreen;
