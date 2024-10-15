import { View, Text, StyleSheet, onPress, Alert, FlatList } from "react-native";
import Title from "../components/ui/Title";
import {useState, useEffect} from 'react'
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/PrimaryButton";
import {Ionicons} from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import GuessLogItem from "../components/game/GuessLogItem";

function generateRandomBetween(min, max, exclude){
    const rndNum = Math.floor(Math.random() * (max-min) + min)

    if(rndNum === exclude){
        return generateRandomBetween(min, max, exclude);
    }else{
        return rndNum;
    }
}

let minBoundary = 1;
let maxBoundary = 100;

function GameScreen({userNumber, onGameOver}) {
    const intialGuess = generateRandomBetween(
        1,
        100,
        userNumber);
    const [guesRounds, setGuessRounds] = useState([intialGuess])
    const [currentGuess, setCurrentGuess] = useState(intialGuess);

    useEffect(()=>{
        if(currentGuess === userNumber){
            onGameOver();
        }
    },[currentGuess,userNumber,onGameOver])

    useEffect(()=>{
        minBoundary = 1;
        maxBoundary = 100;
    },[])

    function nextGuessHandler(direction){
        if(
            (direction === 'lower' && currentGuess < userNumber) ||
            (direction === 'higher' && currentGuess > userNumber)
        ){
            Alert.alert("Don't lie!","You know that this is wrong...",
                 [{text:'Sorry!', style:'cancel'}]);
            return;
        }

        if(direction === 'lower'){ 
            maxBoundary = currentGuess;
        }else{
            minBoundary = currentGuess + 1;
        }
        const newRndNumber = generateRandomBetween(minBoundary,maxBoundary, currentGuess)
        setCurrentGuess(newRndNumber)
        setGuessRounds((prevGuessRounds)=> [newRndNumber,...prevGuessRounds])
    }

    const guesRoundListLength = guesRounds.length;

  return (
    <View style={styles.screen}>
            <Title>Opponent's Guess!</Title>
            <NumberContainer>{currentGuess}</NumberContainer>
        <View>
            <Text>Higher or Lower?</Text>
        <View>
            <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
                <AntDesign name="minus" size={24} color="white" />
            </PrimaryButton>
            <PrimaryButton onPress={nextGuessHandler.bind(this, 'higher')}>
                <Ionicons name="add" size={24} color="white"/>
            </PrimaryButton>
        </View>
        </View>
      {/* LOG ROUNDS */}
      <View>
        {/* {guesRounds.map(guesRound=> <Text key={guesRound}>{guesRound}</Text>)} */}
        <FlatList data={guesRounds}
            keyExtractor={(item)=>item}
            renderItem={(itemData)=>
                <GuessLogItem roundNumber={guesRoundListLength - itemData.index} guess={itemData}/>}>   
        </FlatList>
      </View>
    </View>
  );
}

export default GameScreen;


const styles = StyleSheet.create({
    screen:{
        flex:1,
        padding:24,
        marginTop:70
    }
})