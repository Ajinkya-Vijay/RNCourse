
import {useState} from 'react';
import { StyleSheet, ImageBackground, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen'

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [gameIsOver, setGameIsOver] = useState(true);

  function pickedNumberHandler(pickedNumber){
    setUserNumber(pickedNumber);
    setGameIsOver(false);
    }

  function gameOverHandler(){
    setGameIsOver(true)
  }

  let screen = <StartGameScreen onPickNumber={pickedNumberHandler}/>;

  if(userNumber){
    screen= <GameScreen onGameOver={gameOverHandler} userNumber={userNumber}/>
  }

  if(userNumber && gameIsOver){
    screen= <GameOverScreen/>
  }

  return (
    <LinearGradient colors={['#4e0329','#ddb52f']} style={styles.rootScreen}>
      <ImageBackground source={require('./assets/diceGame.png')}
          style={styles.rootScreen} resizeMode='cover'
          imageStyle={styles.backgroundImage}>
            <SafeAreaView style={styles.rootScreen}>
              {screen}
            </SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  rootScreen :{
    flex:1,
    // backgroundColor:"#ddb52f"
  },
  backgroundImage:{
    opacity:0.25
  }
});
