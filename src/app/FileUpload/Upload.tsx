// Upload.tsx
'use client';

import { Trash2, Upload } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import { deleteFile, getFiles, uploadFile } from './actions';

interface FileData {
  id: string;
  name: string;
  size: number;
  uploadedAt: Date;
}

export default function FileUpload() {
  const [files, setFiles] = useState<FileData[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    getFiles().then(setFiles);
  }, []);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setIsUploading(true);
    try {
      for (const file of acceptedFiles) {
        const formData = new FormData();
        formData.append('file', file);
        const newFile = await uploadFile(formData);
        setFiles((prev) => [...prev, newFile]);
      }
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setIsUploading(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleDelete = async (id: string) => {
    await deleteFile(id);
    setFiles((prev) => prev.filter((file) => file.id !== id));
  };

  return (
    <div className='max-w-4xl mx-auto p-6'>
      <h1 className='text-2xl font-bold mb-6'>File Upload</h1>

      {/* Upload Zone */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 mb-6 text-center cursor-pointer transition-colors
          ${
            isDragActive
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 hover:border-gray-400'
          }`}
      >
        <input {...getInputProps()} />
        <Upload className='mx-auto h-12 w-12 text-gray-400 mb-4' />
        <p className='text-gray-600'>
          {isDragActive
            ? 'Drop the files here...'
            : 'Drag & drop files here, or click to select files'}
        </p>
        {isUploading && <p className='text-blue-500 mt-2'>Uploading...</p>}
      </div>

      {/* File List */}
      <div className='space-y-4'>
        {files.map((file) => (
          <div
            key={file.id}
            className='flex items-center justify-between p-4 bg-white rounded-lg shadow'
          >
            <div>
              <h3 className='font-medium'>{file.name}</h3>
              <p className='text-sm text-gray-500'>
                {(file.size / 1024).toFixed(2)} KB ·{' '}
                {new Date(file.uploadedAt).toLocaleString()}
              </p>
            </div>
            <button
              onClick={() => handleDelete(file.id)}
              className='p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors'
            >
              <Trash2 className='h-5 w-5' />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// 'use server';
// // app/upload/page.tsx
// import { Trash2, Upload } from 'lucide-react';

// import { deleteFile, getFiles, uploadFile } from './actions';

// // Note: This is now a Server Component
// export default async function FileUpload() {
//   const files = await getFiles();

//   return (
//     <div className='max-w-4xl mx-auto p-6'>
//       <h1 className='text-2xl font-bold mb-6'>
//         File Upload (No JavaScript Required)
//       </h1>

//       {/* Basic Form Upload */}
//       <form action={uploadFile} className='mb-8'>
//         <div className='border-2 border-dashed border-gray-300 rounded-lg p-8 text-center'>
//           <Upload className='mx-auto h-12 w-12 text-gray-400 mb-4' />
//           <input
//             type='file'
//             name='file'
//             className='w-full max-w-xs mx-auto block mb-4'
//             required
//           />
//           <button
//             type='submit'
//             className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
//           >
//             Upload File
//           </button>
//         </div>
//       </form>

//       {/* File List */}
//       <div className='space-y-4'>
//         {files.map((file) => (
//           <div
//             key={file.id}
//             className='flex items-center justify-between p-4 bg-white rounded-lg shadow'
//           >
//             <div>
//               <h3 className='font-medium'>{file.name}</h3>
//               <p className='text-sm text-gray-500'>
//                 {(file.size / 1024).toFixed(2)} KB ·{' '}
//                 {new Date(file.uploadedAt).toLocaleString()}
//               </p>
//             </div>
//             <form action={deleteFile}>
//               <input type='hidden' name='id' value={file.id} />
//               <button
//                 type='submit'
//                 className='p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors'
//               >
//                 <Trash2 className='h-5 w-5' />
//               </button>
//             </form>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
