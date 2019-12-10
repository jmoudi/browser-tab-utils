import {
    readFileSync
} from 'fs';
import {
    writeFileAtomic, exists
} from '@std/fs';
import {
    Yaml
} from '@encoding/yaml';
import path from 'path';



async function convertJsonToYaml(){
    const src = process.argv[2];
    const dest = process.argv[3];
    //const manifestYml = Yaml.parse(readFileSync(path.resolve(src), "utf8"));
    const manifestJson = JSON.parse(readFileSync(path.resolve(src), "utf8"));
    const manifestYmlStr = Yaml.stringify(manifestJson);
    console.log(manifestJson);
    console.log(Yaml.stringify(manifestJson));
    const destP = path.resolve(dest);
    const ex = await exists(destP);
    if (ex){
        throw new Error(`f`)
    } else {
        await writeFileAtomic(destP, manifestYmlStr, 'utf8');
    }
}
async function main(){
    await convertJsonToYaml();
}
main().catch(err => console.error(err));

