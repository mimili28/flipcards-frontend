import { Card } from "../types/Card";

export const fetchCardsData = async (): Promise<Card[]> => {
  const response = await fetch('http://localhost:3001/cards');
  if (!response.ok) {
    throw new Error('Failed to fetch cards');
  }    
    const data = await response.json();    
  return data.cards;
};