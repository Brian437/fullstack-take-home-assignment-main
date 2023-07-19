// import { ConnectWallet } from "@thirdweb-dev/react";
import "./styles/Home.css";
import {ThirdwebNftMedia, useContract,useContractMetadata,useNFTs} from "@thirdweb-dev/react";

export default function Home() {
  const { contract } = useContract("0x5af17BF80A501C04201C8AE4C86f34Ac2e5031CC");
  const { data: nfts, isLoading } = useNFTs(contract);
  const { data: metadata, isLoading: loadingMetadata } = useContractMetadata(contract);



  console.log("nfts",nfts);
  return (
  	<main className="container">
  		{!loadingMetadata &&
  			<header className='Heading'>
  				<div>
  					<img src={metadata?.image} alt="Dog Pics" />
  					<h1>{metadata?.name}</h1>
  				</div>
  			</header>
  		}

  		{!isLoading ?
	  		(<div className="gallery">
		  			{nfts?.map(nft =>
		  				<div className="card">
		  					<ThirdwebNftMedia metadata={nft.metadata} />
		  					<h2>{nft.metadata.name}</h2>
		  					<p>{nft.metadata.description}</p>
		  				</div>
		  			)}
		  	</div>)
	  		: (<p className="loading">Loading...</p>)
  		}
  	</main>
  );
}
