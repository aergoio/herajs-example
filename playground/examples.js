// get state locally

const {AergoClient} = herajs; // import AergoClient from '@herajs/client';
const aergo = new AergoClient();

async function update() {
  const blockchainState = await aergo.blockchain();
  console.log(JSON.stringify(blockchainState, null, 2));
}

update();

// get state remotely

const {AergoClient} = herajs; // import AergoClient from '@herajs/client';
const fullnode_url = 'https://testnet-api-http.aergo.io';
const aergo = new AergoClient({}, new herajs.GrpcWebProvider({url: fullnode_url}));

async function update() {
  const blockchainState = await aergo.blockchain();
  console.log(JSON.stringify(blockchainState, null, 2));
}

update();


// queryContract

const {AergoClient, Contract} = herajs; // import AergoClient, {Contract} from '@herajs/client';
const fullnode_url = 'https://testnet-api-http.aergo.io';
const aergo = new AergoClient({}, new herajs.GrpcWebProvider({url: fullnode_url}));

async function queryContract() {
  const contract_address = 'AmghVdKEfjexLvvafP4gpNka6dn6Js3G6tbpRuSDU5dcGJhamVc7';
  const contract = Contract.atAddress(contract_address);
  contract.loadAbi(await aergo.getABI(contract_address));
  const queryResult = await aergo.queryContract(contract.lookup('customer01'));
  console.log(queryResult);
}

queryContract();


// sendTx


const {AergoClient} = herajs; // import AergoClient from '@herajs/client';
const fullnode_url = 'https://testnet-api-http.aergo.io';
const aergo = new AergoClient({}, new herajs.GrpcWebProvider({url: fullnode_url}));

async function sendTx() {
  const fromAddress = 'AmLacMaj2deFUMifT4RpbNLV5cDX6ividMdDgZbDBuwHc8vxBJYo';
  await aergo.accounts.unlock(fromAddress, '1234');
  const txhash = await aergo.accounts.sendTransaction({
      from: fromAddress,
      to: 'AmQPLwkPXDskwhkZztB3FQCb4MoVthsgAMVGNPcfmEyttXHYDw1c',
      amount: 123
  });
  await aergo.accounts.lock(fromAddress, '1234');
  console.log(txhash);
}

sendTx();



