
import {useState} from 'react';
import { StyleSheet, ImageBackground, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';
import {useFonts} from 'expo-font';
import AppLoading from 'expo-app-loading';

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [gameIsOver, setGameIsOver] = useState(true);
  const [guessRounds, setGuessRounds] = useState(0)

  const [fontsLoaded] = useFonts({
    'open-sans' : require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold' : require('./assets/fonts/OpenSans-Bold.ttf')
  })

  if(!fontsLoaded){
    return <AppLoading/>;
  }

  function pickedNumberHandler(pickedNumber){
    setUserNumber(pickedNumber);
    setGameIsOver(false);
    }

  function gameOverHandler(){
    setGameIsOver(true)
  }

  function startNewGameHandler(){
    setUserNumber(null);
    setGuessRounds(0)
  }

  let screen = <StartGameScreen onPickNumber={pickedNumberHandler}/>;

  if(userNumber){
    screen= <GameScreen onGameOver={gameOverHandler} userNumber={userNumber}/>
  }

  if(userNumber && gameIsOver){
    screen= <GameOverScreen roundsNumber={guessRounds} userNumber={userNumber} 
    onStartNewGame={startNewGameHandler}/>
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
