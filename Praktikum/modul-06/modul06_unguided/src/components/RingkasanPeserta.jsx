import React from 'react';

function RingkasanPeserta({ total, hadir, belumHadir, terlihat }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '10px', marginBottom: '20px' }}>
      <div style={{ padding: '12px', border: '1px solid #ccc', borderRadius: '8px', textAlign: 'center', backgroundColor: '#f8f9fa' }}>
        <small style={{ color: '#6c757d' }}>Total Peserta</small>
        <h2 style={{ margin: '5px 0 0 0' }}>{total}</h2>
      </div>
      <div style={{ padding: '12px', border: '1px solid #28a745', borderRadius: '8px', textAlign: 'center', backgroundColor: '#e8f5e9' }}>
        <small style={{ color: '#28a745' }}>Hadir</small>
        <h2 style={{ margin: '5px 0 0 0', color: '#28a745' }}>{hadir}</h2>
      </div>
      <div style={{ padding: '12px', border: '1px solid #dc3545', borderRadius: '8px', textAlign: 'center', backgroundColor: '#ffebee' }}>
        <small style={{ color: '#dc3545' }}>Belum Hadir</small>
        <h2 style={{ margin: '5px 0 0 0', color: '#dc3545' }}>{belumHadir}</h2>
      </div>
      <div style={{ padding: '12px', border: '1px solid #17a2b8', borderRadius: '8px', textAlign: 'center', backgroundColor: '#e0f7fa' }}>
        <small style={{ color: '#17a2b8' }}>Hasil Ditampilkan</small>
        <h2 style={{ margin: '5px 0 0 0', color: '#17a2b8' }}>{terlihat}</h2>
      </div>
    </div>
  );
}

export default RingkasanPeserta;