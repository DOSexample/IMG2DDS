//@ts-ignore
import * as DenoJson from 'https://deno.land/x/jsonfile/mod.ts';

//@ts-ignore
export async function writeJsonAsync(filePath:string, o:any) {
    try {
        await DenoJson.writeJson( filePath, o, { spaces: 2 } );
    } catch(e) {
        console.log(e);
    }
}
//@ts-ignore
export function writeJsonSync(filePath:string, o:any) {
    try {
        DenoJson.writeJsonSync( filePath, o, { spaces: 2 } );
    } catch(e) {
        console.log(e);
    }
}