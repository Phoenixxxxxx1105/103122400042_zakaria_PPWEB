import React from 'react';

function FilterPeserta({ searchQuery, setSearchQuery, filterKelas, setFilterKelas }) {
  return (
    <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
      <input
        type="text"
        placeholder="Cari nama atau NIM..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ flex: 1, minWidth: '200px', padding: '8px', boxSizing: 'border-box' }}
      />
      <select
        value={filterKelas}
        onChange={(e) => setFilterKelas(e.target.value)}
        style={{ width: '150px', padding: '8px', boxSizing: 'border-box' }}
      >
        <option value="Semua kelas">Semua kelas</option>
        <option value="TI-2A">TI-2A</option>
        <option value="TI-2B">TI-2B</option>
      </select>
    </div>
  );
}

export default FilterPeserta;