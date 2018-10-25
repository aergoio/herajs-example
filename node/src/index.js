import AergoClient from '@herajs/client';

const aergo = new AergoClient();

async function update() {
    const blockchain = await aergo.blockchain();
    console.log(blockchain.bestHeight, blockchain.bestBlockHash);
    setTimeout(update, 1000);
}

update();
