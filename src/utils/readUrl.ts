import axios from 'axios';

async function readUrl(url: string): Promise<string> {
  try {
    const response = await axios.get(url);
    return response.data;
  } 
}

const url = 'https://www.livethelife.tv';
readUrl(url)
  .then((webpageContent) => {
    console.log(webpageContent);
  })
  .catch((error) => {
    console.error(error);
  });