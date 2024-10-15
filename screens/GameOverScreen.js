import { Text, View, Image, StyleSheet } from "react-native";
import Title from "../components/ui/Title";
import PrimaryButton from "../components/PrimaryButton";

function GameOverScreen({roundsNumber, userNumber, onStartNewGame}){
    return(
        <View style={{marginTop:10, flex: 1,justifyContent:'center',alignItems:'center'}}>
            <Title>GAME OVER!</Title>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={require('../assets/success.png')} />
            </View>
            <Text style={styles.summaryText}>Your phone needed 
                <Text style={styles.highlight}> {roundsNumber} </Text> 
                rounds to guess the number
                 <Text style={styles.highlight}> {userNumber}</Text>.</Text>
            <PrimaryButton onPress={onStartNewGame}>Start New Game</PrimaryButton>
        </View>
    )
}

export default GameOverScreen;

const styles = StyleSheet.create({
    imageContainer: {
        width : 300,
        height : 300,
        borderRadius : 160,
        borderWidth: 3,
        // borderColor: Co
        overflow: 'hidden',
        margin:36
    },
    image:{
        width:"100%",
        height:"100%"
    },
    summaryText:{
        fontFamily:'open-sans',
        fontSize:24,
        textAlign:'center',
        marginVertical:24
    },
    highlight:{
        fontFamily:'open-sans-bold'
    }
})