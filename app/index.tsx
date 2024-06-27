import { View, Image, Text, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
import { hp } from '@/helper/common';
import { useRouter } from 'expo-router';

export default function Index() {
  const router = useRouter();
  const scale1 = useSharedValue(0);
  const scale2 = useSharedValue(0);

  useEffect(() => {
    scale1.value = 0;
    scale2.value = 0;

    const timer1 = setTimeout(() => {
      scale1.value = withSpring(scale1.value + hp(5.5));
    }, 100);

    const timer2 = setTimeout(() => {
      scale2.value = withSpring(scale2.value + hp(5));
    }, 300);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'pink',
      }}
    >
      <Animated.View
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          borderRadius: 200,
          padding: scale1,
        }}
      >
        <Animated.View
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.25)',
            borderRadius: 200,
            padding: scale2,
          }}
        >
          <Image
            source={require('@/assets/images/khmer-food.png')}
            style={{
              width: hp(20),
              height: hp(20),
            }}
          />
        </Animated.View>
      </Animated.View>

      <View
        style={{
          marginTop: hp(3),
          alignItems: 'center',
          gap: hp(1.5),
        }}
      >
        <Text
          style={{
            fontSize: hp(4),
            fontWeight: 'bold',
            color: 'white',
          }}
        >
          Foodies
        </Text>
        <Text
          style={{
            fontSize: hp(2),
            color: 'white',
          }}
        >
          Food for every special occation
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => router.push('/(home)')}
        style={{
          marginTop: hp(15),
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          paddingHorizontal: hp(5),
          paddingVertical: hp(2),
          borderRadius: hp(5),
        }}
      >
        <Text
          style={{
            color: 'white',
            fontSize: hp(2.5),
            fontWeight: 'bold',
            textTransform: 'uppercase',
          }}
        >
          Tap here to start
        </Text>
      </TouchableOpacity>
    </View>
  );
}
