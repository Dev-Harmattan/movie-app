import { nowPlayingMovies, popularMovies, upcomingMovies } from './apiPaths';

export const getNowPlayingMovies = async () => {
  try {
    const response = await fetch(nowPlayingMovies);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getUpcomingMovies = async () => {
  try {
    const response = await fetch(upcomingMovies);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {}
};

export const getPopularMovies = async () => {
  try {
    const response = await fetch(popularMovies);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
