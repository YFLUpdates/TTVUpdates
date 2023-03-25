import { promises as fs } from 'fs';

export default async function dataFromFiles(file){
    const read = await fs.readFile(file, 'UTF-8');
    const parse = JSON.parse(read);

    return parse;
}