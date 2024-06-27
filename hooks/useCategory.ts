import { CategoryType } from '@/models/categoryType';
import { useQuery } from '@tanstack/react-query';

export const useCategory = () => {
  const { data, isLoading } = useQuery<CategoryType[]>({
    queryKey: ['category'],
    queryFn: async () => {
      const response = await fetch(
        'https://www.themealdb.com/api/json/v1/1/categories.php'
      );
      const data = await response.json();
      return data.categories;
    },
    enabled: true,
  });

  return { category: data, isFetching: isLoading };
};
