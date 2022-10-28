import fetch from 'node-fetch';

type info = {
  count: number;
  pages: number;
  next: string;
  prev:number;
};

type result = {
  id: number;
  name: string;
  air_date: string;
  episode:string;
  characters:character[];
  url:string;
  created:string
};

type origin = {
name:string;
location:string;
}

type character = {
  id: number;
  name: string;
  status:string;
  species:string;
  type:string;
  gender:string;
  origin:origin;
  location:origin;
  image:string;
  episode:string[];
  url:string;
  created:string;
};

type GetEpisodesResponse = {
  info: info;
  results:result[];
};

async function getAllEpisodes() {
  try {
    
    const response = await fetch('https://rickandmortyapi.com/api/episode', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }
   
    
    const result = (await response.json()) as GetEpisodesResponse;
  
    return result;
  } catch (error) {
    if (error instanceof Error) {
      console.log('error message: ', error.message);
      return error.message;
    } else {
      console.log('unexpected error: ', error);
      return 'An unexpected error occurred';
    }
  }
}

 
getAllEpisodes();
