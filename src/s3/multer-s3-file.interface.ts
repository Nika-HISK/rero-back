export interface MulterS3File {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    buffer: Buffer;
    size: number;
    location: string; 
    key: string;
  }
  