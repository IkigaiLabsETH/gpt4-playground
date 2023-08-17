const axios = require('axios');

async function fetchDataFromGitHub(owner, repo, path) {
  try {
    const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`);
    const content = response.data.content;

    // Decode the base64-encoded content
    const decodedContent = Buffer.from(content, 'base64').toString('utf-8');

    // Process the retrieved data as needed
    // ...

    return decodedContent;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

// Usage example
const owner = 'github_username';
const repo = 'repository_name';
const path = 'path_to_file.json';
fetchDataFromGitHub(owner, repo, path)
  .then((data) => {
    console.log('Retrieved data:', data);
    // Use the retrieved data in your app
    // ...
  })
  .catch((error) => {
    console.error('Error:', error);
  });
