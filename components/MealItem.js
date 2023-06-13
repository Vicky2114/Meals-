import { View, Text, Pressable, Image,StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MealDetails from "./MealDetails";

function MealItem({ id,title,imageUrl,duration,complexity,affordability}) {
   
   const navigation= useNavigation();
   
   function selectMealItemHandler(){
    navigation.navigate('MealDetail',{
        mealId:id,
       })
   }

   
    return (
        <View style={styles.mealItem}>
            <Pressable  style={({ pressed }) => pressed ? styles.buttonPressed : null}
            android_ripple={{ color: '#ccc' }}
            onPress={selectMealItemHandler}
            >
                <View>
                    <Image source={{uri:imageUrl}} style={styles.image}/>
                    <Text style={styles.title}>{title}</Text>

                </View>
                <MealDetails duration={duration} affordability={affordability} complexity={complexity}/>
            </Pressable>
        </View>
    )
}
export default MealItem;

const styles=StyleSheet.create({

    mealItem:{
     margin:16,
     borderRadius:8,
     overflow:"hidden",
     backgroundColor:'white',
     elevation:4
    },
    buttonPressed: {
        opacity: 0.5
    },
    image:{
        width:'100%',
        height:200,
    },
    title:{
       fontWeight:'bold',
       fontSize:18,
       textAlign:'center' ,
       margin:8
    },
    details:{
        flexDirection:'row',
        alignItems:'center',
        padding:8,
        justifyContent:'center'
    },
    detailItem:{
        marginHorizontal:4,
        fontSize:12
    }
})