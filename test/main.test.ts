import * as self from '../src';
const log = console.log; //import {Logger,log} from '@std/log';
  import {MustacheReplacer} from '@std/string';

  
const pkg = {
    name: "tab-utils",
    version: "1.0.1"
  
  }
  const template = new MustacheReplacer({
      name: pkg.name,
      version: pkg.version
  });

beforeAll(async () => {
     
});

describe(`111`, () => {


  
    test(`res`, async () => {
        const res = template.exec("dsfcsdfsdf {{name}} dsfdshf {{version}} sdfsdf");
        log(`res`, res)
        expect(res).toBeTruthy()
    });
 
});