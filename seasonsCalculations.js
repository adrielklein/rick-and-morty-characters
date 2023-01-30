import { episodeToSeason } from "./seasonsInfo";

const convertToFrequencyList = (arr) => {
  // Create an object to store the frequency of each integer
  let frequency = {};
  arr.forEach(function (num) {
    if (frequency[num]) {
      frequency[num] += 1;
    } else {
      frequency[num] = 1;
    }
  });

  // Create a list of objects from the frequency object
  let frequencyList = [];
  for (let num in frequency) {
    frequencyList.push({ season: parseInt(num), frequency: frequency[num] });
  }

  // Sort the list of objects by season
  frequencyList.sort(function (a, b) {
    return a.season - b.season;
  });

  return frequencyList;
};

export const calculateSeasonBreakdown = (episodeList) => {
  const seasonList = episodeList.map((episode) => episodeToSeason[episode]);
  const frequencyList = convertToFrequencyList(seasonList);
  return frequencyList
    .map(({ season, frequency }) => `S${season}: ${frequency}`)
    .join(", \n");
};
