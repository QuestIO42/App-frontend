import { api } from './api';

export interface RankingUser {
  full_name: string;
  total_xp: number;
}

export interface UserRankingResponse {
  user_ranking: RankingUser;
  position: number;
}

export const fetchRankingData = async (limit: number = 10): Promise<RankingUser[]> => {
  try {
    const response = await api.get<RankingUser[]>('/ranking', {
      params: { limit },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar dados do ranking:", error);
    return [];
  }
};

export const fetchUserRanking = async (): Promise<UserRankingResponse | null> => {
  try {
    const response = await api.get<UserRankingResponse>('/ranking/user');
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar o ranking do usuário:", error);
    return null;
  }
};