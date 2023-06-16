//@ts-nocheck
import { 
    BYTE, byte, BytePtr
    , BOOL, TRUE, FALSE
    , short, UShort
    , WORD, float, int 
    , UINT, DWORD
    , DataType,
    IMGUI_FOR_UNCOMPRESS,
    D3DXIMAGE_INFO,
    D3DFORMAT,
    D3DRESOURCETYPE,
    D3DXIMAGE_FILEFORMAT
    } from "./type.ts";
    
    export class ByteReader
    {
        data: BytePtr;
        offset: int;
        size: int;
        constructor( data: BytePtr | ArrayBuffer, offset?: int )
        {
            if( data instanceof ArrayBuffer )
                this.data = new Uint8Array( data );
            else
                this.data = data;
            this.offset = offset || 0;
            this.size = this.data.length;
        }
        static Clear( r?:ByteReader | null )
        {
            if(!r) return;
            if( r.data instanceof Uint8Array )
                r.data = new Uint8Array;
            r.offset = 0;
            r = null;
        }
        GetSize(): int { return this.data.length; }
        GetOffset(): int { return this.offset; }
        SetOffset( offset: int ){ this.offset = offset; }
        GetRemain(): ByteReader
        {
            this.data = this.data.slice( this.offset, this.offset+(this.data.length-this.offset) );
            this.offset = 0;
            return this;
        }
        GetRemainData(): Uint8Array
        {
            this.data = this.data.slice( this.offset, this.offset+(this.data.length-this.offset) );
            return this.data;
        }
        GetData(): Uint8Array { return this.data; }
        static CopyFrom(r:ByteReader, position: int, length: int ) : ByteReader
        {
            return new ByteReader( r.GetData().slice( position, position+length ) );
        }
        CheckValid( tNumberToCheck: int ): BOOL
        {
            return this.offset + tNumberToCheck <= this.data.length;
        }
        IsEnd(): BOOL
        {
            return this.offset == this.data.length;
        }
        AddReadSize( readSize: int )
        {
            this.offset += readSize;
        }
        Get( view: DataView, length: number, type: DataType ) : byte | BYTE | int | DWORD | UINT | short | UShort
        {
            if( !this.CheckValid(length) )
            {
                throw Error( `error: length, (${this.offset}+${length}) > ${this.data.length}` );
            }
            for( var i = 0; i < length; i++ )
            {
                const s = (this.offset+(length-1-i));
                switch( type )
                {
                case DataType.Int8:
                case DataType.Int16:
                case DataType.Int32:
                case DataType.Float32:
                    view.setInt8( i, this.data[s] );
                break;
                case DataType.Uint8:
                case DataType.Uint16:
                case DataType.Uint32:
                case DataType.Float64:
                    view.setUint8( i, this.data[s] );
                break;
                default: return 0;
                }
            }
            this.AddReadSize(length);
            switch( type )
            {
            case DataType.Int8: return view.getInt8(0);
            case DataType.Uint8: return view.getUint8(0);
            case DataType.Int16: return view.getInt16(0);
            case DataType.Uint16: return view.getUint16(0);
            case DataType.Int32: return view.getInt32(0);
            case DataType.Uint32: return view.getUint32(0);
            case DataType.Float32: return view.getFloat32(0);
            case DataType.Float64: return view.getFloat64(0);
            default: return 0;
            }
        }
    
        static Byte1View: DataView = new DataView( new ArrayBuffer( 1 ) );
        ReadByte(): byte
        {
            return this.Get( ByteReader.Byte1View, 1, DataType.Int8 );
        }
        ReadBYTE(): BYTE
        {
            return this.Get( ByteReader.Byte1View, 1, DataType.Uint8 );
        }	
        ReadBytes( NumOfReadBytes: int ): BytePtr
        {
            if( !this.CheckValid(NumOfReadBytes) )
            {
                throw Error( `error: length, (${this.offset}+${NumOfReadBytes}) > ${this.data.length}` );
            }
            const value = new Uint8Array( this.data.slice( this.offset, this.offset+NumOfReadBytes ) );
            this.AddReadSize(NumOfReadBytes);
            return value;
        }
    
        ReadBOOL(): BOOL
        {
            return ( this.ReadInt() === 1 ? TRUE : FALSE );
        }
    
        static Byte2View: DataView = new DataView( new ArrayBuffer( 2 ) );
        ReadShort(): int
        {
            return this.Get( ByteReader.Byte2View, 2, DataType.Int16 );
        }
    
        ReadUShort(): UShort
        {
            return this.Get( ByteReader.Byte2View, 2, DataType.Uint16 );
        }
        ReadUShort2(): UShort[] { return this.Reads(2, DataType.Uint16); }
        ReadUShort3(): UShort[] { return this.Reads(3, DataType.Uint16); }
        ReadUShort4(): UShort[] { return this.Reads(4, DataType.Uint16); }
    
        ReadWORD(): WORD
        {
            return this.Get( ByteReader.Byte2View, 2, DataType.Uint16 );
        }
        
        static Byte4View: DataView = new DataView( new ArrayBuffer( 4 ) );
        ReadInt(): int
        {
            return this.Get( ByteReader.Byte4View, 4, DataType.Int32 );
        }
        ReadInt2() : int[] { return this.Reads(2, DataType.Int32); }
        ReadInt3() : int[] { return this.Reads(3, DataType.Int32); }
        ReadInt4() : int[] { return this.Reads(4, DataType.Int32); }
        ReadInt10() : int[] { return this.Reads(10, DataType.Int32); }
    
        ReadUInt(): UINT
        {
            return this.Get( ByteReader.Byte4View, 4, DataType.Uint32 );
        }
        ReadUInt2() : int[] { return this.Reads(2, DataType.Uint32); }
        ReadUInt3() : int[] { return this.Reads(3, DataType.Uint32); }
        ReadUInt4() : int[] { return this.Reads(4, DataType.Uint32); }
    
        ReadDWORD(): UINT
        {
            return this.Get( ByteReader.Byte4View, 4, DataType.Uint32 );
        }
    
        ReadFloat(): float
        {
            return this.Get( ByteReader.Byte4View, 4, DataType.Float32 );
        }
        ReadFloat2(): float[] { return this.Reads(2, DataType.Float32); }
        ReadFloat3(): float[] { return this.Reads(3, DataType.Float32); }
        ReadFloat4(): float[] { return this.Reads(4, DataType.Float32); }
    
        Reads( tNumToRead: number, type: DataType ): float[] | int[]
        {
            var t = [];
            for( let i = 0; i < tNumToRead; i++ )
            {
                var value: any = 0;
                switch ( type )
                {
                case DataType.Int16:
                    value = this.ReadShort();
                    break;
                case DataType.Uint16:
                    value = this.ReadUShort();
                    break;
                case DataType.Int32:
                    value = this.ReadInt();
                    break;
                case DataType.Uint32:
                    value = this.ReadUInt();
                    break;
                case DataType.Float32:
                    value = this.ReadFloat();
                    break;
                }
                //@ts-ignore
                t.push( value );
            }
            return t;
        }
        ReadString( NumOfReadBytes: int ): string
        {
            var view = new DataView( ToArrayBuffer( this.ReadBytes( NumOfReadBytes ) ).buffer );
            var str = new TextDecoder("utf8").decode( view );
            return str;
        }

        ReadD3DXIMAGE_INFO() {
            const s = {} as D3DXIMAGE_INFO;
            s.Width = this.ReadUInt();
            s.Height = this.ReadUInt();
            s.Depth = this.ReadUInt();
            s.MipLevels = this.ReadUInt();
            s.Format = this.ReadUInt() as D3DFORMAT;
            s.ResourceType = this.ReadUInt() as D3DRESOURCETYPE;
            s.ImageFileFormat = this.ReadUInt() as D3DXIMAGE_FILEFORMAT;
            console.log(s);
            return s;
        }

        ReadIMGUI() {
            const s = {} as IMGUI_FOR_UNCOMPRESS;
            s.mTextureInfo = this.ReadD3DXIMAGE_INFO(); //offset 0, size = 28
            s.mLoadFormat = this.ReadUInt() as D3DFORMAT; //offset 28, size = 4
            s.mTextureSize = this.ReadInt(); //offset 32, size = 4
            s.mTexture = this.ReadBytes( s.mTextureSize ); //offset 36, size = mTextureSize
            return s;
        }
        
    }

    export function CopyArray( 
        dst: any, dstOffset: number, 
        src: any, srcOffset: number, 
        numToCopy: number 
        )
    {
        for( let i = 0; i < numToCopy; i++ )
        {
            dst[dstOffset+i] = src[srcOffset+i];
        }
    }
    
    export function ToArrayBuffer( data: Uint8Array )
    {
        const uint8 = new Uint8Array( data );
        const buffer = new ArrayBuffer( uint8.length );
        const view = new DataView( buffer );
        for( let i = 0; i < uint8.length; i++ )
        {
            view.setUint8( i, uint8[i] );
        }
        return view;
    }