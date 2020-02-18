import { AergoClient, GrpcWebProvider } from '@herajs/client';
const aergo = new AergoClient({}, new GrpcWebProvider({url: 'http://testnet-api-http.aergo.io:7845'}));

document.addEventListener("DOMContentLoaded", function() {
    document.body.innerHTML += '<style>body {white-space: pre}</style>';
    document.body.innerHTML += "blockno    blockhash\n";
    
    aergo.getBlockMetadataStream().on('data', (blockMetadata) => {
        const ts = new Date(blockMetadata.header.timestamp / 1000000);
        document.body.innerHTML += `${blockMetadata.header.blockno}      ${blockMetadata.hash}    ${ts}\n`;
    });
});
