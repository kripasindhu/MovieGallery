import { DefaultTheme } from 'react-native-paper';
import { StyleSheet } from 'react-native';

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#600EE6',
    secondary: '#414757',
    error: '#f13a59',
    black: '#000000',
  },
};
export const commonstyles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems :'center',
    marginTop :20,
  },
  button: {
    width: '20%',
    height : '30%',
    marginVertical: 10,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 15,
    lineHeight: 26,
    color :'black'
  },
  textInputParent: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1e90ff",
  },
  textInput: {
    height: 45,
     width: "100%",
      borderWidth: 1,
       borderRadius: 1, 
        marginBottom: 10, 
    
  },
  textInputContainer: {
    flex: 1,
    justifyContent: "center",
  }
});