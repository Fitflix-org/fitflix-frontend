import { Redirect, useLocalSearchParams } from 'expo-router';

export default function GymRedirect() {
  const { id } = useLocalSearchParams();
  
  // Redirect to the gym-details page with the ID parameter
  return <Redirect href={`/gym-details?id=${id}`} />;
}