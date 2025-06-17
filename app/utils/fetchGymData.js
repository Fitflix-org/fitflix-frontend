// Fetch gym data from API
export const fetchGymData = async () => {
  try {
    const response = await fetch('https://fitflix-backend-rym0.onrender.com/api/user/gyms');

    if (!response.ok) {
      throw new Error('Failed to fetch gym data');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching gym data:', error);
    return [];
  }
};
