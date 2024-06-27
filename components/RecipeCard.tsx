import { TouchableOpacity, Text } from 'react-native';
import React from 'react';
import { hp } from '@/helper/common';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { MealType } from '@/models/mealType';

interface RecipeCardProps {
  meal: MealType;
  index: number;
}

export default function RecipeCard({ meal, index }: RecipeCardProps) {
  const router = useRouter();
  const isEven = index % 2 === 0;
  const isThird = index % 3 === 0;

  const handleNavigate = (id: string) => {
    router.push(`recipeDetail/${id}`);
  };

  return (
    <Animated.View
      entering={FadeInDown.delay(index * 100)
        .duration(600)
        .springify()
        .damping(12)}
    >
      <TouchableOpacity
        onPress={() => handleNavigate(meal.idMeal)}
        style={{
          width: '100%',
          flexDirection: 'column',
          justifyContent: 'space-between',
          marginBottom: 10,
          paddingLeft: isEven ? 0 : 8,
          paddingRight: isEven ? 8 : 0,
          gap: 10,
        }}
      >
        <Image
          source={{ uri: meal.strMealThumb }}
          style={{
            width: '100%',
            height: isThird ? hp(25) : hp(35),
            borderRadius: 35,
            backgroundColor: 'rgba(229, 229, 229, 0.5)',
          }}
        />

        <Text
          numberOfLines={1}
          style={{
            marginLeft: 5,
            color: 'rgba(0,0,0,0.7)',
            fontWeight: '500',
          }}
        >
          {meal.strMeal}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
}
