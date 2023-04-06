// src/services/comics.ts
import axios from 'axios';

const API_URL = 'http://localhost:3001';

export async function fetchComics(comicCollection: string, page: number) {
  try {
    const response = await axios.get(`${API_URL}/comics`, {
      params: { comicCollection, page },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching comics:', error);
    throw error;
  }
}
