import * as self from '../src';
const log = console.log; //import {Logger,log} from '@std/log';
  
beforeAll(async () => {
     
});

describe(`111`, () => {


    test(`connected`, async () => {
        log(`db`, db)
        expect(db).toBeTruthy()
    });
 
    test(`res`, async () => {
        const res = await db.driver.raw(`SELECT * FROM sqlite_master WHERE (type == 'table' AND name != 'sqlite_stat1');`);
        log(`res`, res)
        expect(res).toBeTruthy()
    });
 
});