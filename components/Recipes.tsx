import { View, Text, ActivityIndicator } from 'react-native';
import React from 'react';
import { hp } from '@/helper/common';

import RecipeCard from './RecipeCard';
import { MasonryFlashList } from '@shopify/flash-list';
import { MealType } from '@/models/mealType';

interface RecipeProps {
  meals: MealType[];
  isFetchingMeal: boolean;
}

export default function Recipes({ meals, isFetchingMeal }: RecipeProps) {
  return (
    <View
      style={{
        marginHorizontal: 15,
        paddingVertical: 15,
        gap: 20,
      }}
    >
      <Text
        style={{
          fontSize: hp(3),
          color: 'rgba(0, 0, 0, 0.7)',
          fontWeight: '500',
        }}
      >
        Recipes
      </Text>
      <View>
        {isFetchingMeal ? (
          <View
            style={{
              marginTop: hp(18),
            }}
          >
            <ActivityIndicator />
          </View>
        ) : (
          <MasonryFlashList
            keyExtractor={(item) => item.idMeal.toString()}
            data={meals}
            numColumns={2}
            renderItem={({ item, index }) => (
              <RecipeCard meal={item} index={index} />
            )}
            estimatedItemSize={200}
          />
        )}
      </View>
    </View>
  );
}
