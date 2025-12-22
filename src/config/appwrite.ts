// Appwrite configuration
export const APPWRITE_ENDPOINT = import.meta.env.VITE_APPWRITE_ENDPOINT || 'https://69478a26003b6dfde997.syd.appwrite.run';
export const APPWRITE_PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID || '';
export const APPWRITE_BUCKET_ID = import.meta.env.VITE_APPWRITE_BUCKET_ID || '';
export const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT || 'https://69478a26003b6dfde997.syd.appwrite.run';

// File upload utility
export const uploadPdf = async (file: File): Promise<any> => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    // In development, use the Vite proxy path
    const baseUrl = import.meta.env.DEV ? '/api' : API_ENDPOINT;
    
    // For development, we just need to use the path since it's a relative URL
    const requestUrl = import.meta.env.DEV 
      ? `${baseUrl}?_t=${Date.now()}`
      : `${baseUrl}?_t=${Date.now()}`;
    
    const response = await fetch(requestUrl, {
      method: 'POST',
      body: formData,
      // No need for CORS headers when using the proxy
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Server response error:', errorText);
      throw new Error(`HTTP error! status: ${response.status}: ${errorText}`);
    }

    try {
      return await response.json();
    } catch (jsonError) {
      console.error('Error parsing JSON response:', jsonError);
      throw new Error('Invalid JSON response from server');
    }
  } catch (error) {
    console.error('Error uploading file:', error);
    if (error instanceof TypeError) {
      throw new Error('Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối mạng của bạn.');
    }
    throw error;
  }
};
