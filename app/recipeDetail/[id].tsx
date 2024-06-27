import {
  View,
  ScrollView,
  ActivityIndicator,
  Text,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { useQuery } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';
import { RecipeDetailType } from '@/models/recipeDetailType';
import { hp } from '@/helper/common';
import { AntDesign, Ionicons, Octicons } from '@expo/vector-icons';
import YoutubeIframe from 'react-native-youtube-iframe';
import Animated, { FadeInRight } from 'react-native-reanimated';

export default function DetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [isFavorite, setIsFavorite] = React.useState(false);

  const { isLoading, data } = useQuery<RecipeDetailType | any>({
    queryKey: ['detail', id],
    queryFn: async () => {
      const response = await fetch(
        `https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      );
      const data = await response.json();
      return data.meals[0];
    },
  });

  if (isLoading || !data) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
        }}
      >
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: 'white',
      }}
    >
      <StatusBar style="light" />

      <View>
        <Image
          source={{ uri: data.strMealThumb }}
          style={{ width: '100%', height: hp(38) }}
          contentFit="cover"
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'absolute',
            top: hp(6),
            width: '100%',
            paddingHorizontal: 15,
            flex: 1,
          }}
        >
          <TouchableOpacity
            onPress={() => router.back()}
            style={{
              backgroundColor: 'white',
              borderRadius: 50,
              flexDirection: 'row',
              alignItems: 'center',
              padding: 8,
            }}
          >
            <Ionicons
              name="arrow-back-outline"
              size={24}
              color="rgba(0,0,0,0.7)"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setIsFavorite(!isFavorite)}
            style={{
              backgroundColor: 'white',
              borderRadius: 50,
              flexDirection: 'row',
              alignItems: 'center',
              padding: 8,
            }}
          >
            <AntDesign
              name={isFavorite ? 'heart' : 'hearto'}
              size={24}
              color="black"
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            padding: 15,
          }}
        >
          <View
            style={{
              gap: 5,
            }}
          >
            <Text
              numberOfLines={1}
              style={{
                fontSize: hp(3),
                color: 'rgba(0, 0, 0, 0.7)',
                fontWeight: '500',
              }}
            >
              {data.strMeal}
            </Text>
            <Text>{data.strArea}</Text>
          </View>

          <View>
            <Text
              style={{
                fontSize: hp(2.5),
                color: 'rgba(0, 0, 0, 0.7)',
                fontWeight: '500',
                marginTop: 20,
              }}
            >
              Ingredient
            </Text>
            <View
              style={{
                gap: 5,
                marginTop: 15,
                marginHorizontal: 10,
              }}
            >
              {Object.keys(data)
                .filter((key) => key.includes('strIngredient') && data[key])
                .map((key, index) => (
                  <Animated.View
                    entering={FadeInRight.delay(index * 150)
                      .duration(600)
                      .springify()
                      .damping(12)
                      .stiffness(90)}
                    key={key}
                    style={{
                      flexDirection: 'row',
                      gap: 10,
                      alignItems: 'center',
                    }}
                  >
                    <Octicons name="dot-fill" size={24} color="orange" />
                    <Text>{data[key]}</Text>
                    <Text>{data[`strMeasure${key.slice(-1)}`]}</Text>
                  </Animated.View>
                ))}
            </View>
          </View>

          <View>
            <Text
              style={{
                fontSize: hp(2.5),
                color: 'rgba(0, 0, 0, 0.7)',
                fontWeight: '500',
                marginTop: 20,
              }}
            >
              Instruction
            </Text>
            <Text
              style={{
                marginTop: 15,
                lineHeight: 25,
                color: 'rgba(0, 0, 0, 0.7)',
                fontWeight: '500',
              }}
            >
              {data.strInstructions}
            </Text>
          </View>

          <View
            style={{
              gap: 10,
            }}
          >
            <Text
              style={{
                fontSize: hp(2.5),
                color: 'rgba(0, 0, 0, 0.7)',
                fontWeight: '500',
                marginTop: 20,
              }}
            >
              Recipe Video
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <YoutubeIframe
                videoId={data.strYoutube.split('=')[1]}
                height={hp(30)}
                width={hp(42.5)}
              />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
