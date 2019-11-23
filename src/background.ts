import { Runner } from './runtime';

/* const messages = {
    start: `STARTED`,
    error: (err) => `ERROR` + err
}
const app = {
    name: 'redirector'
} */
export const global: Global = {} as any;



async function main(){
    console.log(global);
    const runner = new Runner();
    await runner.init();
    console.log(`app started successfully`, Boolean(runner));

};
main().catch(err => console.error(err));
