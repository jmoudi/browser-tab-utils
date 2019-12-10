
const log = console.log; //import {Logger,log} from '@std/log';
import {MustacheReplacer} from '@std/string';
/* 
groupDuplicates([
  { url: "http://aaa/#joj"}, { url: "http:bbb/#sdsdf"}, { url: "http://aaa"}, { url: "http:ccc/#pp" }, 
  { url: "http:ccc/#gzrd" }, { url: "http:ddd/" }, { url: "http:aaa/#pkpkd"}
]) */

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