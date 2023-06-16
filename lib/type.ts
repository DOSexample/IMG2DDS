
export declare type byte = number;
export declare type BYTE = number;
export declare type BytePtr = Uint8Array;
export declare type IDirect3DTexture9 = Uint8Array;
export declare type short = number;
export declare type UShort = number;
export declare type WORD = number;
export declare type BOOL = boolean;
export declare type DWORD = number;
export declare type UINT = number;
export declare type FLOAT = number;
export declare type float = number;
export declare type int = number;
export const TRUE: boolean = true;
export const FALSE: boolean = false;

export enum DataType {
	Int8 = 0,
	Uint8,
	Int16,
	Uint16,
	Int32,
	Uint32,
	Float32,
	Float64
};

export type IDFileInfo = {
  path: string,
  name: string,
  ext: string,
  realPath: string,
  info: any
};

function MAKEFOURCC(ch0: string, ch1: string, ch2: string, ch3: string) {
  const c0 = ch0.charCodeAt(0);
  const c1 = ch0.charCodeAt(1);
  const c2 = ch0.charCodeAt(2);
  const c3 = ch0.charCodeAt(3);
  return ( c0 | c1 << 8 | c2 << 16 | c3 << 24 );
}

export enum D3DFORMAT {
  
  D3DFMT_UNKNOWN              =  0,

  D3DFMT_R8G8B8               = 20,
  D3DFMT_A8R8G8B8             = 21,
  D3DFMT_X8R8G8B8             = 22,
  D3DFMT_R5G6B5               = 23,
  D3DFMT_X1R5G5B5             = 24,
  D3DFMT_A1R5G5B5             = 25,
  D3DFMT_A4R4G4B4             = 26,
  D3DFMT_R3G3B2               = 27,
  D3DFMT_A8                   = 28,
  D3DFMT_A8R3G3B2             = 29,
  D3DFMT_X4R4G4B4             = 30,
  D3DFMT_A2B10G10R10          = 31,
  D3DFMT_A8B8G8R8             = 32,
  D3DFMT_X8B8G8R8             = 33,
  D3DFMT_G16R16               = 34,
  D3DFMT_A2R10G10B10          = 35,
  D3DFMT_A16B16G16R16         = 36,

  D3DFMT_A8P8                 = 40,
  D3DFMT_P8                   = 41,

  D3DFMT_L8                   = 50,
  D3DFMT_A8L8                 = 51,
  D3DFMT_A4L4                 = 52,

  D3DFMT_V8U8                 = 60,
  D3DFMT_L6V5U5               = 61,
  D3DFMT_X8L8V8U8             = 62,
  D3DFMT_Q8W8V8U8             = 63,
  D3DFMT_V16U16               = 64,
  D3DFMT_A2W10V10U10          = 67,

  D3DFMT_UYVY                 = MAKEFOURCC('U', 'Y', 'V', 'Y'),
  D3DFMT_R8G8_B8G8            = MAKEFOURCC('R', 'G', 'B', 'G'),
  D3DFMT_YUY2                 = MAKEFOURCC('Y', 'U', 'Y', '2'),
  D3DFMT_G8R8_G8B8            = MAKEFOURCC('G', 'R', 'G', 'B'),
  D3DFMT_DXT1                 = MAKEFOURCC('D', 'X', 'T', '1'),
  D3DFMT_DXT2                 = MAKEFOURCC('D', 'X', 'T', '2'),
  D3DFMT_DXT3                 = MAKEFOURCC('D', 'X', 'T', '3'),
  D3DFMT_DXT4                 = MAKEFOURCC('D', 'X', 'T', '4'),
  D3DFMT_DXT5                 = MAKEFOURCC('D', 'X', 'T', '5'),

  D3DFMT_D16_LOCKABLE         = 70,
  D3DFMT_D32                  = 71,
  D3DFMT_D15S1                = 73,
  D3DFMT_D24S8                = 75,
  D3DFMT_D24X8                = 77,
  D3DFMT_D24X4S4              = 79,
  D3DFMT_D16                  = 80,

