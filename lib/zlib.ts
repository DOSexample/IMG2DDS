import Pako from "pako";
//@ts-ignore
import { BOOL, FALSE, TRUE, int } from "./type.ts";
//@ts-ignore
import { ByteReader } from "./ByteReader.ts";

export class ZLibDataPtr
{
	tOriginalSize: int = 0;
	tOriginal: Uint8Array = {} as Uint8Array;
	tCompressSize: int = 0;
	tCompress: Uint8Array= {} as Uint8Array;
	constructor( r: ByteReader )
	{
		this.tOriginalSize = r.ReadInt();
		this.tCompressSize = r.ReadInt();
		if( r.CheckValid( this.tCompressSize ) )
			this.tCompress = r.ReadBytes( this.tCompressSize );
		else
			this.tCompress = r.GetRemain();
	}
}

export class Zlib
{
    static Decompress( z: ZLibDataPtr ) : BOOL
    {
		try
		{
			z.tOriginal = Pako.inflate( z.tCompress );
			if( z.tOriginal.length == z.tOriginalSize )
			{
				return TRUE;
			}
		}
		catch( e )
		{
			console.error( e );
		}
        console.log( `failed to decompress: ${z.tOriginalSize},${z.tCompressSize}` );
		return FALSE;
    }
	static Clear( z: ZLibDataPtr )
	{
		if( !z ) return;
		z.tCompressSize = 0;
		z.tOriginalSize = 0;
		z.tOriginal = {} as Uint8Array;
		z.tCompress = {} as Uint8Array;
	}
}