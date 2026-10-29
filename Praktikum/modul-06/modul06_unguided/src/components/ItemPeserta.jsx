import React from 'react';

function ItemPeserta({ peserta, onEdit, onDelete, onToggleHadir }) {
  return (
    <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '12px', marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', flexWrap: 'wrap', gap: '10px' }}>
      <div>
        <h4 style={{ margin: '0 0 4px 0' }}>{peserta.nama}</h4>
        <p style={{ margin: '0 0 4px 0', color: '#555', fontSize: '14px' }}>
          NIM: <strong>{peserta.nim}</strong> | Kelas: <strong>{peserta.kelas}</strong>
        </p>
        <span style={{ display: 'inline-block', padding: '3px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold', backgroundColor: peserta.hadir ? '#d4edda' : '#f8d7da', color: peserta.hadir ? '#155724' : '#721c24' }}>
          {peserta.hadir ? 'Hadir' : 'Belum hadir'}
        </span>
      </div>

      <div style={{ display: 'flex', gap: '8px' }}>
        <button
          onClick={() => onToggleHadir(peserta.id)}
          style={{ padding: '6px 12px', backgroundColor: peserta.hadir ? '#ffc107' : '#198754', color: peserta.hadir ? '#000' : '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '13px' }}
        >
          {peserta.hadir ? 'Batalkan hadir' : 'Tandai hadir'}
        </button>
        <button
          onClick={() => onEdit(peserta)}
          style={{ padding: '6px 12px', backgroundColor: '#0dcaf0', color: '#000', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '13px' }}
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(peserta.id)}
          style={{ padding: '6px 12px', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '13px' }}
        >
          Hapus
        </button>
      </div>
    </div>
  );
}

export default ItemPeserta;