import { TextInput,StyleSheet, Alert, View } from "react-native";
import React, {useState} from 'react';
import PrimaryButton from "../components/PrimaryButton";

function StartGameScreen({onPickNumber}){
    const [enteredNumber, setEnteredNumber] = useState('');

    function numberInputHandler(enteredText){
        setEnteredNumber(enteredText)
    }

    function resetInputHandler(){
        setEnteredNumber('')
    }

    function confirmInputHandler(){
        const chosenNumber = parseInt(enteredNumber)

        if(isNaN(chosenNumber) || chosenNumber <=0 || chosenNumber >99){
            Alert.alert('Invalid Numbar!', 'Number has to be a number between 1 and 99',
                [{text:'Okay',style:'destructive',onPress:resetInputHandler }]
            )
            return 
        }

        onPickNumber(chosenNumber);
    }

    return <View style={styles.inputContainer}>
        <TextInput style={styles.numberInput} maxLength={2} 
         autoCapitalize="none" keyboardType="number-pad"
         autoCorrect={false}
         onChangeText={numberInputHandler}
         value={enteredNumber}/>
        <View style={styles.buttonsContainer}>
            <View style={styles.buttonContainer}>
                <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
            </View>
            <View style={styles.buttonContainer}>
                <PrimaryButton onPress={confirmInputHandler}>Confirm</PrimaryButton>
            </View>
        </View>
    </View>
}

export default StartGameScreen;

const styles = StyleSheet.create({
    inputContainer:{
        justifyContent:'center',
        alignItems:'center',
        marginTop:100,
        marginHorizontal:24,
        padding:16,
        backgroundColor:'#4e0329',
        borderRadius:8,
        elevation:4,
        //ios
        shadowColor:'black',
        shadowOffset:{width:0, height:20},
        shadowRadius:6,
        shadowOpacity:0.25
    },
    numberInput:{
        height :50,
        width:50,
        fontSize: 32,
        borderBottomColor:'#4e0320',
        borderBottomWidth:2,
        color:"#ddb52f",
        marginVertical:8,
        fontWeight:'bold',
        textAlign:'center'
    },
    buttonsContainer:{
        flexDirection:'row'
    },
    buttonContainer:{
        flex:1
    }
})