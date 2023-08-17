import axios from 'axios';

export async function fetchNFTData(contractAddress: string) {
  // Set up the API endpoint and parameters
  const apiURL = 'https://api.opensea.io/api/v1/assets';
  const params = {
    order_direction: 'desc',
    offset: 0,
    limit: 10,
    collection: contractAddress,
  };

  // Set the API key in the request headers
  const headers = {
    'X-API-KEY': 'your-api-key',
  };

  try {
    // Make the API request
    const response = await axios.get(apiURL, { params, headers });
    const data = response.data;

    // Extract and process the relevant information
    const extractedData = data.assets.map((asset: any) => ({
      assetName: asset.name,
      assetDescription: asset.description,
      assetImageURL: asset.image_url,
      // Process other metadata as needed
    }));

    return extractedData;
  } catch (error) {
    console.error('Error:', error);
    throw new Error('Failed to fetch NFT data');
  }
}