  D3DFMT_D32F_LOCKABLE        = 82,
  D3DFMT_D24FS8               = 83,

/* D3D9Ex only -- */
//#if !defined(D3D_DISABLE_9EX)

  /* Z-Stencil formats valid for CPU access */
  D3DFMT_D32_LOCKABLE         = 84,
  D3DFMT_S8_LOCKABLE          = 85,

//#endif // !D3D_DISABLE_9EX
/* -- D3D9Ex only */


  D3DFMT_L16                  = 81,

  D3DFMT_VERTEXDATA           =100,
  D3DFMT_INDEX16              =101,
  D3DFMT_INDEX32              =102,

  D3DFMT_Q16W16V16U16         =110,

  D3DFMT_MULTI2_ARGB8         = MAKEFOURCC('M','E','T','1'),

  // Floating point surface formats

  // s10e5 formats (16-bits per channel)
  D3DFMT_R16F                 = 111,
  D3DFMT_G16R16F              = 112,
  D3DFMT_A16B16G16R16F        = 113,

  // IEEE s23e8 formats (32-bits per channel)
  D3DFMT_R32F                 = 114,
  D3DFMT_G32R32F              = 115,
  D3DFMT_A32B32G32R32F        = 116,

  D3DFMT_CxV8U8               = 117,

/* D3D9Ex only -- */
//#if !defined(D3D_DISABLE_9EX)

  // Monochrome 1 bit per pixel format
  D3DFMT_A1                   = 118,

  // 2.8 biased fixed point
  D3DFMT_A2B10G10R10_XR_BIAS  = 119,


  // Binary format indicating that the data has no inherent type
  D3DFMT_BINARYBUFFER         = 199,
    
//  #endif // !D3D_DISABLE_9EX
  /* -- D3D9Ex only */
  
  
  D3DFMT_FORCE_DWORD          =0x7fffffff
}


/* Types */
export enum D3DRESOURCETYPE {
  D3DRTYPE_SURFACE                =  1,
  D3DRTYPE_VOLUME                 =  2,
  D3DRTYPE_TEXTURE                =  3,
  D3DRTYPE_VOLUMETEXTURE          =  4,
  D3DRTYPE_CUBETEXTURE            =  5,
  D3DRTYPE_VERTEXBUFFER           =  6,
  D3DRTYPE_INDEXBUFFER            =  7,           //if this changes, change _D3DDEVINFO_RESOURCEMANAGER definition


  D3DRTYPE_FORCE_DWORD            = 0x7fffffff
};

export enum D3DXIMAGE_FILEFORMAT
{
    D3DXIFF_BMP         = 0,
    D3DXIFF_JPG         = 1,
    D3DXIFF_TGA         = 2,
    D3DXIFF_PNG         = 3,
    D3DXIFF_DDS         = 4,
    D3DXIFF_PPM         = 5,
    D3DXIFF_DIB         = 6,
    D3DXIFF_HDR         = 7,       //high dynamic range formats
    D3DXIFF_PFM         = 8,       //
    D3DXIFF_FORCE_DWORD = 0x7fffffff

};

export type D3DXIMAGE_INFO = {
    Width: UINT;
    Height: UINT;
    Depth: UINT;
    MipLevels: UINT;
    Format: D3DFORMAT;
    ResourceType: D3DRESOURCETYPE;
    ImageFileFormat: D3DXIMAGE_FILEFORMAT;
};



export type IMGUI_FOR_COMPRESS = {
  tOriginalSize: DWORD,
  tCompressSize: DWORD,
  tCompress: BytePtr
};
export type IMGUI_FOR_UNCOMPRESS = {
  mTextureInfo: D3DXIMAGE_INFO; //offset 0, size = 28
  mLoadFormat: D3DFORMAT; //offset 28, size = 4
  mTextureSize: int; //offset 32, size = 4
  mTexture: IDirect3DTexture9; //offset 36, size = mTextureSize
};

