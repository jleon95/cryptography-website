import axios from 'axios';

export async function callAPI(action: string, parameters: NewTextRequestOptions) {

  switch (action) {
    case "text": {
      const response = await axios.post("http://localhost:1337/monoalphabetic/text", parameters);
      return response.data;
    }
    case "hint": {
      const response = await axios.post("http://localhost:1337/monoalphabetic/hint", parameters);
      return response.data;
    }
    case "validation": {
      const response = await axios.post("http://localhost:1337/monoalphabetic/validation", parameters);
      return response.data;
    }
  }
}

export interface NewTextResponse {
  newText: string
}

export interface NewTextRequestOptions {
  keepSpaces: boolean,
  keepPunctuation: boolean
}