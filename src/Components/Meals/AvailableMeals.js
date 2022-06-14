import React, {useEffect, useState} from 'react';

import Card from '../UI/Card';
import styles from './AvailableMeals.module.css';
import MealItem from './MealItems/MealItem';

const AvailableMeals = () =>{

  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httperror, setHttperror] = useState();

  useEffect(() => {
    
    const fetchMeals = async () => {

      const response = await fetch ('https://food-order-app-b82d6-default-rtdb.firebaseio.com/meals.json');
    
        if(!response.ok){
          throw new Error ('Something is Wrong');
        } 
     
      const responseData = await response.json();
      const loadedMeals = [];
      
      for (const key in responseData){
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price
        });
      }

      setMeals(loadedMeals);
      setIsLoading(false);
      
    };

      fetchMeals().catch((error) => {
        setIsLoading(false);
        setHttperror(error.message);
      });

  }, []);

  
    if(isLoading){
      return(
      <section className={styles.loading} >
        <p>Loading...</p>
      </section>
      )
    }

      if(httperror){
        return(
        <section className={styles.mealsError}>
          <p>{httperror}</p>
        </section>)
      }

    const mealsList = meals.map((meal) => (
      <MealItem 
        key = {meal.id}
        id={meal.id}
        name = {meal.name}
        description = {meal.description}
        price = {meal.price}
      />));
      
    return(
        <section className={styles.meals}>
          <Card>
            <ul>{mealsList}</ul>
          </Card>
          
            
        </section>

    )
};

export default AvailableMeals;


// import { useEffect, useState } from 'react';

// import Card from '../UI/Card';
// import MealItem from './MealItems/MealItem';
// import classes from './AvailableMeals.module.css';


// const AvailableMeals = () => {
//   const [meals, setMeals] = useState([]);

//   useEffect(() => {
//     const fetchMeals = async () => {
//       const response = await fetch('https://food-order-app-b82d6-default-rtdb.firebaseio.com/meals.json');
//       const responseData = await response.json();

//       const loadedMeals = [];

//       for (const key in responseData) {
//         loadedMeals.push({
//           id: key,
//           name: responseData[key].name,
//           description: responseData[key].description,
//           price: responseData[key].price,
//         });
//       }

//       setMeals(loadedMeals);
//     };

//     fetchMeals();
//   }, []);

//   const mealsList = meals.map((meal) => (
//     <MealItem
//       key={meal.id}
//       id={meal.id}
//       name={meal.name}
//       description={meal.description}
//       price={meal.price}
//     />
//   ));

//   return (
//     <section className={classes.meals}>
//       <Card>
//         <ul>{mealsList}</ul>
//       </Card>
//     </section>
//   );
// };

// export default AvailableMeals;







// // const DUMMY_MEALS = [
// //   {
// //     id: 'm1',
// //     name: 'Biryani',
// //     description: 'Finest chicken and veggies',
// //     price: 229,
// //   },
// //   {
// //     id: 'm2',
// //     name: 'Chicken Lollipop',
// //     description: 'Finest Chicken Wings!',
// //     price: 16.5,
// //   },
// //   {
// //     id: 'm3',
// //     name: 'Barbecue Burger',
// //     description: 'American, raw, meaty',
// //     price: 129,
// //   },
// //   {
// //     id: 'm4',
// //     name: 'Green Bowl',
// //     description: 'Healthy...and green...',
// //     price: 199,
// //   },
// // ];