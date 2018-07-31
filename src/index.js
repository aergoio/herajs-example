import Aergo from 'herajs';

async function test() {
    const aergo = new Aergo();
    const accounts = await aergo.accounts.get();
    console.log(accounts);
}

test();
