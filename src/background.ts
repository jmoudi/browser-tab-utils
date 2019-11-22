import { Runner } from './runtime';

const messages = {
    start: `STARTED`,
    error: (err) => `ERROR` + err
}
const app = {
    name: 'redirector'
}

async function main(){
    console.log(messages.start);
    const runner = new Runner();
    runner.init();
    console.log(`app started successfully`, Boolean(app));

};
main().catch(err => console.error(err));
