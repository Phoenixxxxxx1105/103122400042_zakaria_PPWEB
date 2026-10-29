import React from 'react';
import ItemPeserta from './ItemPeserta';

function DaftarPeserta({ pesertaList, totalPeserta, onEdit, onDelete, onToggleHadir }) {
  if (totalPeserta === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '30px', color: '#6c757d', border: '1px dashed #ccc', borderRadius: '8px' }}>
        <h3>Belum ada peserta</h3>
      </div>
    );
  }

  if (pesertaList.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '30px', color: '#6c757d', border: '1px dashed #ccc', borderRadius: '8px' }}>
        <h3>Peserta tidak ditemukan</h3>
      </div>
    );
  }

  return (
    <div>
      {pesertaList.map((peserta) => (
        <ItemPeserta
          key={peserta.id}
          peserta={peserta}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleHadir={onToggleHadir}
        />
      ))}
    </div>
  );
}

export default DaftarPeserta;