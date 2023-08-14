import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export async function fetchComic(comicId: string) {
  try {
    const response = await axios.get(`${API_URL}/comics/${comicId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching comic:', error);
    throw error;
  }
}

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

export async function fetchComicsByCategory(
  category: string,
  page: number = 1,
  limit: number = 10,
) {
  try {
    const response = await axios.get(`${API_URL}/comics`, {
      params: {
        category,
        page,
        limit,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching comics by category:', error);
    throw error;
  }
}

export async function fetchEarliestDiaryComicId() {
  try {
    const response = await axios.get(`${API_URL}/api/comics/earliest-diary-id`);
    return response.data.id;
  } catch (error) {
    console.error('Error fetching earliest diary comic ID:', error);
    throw error;
  }
}
