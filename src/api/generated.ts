import axios from 'axios';

export const apiClient = axios.create({
  baseURL: '/api', // Благодаря прокси в vite.config.ts пойдет на localhost:3000
  withCredentials: true, // Чтобы куки отправлялись автоматически!
});

export interface StageResponseDto {
  id: number;
  title: string;
  description: string;
  status: string;
  imageUrl: string | null;
  videoUrl: string | null;
  century: number;
  sign: string;
  likesCount: number;
  isMine: boolean;
  isLiked: boolean;
}

// Сгенерированные методы Swagger
export const StagesApi = {
  getStages: (century?: number) => 
    apiClient.get<StageResponseDto[]>('/stages', { params: { century } }).then(r => r.data),
  
  getFeed: (id?: number, next?: boolean) => 
    apiClient.get<StageResponseDto>('/feed', { params: { id, next } }).then(r => r.data),

  getDraft: () => 
    apiClient.get<StageResponseDto | null>('/stages/draft').then(r => r.data),

  publish: (data: { title: string; description: string; century: number; sign: string }) => 
    apiClient.put<StageResponseDto>('/stages/publish', data).then(r => r.data),

  like: (id: number, value: number) => 
    apiClient.post(`/stages/${id}/like`, { value }).then(r => r.data),

  deleteStage: (id: number) => 
    apiClient.delete(`/stages/${id}`).then(r => r.data),

  createDraft: (formData: FormData) => 
    apiClient.post<StageResponseDto>('/stages', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }).then(r => r.data),
};