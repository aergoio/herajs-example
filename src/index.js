import Aergo from 'herajs';

let aergo = new Aergo();

aergo.accounts.get().then((accounts) => {
    console.log(accounts);
});