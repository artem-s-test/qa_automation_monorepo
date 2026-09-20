export interface UserProfile {
    id: number;
    email: string;
    isActive: boolean;
    phoneNumber?: string
}

export interface CreatedRecipeData {
    id: string;
    title: string;
    description: string;
    category: string;
    area: string;
    time: string;
    calories: number;
    instructions: string
    ingredients: [{ id: '640c2dd963a319ea671e383b', measure: '100 g' }],
  }

export interface RecipesListData {
  data: CreatedRecipeData[];
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface RecipesListResponseBody {
  status: string;
  message: string;
  data: RecipesListData;
}