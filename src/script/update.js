const fs = require('fs');

const path = __dirname + '/metadata';
const buildDescription=(oldValue,id)=>'Example description...';
const buildName=(oldValue,id) =>'Name #' + id;
const buildImageUri=(oldValue,id)=> 'ipfs://__CID__/'+id+'.png';

const getTokenId=(filePath)=>{
	return filePath.match(/([0-9]+)\.json/)[1];
}

fs.readdirSync(path).forEach((fileName)=>{
	const filePath=path+'/'+fileName;
	const stat=fs.startSync(filePath);
	if(! stat.isFile()){
		return;
	}

	if (fileName.endsWith('.json')){
		const jsonContent=require(filePath);
		const tokenId=getTokenId(fileName);

		jsonContent.name= buildName(jsonContent.name, tokenId);
		jsonContent.name= buildDescription(jsonContent.description, tokenId);
		jsonContent.image= buildImageUri(jsonContent.image, tokenId);

		fs.writeFileSync(filePath,JSON.stringify(jsonContent,null,2));
		
	}
});