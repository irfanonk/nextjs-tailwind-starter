// FileUpload/actions.ts
'use server';

interface FileData {
  id: string;
  name: string;
  size: number;
  uploadedAt: Date;
}

// Mock database
let fileStorage: FileData[] = [];

export async function getFiles() {
  console.log('getFiles action called');

  return fileStorage;
}

export async function uploadFile(formData: FormData) {
  console.log('uploadFile action called');

  const file = formData.get('file') as File;

  if (!file) {
    throw new Error('No file provided');
  }

  const fileData: FileData = {
    id: Math.random().toString(36).substring(7),
    name: file.name,
    size: file.size,
    uploadedAt: new Date(),
  };

  fileStorage.push(fileData);
  return fileData;
}

export async function deleteFile(id: string) {
  console.log('deleteFile action called id:', id);

  fileStorage = fileStorage.filter((file) => file.id !== id);
  return { success: true };
}

// // FileUpload/actions.ts
// 'use server';

// interface FileData {
//   id: string;
//   name: string;
//   size: number;
//   uploadedAt: Date;
// }

// // Mock database
// let fileStorage: FileData[] = [];

// export async function getFiles() {
//   console.log('getFiles action called');

//   return fileStorage;
// }

// export async function uploadFile(formData: FormData) {
//   console.log('uploadFile action called');

//   const file = formData.get('file') as File;

//   if (!file) {
//     throw new Error('No file provided');
//   }

//   const fileData: FileData = {
//     id: Math.random().toString(36).substring(7),
//     name: file.name,
//     size: file.size,
//     uploadedAt: new Date(),
//   };

//   fileStorage.push(fileData);

// }

// export async function deleteFile(formData: FormData) {
//   const id = formData.get('id') as string;
//   console.log('deleteFile action called id:', id);

//   fileStorage = fileStorage.filter((file) => file.id !== id);

// }
