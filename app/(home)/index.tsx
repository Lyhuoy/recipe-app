import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import React from 'react';
import { hp, wp } from '@/helper/common';
import { Feather } from '@expo/vector-icons';
import Category from '@/components/Category';
import Recipes from '@/components/Recipes';
import { useCategory } from '@/hooks/useCategory';
import { useMeal } from '@/hooks/useMeal';

export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = React.useState<string>('Beef');
  const { category, isFetching } = useCategory();
  const { meals, isFetchingMeal, getMeal } = useMeal();

  const handleChangeCategory = (category: string) => {
    getMeal(category);
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: 'white',
        flex: 1,
      }}
    >
      <ScrollView>
        <View
          style={{
            paddingHorizontal: 15,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <View
              style={{
                gap: wp(2),
              }}
            >
              <Text
                style={{
                  fontSize: wp(6),
                }}
              >
                Hello,
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{
                    fontSize: wp(6),
                  }}
                >
                  Dude 👋
                </Text>
              </View>
            </View>
            <View>
              <Image
                source={require('@/assets/images/react-logo.png')}
                style={{
                  width: wp(15),
                  height: wp(15),
                }}
              />
            </View>
          </View>
          <View
            style={{
              marginTop: wp(5),
            }}
          >
            <Text
              style={{
                fontSize: wp(8),
                color: 'rgba(0,0,0,0.7)',
              }}
            >
              Make our own food,{`\n`}stay at
              <Text
                style={{
                  fontSize: wp(8),
                  color: 'orange',
                }}
              >
                {' '}
                home
              </Text>
            </Text>
          </View>

          <View
            style={{
              marginVertical: wp(5),
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: 'rgba(229, 229, 229, 0.5)',
              paddingHorizontal: 10,
              borderRadius: 100,
              paddingVertical: wp(2),
            }}
          >
            <TextInput
              placeholder="Search any recipe"
              placeholderTextColor="rgba(0,0,0,0.5)"
              style={{
                marginLeft: 10,
              }}
            />
            <View
              style={{
                padding: 8,
                borderRadius: 100,
                backgroundColor: 'white',
              }}
            >
              <Feather name="search" size={18} color="black" />
            </View>
          </View>
        </View>

        <View>
          {!isFetching && category && category.length > 0 ? (
            <>
              <Category
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
                categories={category}
                handleChangeCategory={handleChangeCategory}
              />
              <Recipes meals={meals} isFetchingMeal={isFetchingMeal} />
            </>
          ) : (
            <View
              style={{
                marginTop: hp(20),
              }}
            >
              <ActivityIndicator />
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
