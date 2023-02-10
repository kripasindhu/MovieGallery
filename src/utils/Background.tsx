import React, { memo } from 'react';
import { theme } from './theme';
import {
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

type Props = {
  children: React.ReactNode;
};
import { LinearGradient } from 'expo-linear-gradient';

const Background = ({ children }: Props) => (
<LinearGradient
        colors={['purple', 'white']}
        style={styles.container}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}>
    <KeyboardAvoidingView style={styles.container} 
   behavior={Platform.OS == "ios" ? "padding" : "height"}
   keyboardVerticalOffset={Platform.OS == "ios" ? 0 : 20}
   enabled={Platform.OS === "ios" ? true : false}>
      {children}
    </KeyboardAvoidingView>
  </LinearGradient>
);

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    backgroundColor: theme.colors.black
  },
  container: {
    flex: 1,
    padding: 20,
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
  },
});

export default memo(Background);
