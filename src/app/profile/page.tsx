'use server';

import React from 'react';

import FileUpload from '@/app/FileUpload/Upload';

export default async function ProfilePage() {
  return (
    <main>
      <section className='bg-white'>
        <FileUpload />
      </section>
    </main>
  );
}
