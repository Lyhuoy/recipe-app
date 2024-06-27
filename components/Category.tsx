import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';

import { hp } from '@/helper/common';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { CategoryType } from '@/models/categoryType';
import { Image } from 'expo-image';

interface CategoryProps {
  categories?: CategoryType[];
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  handleChangeCategory: (category: string) => void;
}

export default function Category({
  activeCategory,
  setActiveCategory,
  categories,
  handleChangeCategory,
}: CategoryProps) {
  const onChangeCategory = (category: string) => {
    handleChangeCategory(category);
    setActiveCategory(category);
  };

  return (
    <Animated.View entering={FadeInDown.duration(500).springify()}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          gap: 15,
          paddingHorizontal: 15,
        }}
      >
        {categories?.map((cate, index) => {
          let isActive = activeCategory === cate.strCategory;
          let activeBgColor = isActive ? 'orange' : 'rgba(0,0,0,0.1)';
          return (
            <TouchableOpacity
              onPress={() => onChangeCategory(cate.strCategory)}
              key={index}
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                gap: 5,
              }}
            >
              <View
                style={{
                  backgroundColor: activeBgColor,
                  borderRadius: 100,
                }}
              >
                <Image
                  source={{ uri: cate.strCategoryThumb }}
                  style={{
                    width: hp(6),
                    height: hp(6),
                    borderRadius: 100,
                  }}
                  contentFit="cover"
                />
              </View>
              <Text
                style={{
                  color: isActive ? 'orange' : 'rgba(0,0,0,0.7)',
                  fontSize: hp(1.6),
                }}
              >
                {cate.strCategory}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </Animated.View>
  );
}
