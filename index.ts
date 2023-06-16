//@ts-ignore
import getFiles, { exists, fileExt, trimPath, fmtFileSize } from "https://deno.land/x/getfiles/mod.ts";
//@ts-ignore
import * as path from "https://deno.land/std@0.184.0/path/mod.ts";
//@ts-ignore
import { unpack } from "./unpack.ts";
//@ts-ignore
import { IDFileInfo } from "./lib/type.ts";

//@ts-ignore
const argv = Deno.args;
console.log(argv);

//arg = [command, type, input, output]

/*example:
                               @command @type @input                             @output
unpack folder >> deno task run unpack folder E:\12Sky2\G03_GDATA\D01_GIMAGE2D\001 E:\12Sky2\G03_GDATA\D01_GIMAGE2D\001


                             @command @type @input                             @output
unpack file >> deno task run unpack file E:\12Sky2\G03_GDATA\D01_GIMAGE2D\001\001_00001 E:\12Sky2\G03_GDATA\D01_GIMAGE2D\001


*/

function startUp(){

type CommandType = "unpack" | "repack";
type FileType = "folder" | "file";

let cmd = argv.length > 0 ? argv[0] : ""; //CommandType
let type = argv.length > 1 ? argv[1] : ""; //FileType

//folder | file
let input = argv.length > 2 ? argv[2] : "";

//folder only
let output = argv.length > 3 ? argv[3] : "";

let isError = false;
let isUnpack = false;
let isFolder = false;

switch( ( cmd as CommandType ) )
{
case "repack":
  break;
case "unpack":
  isUnpack = true;
  break;
default:
  console.error("%cUnknow command","color:red");
  return;
}

switch( ( type as FileType ) )
{
case "file":
  break;
case "folder":
  isFolder = true;
  break;
default:
  console.error("%cUnknow type","color:red");
  return;
}

async function getFileInFolder(isUnpack: boolean,input: string,output: string){
  const files = getFiles(input) as IDFileInfo[];
  for( var f of files ) {
    if(isUnpack) {
      await unpack(f, output);
    }
  }
}

async function doWork(isUnpack: boolean,isFolder: boolean,input: string,output: string)
{

  if( output.length ) {
    const e = await exists( output );
    if( !e ) {
      //@ts-ignore
      Deno.mkdir( output );
    }
  }

  if( isFolder ) {
    await getFileInFolder(isUnpack,input,output);
    return;
  }
  await unpack(input,output);

}

doWork(isUnpack,isFolder,input,output);

}

startUp();