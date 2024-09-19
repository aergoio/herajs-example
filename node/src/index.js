import { AergoClient, GrpcProvider } from '@herajs/client'

const aergoNode = 'testnet-api.aergo.io:7845'

const dttNode = 'node.dttalliance.co.kr:443'

const gangjinNode = 'node.tsagangjin.co.kr:443'

const aergo = new AergoClient({}, new GrpcProvider({ url: aergoNode }))

async function update() {
  const blockchain = await aergo.blockchain()
  console.log(blockchain.bestHeight, blockchain.bestBlockHash)
  const block = await aergo.getBlock(blockchain.bestHeight)
  console.log(block)
  if (block.body.txsList.length) {
    console.log(block.body.txsList[0])
    const txInfo = await aergo.getTransaction(block.body.txsList[0].hash)
    console.log(txInfo)
    const account = await aergo.getState(txInfo.tx.from)
    console.log(account)
  }
  setTimeout(update, 1000)
}

update()
