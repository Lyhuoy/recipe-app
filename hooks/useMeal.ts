import { MealType } from '@/models/mealType';
import React, { useEffect } from 'react';

export const useMeal = () => {
  const [meals, setMeals] = React.useState<MealType[]>([]);
  const [isFetchingMeal, setIsFetchingMeal] = React.useState(false);

  useEffect(() => {
    getMeal();
  }, []);

  const getMeal = async (category: string = 'Beef') => {
    try {
      setIsFetchingMeal(true);
      const response = await fetch(
        `https://themealdb.com/api/json/v1/1/filter.php?c=${category}`
      );
      const data = await response.json();
      setMeals(data.meals);
      setIsFetchingMeal(false);
    } catch (error) {
      console.error(error);
      setIsFetchingMeal(false);
    }
  };

  return { meals, isFetchingMeal, getMeal };
};

// import { MealType } from '@/models/mealType';
// import { useQuery } from '@tanstack/react-query';

// export const useMeal = (category: string = 'Beef') => {
//   const {
//     data: meals,
//     isLoading: isFetchingMeal,
//     refetch: getMeal,
//   } = useQuery<MealType[]>({
//     queryKey: ['meals', category],
//     queryFn: async () => {
//       const response = await fetch(
//         `https://themealdb.com/api/json/v1/1/filter.php?c=${category}`
//       );
//       const data = await response.json();
//       return data.meals;
//     },
//   });

//   return { meals, isFetchingMeal, getMeal };
// };
