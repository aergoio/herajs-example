import Aergo from 'herajs';

const aergo = new Aergo();

async function update() {
    const blockchain = await aergo.blockchain();
    console.log(blockchain.bestHeight, blockchain.bestBlockHash);
    setTimeout(update, 1000);
}

update();
