import AsyncStorage from '@react-native-async-storage/async-storage';
import FavouriteMovieModalList from '../modal/FavouriteMovieListModal';

/**
 * Deals with the local storage of FavouriteList into AsyncStorage
 *
 * @class LocalStorage
 */
class LocalStorage {
    /**
     * Get a single item
     *
     * @param {string} Id
     * @returns {Promise<FavouriteMovieModalList>}
     * @memberof LocalStorage
     */
    async getItem(Id: string): Promise<FavouriteMovieModalList> {
        return AsyncStorage.getItem(`@id:${Id}`)
        .then((json) => {
            return JSON.parse(json) as FavouriteMovieModalList;
        });
    }

    /**
     * Save a single item
     *
     * @param {FavouriteMovieModalList} item
     * @returns {Promise<void>}
     * @memberof LocalStorage
     */
    async setItem(item: FavouriteMovieModalList): Promise<void> {
        return AsyncStorage.setItem(`@id:${item.id}`,JSON.stringify(item));
    }

    async getAllItems(): Promise<FavouriteMovieModalList[]> {
        return AsyncStorage.getAllKeys()
        .then((keys: string[]) => {
            const fetchKeys = keys.filter((k) => { return k.startsWith('@id:'); });
            return AsyncStorage.multiGet(fetchKeys);
        })
        .then((result) => {
            return result.map((r) => { return JSON.parse(r[1]) as FavouriteMovieModalList; });
        });
    }
    
    async setFavItemLocal(item: FavouriteMovieModalList): Promise<void> {
        return AsyncStorage.setItem(`@id:${item.id}`,JSON.stringify(item));
    }

    async deleteFavItem(Id: string): Promise<void> {
        return AsyncStorage.removeItem(`@id:${Id}`);
    }

    async storLoginInfo(loginValue:string){
      return   AsyncStorage.setItem('@login_Key', loginValue)
    }

    async getLoginData():Promise<string>{
        var value;
        try {
          value = await AsyncStorage.getItem('@login_Key') 
            if(value != null) {
                value
            }else{
                value = '';
            }
          } catch(e) {
            value = '';
          }
        return  value;
      }
};


const localStorage = new LocalStorage();
export default localStorage;