import AergoClient from '@herajs/client';

const aergo = new AergoClient();

async function update() {
    const blockchain = await aergo.blockchain();
    document.body.innerHTML +=  blockchain.bestHeight + '      ' + blockchain.bestBlockHash + "\n";
    setTimeout(update, 1000);
}

document.addEventListener("DOMContentLoaded", function() {
    document.body.innerHTML += '<style>body {white-space: pre}</style>';
    document.body.innerHTML += "blockno   blockhash\n";
    update();

    /*
    aergo.getBlockHeaderStream().on('data', (blockHeader) => {
        const obj = blockHeader.toObject();
        document.body.innerHTML +=  obj.blockno + '      ' + obj.timestamp + "\n";
    });
    */
});
