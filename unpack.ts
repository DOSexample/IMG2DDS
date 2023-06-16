//@ts-ignore
import getFiles, { exists, fileExt, trimPath, fmtFileSize } from "https://deno.land/x/getfiles/mod.ts";
//@ts-ignore
import { ByteSet, LengthType, NumberType } from "https://deno.land/x/bytes/mod.ts";
//@ts-ignore
import { BytePtr, D3DFORMAT, D3DXIMAGE_INFO, DWORD, IDFileInfo, IDirect3DTexture9, IMGUI_FOR_UNCOMPRESS, int } from "./lib/type.ts";
//@ts-ignore
import { ZLibDataPtr, Zlib } from "./lib/zlib.ts";
//@ts-ignore
import { ByteReader } from "./lib/ByteReader.ts";
//@ts-ignore
import { writeJsonAsync } from "./lib/json.ts";

export async function unpack(file: IDFileInfo|string, output: string = "") {
    //@ts-ignore
    let fpath = typeof file === "string" ? file : file.path;
    let fname = typeof file === "string" ? file : file.name;
    let dir_path = fpath;

    if( output.length ) {
        dir_path = output;
        if( dir_path[dir_path.length-1] !== "\\" || dir_path[dir_path.length-1] !== "//" )
            dir_path += "/";
    }
    while( dir_path.includes("\\") ){
        dir_path = dir_path.replace( "\\", "/" );
    }
    while( fname.includes("\\") ){
        fname = fname.replace( "\\", "/" );
    }

    let slash1 = fname.lastIndexOf( "/" );
    if( slash1 !== -1 ) {
        fname = fname.substring( slash1+1 );
    }

    let dslash1 = dir_path.lastIndexOf( "/" );
    if( dslash1 !== -1 ) {
        dir_path = dir_path.substring( 0, dslash1+1 );
    }
    if( dir_path[dir_path.length-1] !== "/" ) {
        dir_path += "/";
    }

    let ext = fname;
    const dot = ext.lastIndexOf(".");
    if( !dot ){
        console.log( `invalid ext : ${ext}` );
        return;
    }
    ext = ext.substring( dot ).toUpperCase();
    if( ext !== ".IMG" ) {
        return;
    }

    try {
        //@ts-ignore
        const text = await Deno.readFile(fpath);
        const b = ByteSet.from(text.buffer);

        const r = new ByteReader( b._buffer );

        const z = new ZLibDataPtr( r );
        const reader = Zlib.Decompress( z ) ? new ByteReader( z.tOriginal ) : {} as ByteReader;
        
        const data = reader.ReadIMGUI();

        const save_data = {
            mTextureInfo: data.mTextureInfo,
            mLoadFormat: data.mLoadFormat,
            mTextureSize: data.mTextureSize,
            mTexture: `${fname}.DDS`
        };
        //@ts-ignore
        await Deno.writeFile( `${dir_path}${fname}.DDS`, data.mTexture );
        await writeJsonAsync( `${dir_path}${fname}.JSON`, save_data );

    } catch (error: any) {
        throw Error( error );
        
    }
}