import fetch from 'node-fetch';

type Info = {
  count: number;
  pages: number;
  next: string;
  prev:number;
};

type Result = {
  id: number;
  name: string;
  air_date: string;
  episode:string;
  characters:Character[];
  url:string;
  created:string
};

type Origin = {
name:string;
location:string;
}

type Character = {
  json(): any;
  id: number;
  name: string;
  status:string;
  species:string;
  type:string;
  gender:string;
  origin:Origin;
  location:Origin;
  image:string;
  episode:string[];
  url:string;
  created:string;
};

type GetEpisodesResponse = {
  info: Info;
  results:Result[];
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
async function getAllCharacters(characters:string[]) {
  try {
    let res = await Promise.all(characters.map((e:string) => fetch(e , {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    })));
    let resJson = await Promise.all(res.map((e:any) => e.json())) ;
    return resJson;
  } catch (err) {
    console.log(err);
  }
}


getAllEpisodes().then(async (res:any) => {
  let list = res.results;

  for (let i = 0; i < list.length; i++) {
    let characters = await getAllCharacters(list[i].characters);
    Object.assign(list[i], { characters });
  }

  console.log("Final Result With Update Character Array >>>", {info:res.info ,results:list });
});
