import { useEffect, useState } from 'react';
import { fetchNFTData } from '../api/opensea/nftInfo';

const NFTPage = () => {
  const [nftData, setNFTData] = useState([]);

  useEffect(() => {
    const contractAddress = 'your-contract-address'; // Replace with the desired contract address

    fetchNFTData(contractAddress)
      .then((data) => {
        setNFTData(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <h1>NFT Page</h1>
      {/* Render the NFT data */}
      {nftData.map((nft) => (
        <div key={nft.assetName}>
          <h2>{nft.assetName}</h2>
          <p>{nft.assetDescription}</p>
          <img src={nft.assetImageURL} alt={nft.assetName} />
        </div>
      ))}
    </div>
  );
};

export default NFTPage;