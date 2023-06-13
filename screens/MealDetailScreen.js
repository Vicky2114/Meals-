import { useContext, useLayoutEffect } from "react"
import { Text, View, Image, StyleSheet,ScrollView, Button } from "react-native"
import { MEALS } from '../data/dummy-data'
import MealDetails from "../components/MealDetails"
import Subtitle from "../components/Subtitle"
import List from "../components/List"
import IconButton from "../components/IconButton"
import { useDispatch, useSelector } from "react-redux"
//import { FavoritesContext } from "../store/context/favorites-context"

import { addFavorite,removeFavorite } from "../store/redux/favoirtes"
function MealDetailScreen({ route,navigation }) {
   // const favoriteMealsCtx=useContext(FavoritesContext);
   //redux use

   const favoriteMealIds=useSelector((state)=> state.favoriteMeals.ids)
   const dispatch=useDispatch();

    const mealId = route.params.mealId

    const selectMeal = MEALS.find((meal) => meal.id === mealId)
    
   //const mealIsFavorite=favoriteMealsCtx.ids.includes(mealId);
   const mealIsFavorite=favoriteMealIds.includes(mealId);

    function changeFavoriteStatusHandler(){
        if(mealIsFavorite){
         //favoriteMealsCtx.removeFavorite(mealId)   
         dispatch(removeFavorite({id:mealId}));
        }else{
           // favoriteMealsCtx.addFavorite(mealId)
           dispatch(addFavorite({id:mealId}));
        }
    }
    useLayoutEffect(()=>{
        navigation.setOptions({
            headerRight:()=>{
                return <IconButton 
                icon={mealIsFavorite? 'star':'star-outline'}
                 color="white"
                onPress={changeFavoriteStatusHandler} />
            }
        })
    },[navigation,changeFavoriteStatusHandler])
    return  <ScrollView style={styles.rootContainer}>
        <View>
        <Image style={styles.image} source={{ uri: selectMeal.imageUrl }} />
        <Text style={styles.title}>{selectMeal.title}</Text>
        <MealDetails duration={selectMeal.duration}
            complexity={selectMeal.complexity}
            affordability={selectMeal.affordability}
            textStyle={styles.detailText} />
        <View style={styles.listOuterContainer}>
            <View style={styles.listContainer}>
                <Subtitle>Ingredients</Subtitle>
                <List data={selectMeal.ingredients} />
                <Subtitle>Steps</Subtitle>
                <List data={selectMeal.steps} />
            </View>
        </View>

    </View>
    </ScrollView>
}

export default MealDetailScreen;


const styles = StyleSheet.create({
    rootContainer:{
     marginBottom :32       
    },
    image: {
        width: '100%',
        height: 350
    },
    title: {
        fontWeight: 'bold',
        fontSize: 24,
        margin: 8,
        textAlign: 'center',
        color: 'white'
    },
    detailText: {
        color: 'white'
    },
    listContainer: {
        width: '80%'
    },
    listOuterContainer:{
        alignItems:'center'
    }


})

