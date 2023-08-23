import axios from 'axios';

export async function fetchComic(comicId: string) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
    console.log('apiUrl', apiUrl);
    console.log('comicId', comicId);
    const response = await axios.get(`${apiUrl}/api/comics/${comicId}`);
    // const response = await axios.get(`http://localhost:3001/api/comics/${comicId}`);

    return response.data;
  } catch (error) {
    console.error('Error fetching comic:', error);
    throw error;
  }
}

export async function fetchComicsByCategory(
  category: string,
  page: number = 1,
  limit: number = 10,
) {
  try {
    const response = await axios.get(`/api/comics`, {
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
    const response = await axios.get(`/api/comics/earliest-diary-id`);
    return response.data.id;
  } catch (error) {
    console.error('Error fetching earliest diary comic ID:', error);
    throw error;
  }
}

// Matches ComicFormState + PanelState in ComicForm.tsx - how can we simplify?
interface ComicPayload {
  title: string;
  category: 'diary' | 'fantology' | 'compendium';
  description: string;
  publication_date: Date;
  panels: Array<{
    image_url: string;
    panel_number: number;
  }>;
}

export async function createComic(payload: ComicPayload) {
  try {
    const response = await axios.post('/api/cms/submitComic', payload);

    if (response.status === 200) {
      return { success: true, data: response.data };
    } else {
      return { success: false, error: response.data };
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data || 'An error occurred',
    };
  }
}

export async function deleteComic(comicId: string) {
  try {
    const response = await axios.delete(`/api/cms/deleteComic`, {
      data: {
        comicId: comicId,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting comic:', error);
    throw error;
  }
}
