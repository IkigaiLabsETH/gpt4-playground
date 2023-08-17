// By using the req.query object to retrieve the contract address from the query parameters, 
// the OpenAI API can pass the contract address as part of the API call to the nftInfo.ts file. 
// The code in nftInfo.ts then uses this contract address to fetch the relevant data from the OpenSea API.

import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Retrieve the contract address from the request query parameters
  const { contractAddress } = req.query;

  // Set up the API endpoint and parameters
  const apiURL = 'https://api.opensea.io/api/v1/assets';
  const params = {
    order_direction: 'desc',
    offset: 0,
    limit: 10,
    collection: contractAddress as string, // Assuming the contract address is a string
  };

  // Set the API key in the request headers
  const headers = {
    'X-API-KEY': 'your-api-key',
  };

  // Make the API request
  axios
    .get(apiURL, { params, headers })
    .then((response) => {
      const data = response.data;

      // Extract and process the relevant information
      const extractedData = data.assets.map((asset: any) => ({
        assetName: asset.name,
        assetDescription: asset.description,
        assetImageURL: asset.image_url,
        // Process other metadata as needed
      }));

      // Send the extracted data as the API response
      res.status(200).json(extractedData);
    })
    .catch((error) => {
      console.error('Error:', error);
      // Handle and send appropriate error response
      res.status(500).json({ error: 'Internal Server Error' });
    });
}


