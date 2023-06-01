'use client';

import Cover from '@/components/Cover';
import { useState } from 'react';
import AddCover from './AddCover';
import Nav from '@/components/Nav';

export default function WrapCover({ note }: any) {
  const [bgCover, setBgCover] = useState(note.backgroundCover);

  return (
    <div>
      <Nav title={note.title} backgroundCover={bgCover} />
      {bgCover && (
        <Cover bgCover={bgCover} onBgCover={setBgCover} note={note} />
      )}
      {bgCover !== '' ? '' : <AddCover onBgCover={setBgCover} note={note} />}
    </div>
  );
}
