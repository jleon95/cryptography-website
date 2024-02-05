import axios from 'axios';

export async function callAPI(action: string, headers?: any, parameters?: any) {

  switch (action) {
    case "text": {
      const response = await axios.post("http://localhost:1337/monoalphabetic/text", headers, parameters);
      return response.data;
    }
    case "hint": {
      const response = await axios.post("http://localhost:1337/monoalphabetic/hint", headers, parameters);
      return response.data;
    }
    case "validation": {
      const response = await axios.post("http://localhost:1337/monoalphabetic/validation", headers, parameters);
      return response.data;
    }
  }
}

export interface newTextObject {
  newText: string
}