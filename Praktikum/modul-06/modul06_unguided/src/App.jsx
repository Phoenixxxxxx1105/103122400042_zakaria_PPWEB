import React, { useState } from 'react';
import RingkasanPeserta from './components/RingkasanPeserta';
import FormPeserta from './components/FormPeserta';
import FilterPeserta from './components/FilterPeserta';
import DaftarPeserta from './components/DaftarPeserta';

const initialPeserta = [
  { id: 'm-1', nama: 'Ani', nim: '10121001', kelas: 'TI-2A', hadir: true },
  { id: 'm-2', nama: 'Budi', nim: '10121002', kelas: 'TI-2B', hadir: false },
  { id: 'm-3', nama: 'Citra', nim: '10121003', kelas: 'TI-2A', hadir: false },
];

function App() {
  const [peserta, setPeserta] = useState(initialPeserta);
  
  const [formData, setFormData] = useState({ nama: '', nim: '', kelas: 'Pilih kelas' });
  const [editingId, setEditingId] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const [searchQuery, setSearchQuery] = useState('');
  const [filterKelas, setFilterKelas] = useState('Semua kelas');

  const resetForm = () => {
    setFormData({ nama: '', nim: '', kelas: 'Pilih kelas' });
    setEditingId(null);
    setErrorMessage('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const cleanNama = formData.nama.trim();
    const cleanNim = formData.nim.trim();
    const cleanKelas = formData.kelas;

    if (!cleanNama || cleanNama.length < 3) {
      setErrorMessage('Nama wajib diisi dan memiliki sedikitnya 3 karakter.');
      return;
    }

    const isEightDigits = /^\d{8}$/.test(cleanNim);
    if (!isEightDigits) {
      setErrorMessage('NIM wajib diisi dan terdiri atas tepat 8 digit angka.');
      return;
    }

    if (cleanKelas === 'Pilih kelas') {
      setErrorMessage('Silakan pilih kelas yang valid.');
      return;
    }

    const isNimExist = peserta.some(
      (p) => p.nim === cleanNim && p.id !== editingId
    );
    if (isNimExist) {
      setErrorMessage(`NIM ${cleanNim} sudah digunakan oleh peserta lain.`);
      return;
    }

    if (editingId) {
      setPeserta((prev) =>
        prev.map((p) =>
          p.id === editingId
            ? { ...p, nama: cleanNama, nim: cleanNim, kelas: cleanKelas }
            : p
        )
      );
    } else {
      const newPeserta = {
        id: `m-${Date.now()}`,
        nama: cleanNama,
        nim: cleanNim,
        kelas: cleanKelas,
        hadir: false,
      };
      setPeserta((prev) => [...prev, newPeserta]);
    }

    resetForm();
  };

  const handleEdit = (p) => {
    setEditingId(p.id);
    setFormData({ nama: p.nama, nim: p.nim, kelas: p.kelas });
    setErrorMessage('');
  };

  const handleCancel = () => {
    resetForm();
  };

  const handleDelete = (id) => {
    if (editingId === id) {
      resetForm();
    }
    setPeserta((prev) => prev.filter((p) => p.id !== id));
  };

  const handleToggleHadir = (id) => {
    setPeserta((prev) =>
      prev.map((p) => (p.id === id ? { ...p, hadir: !p.hadir } : p))
    );
  };

  const filteredPeserta = peserta.filter((p) => {
    const q = searchQuery.trim().toLowerCase();
    const matchesQuery =
      q === '' ||
      p.nama.toLowerCase().includes(q) ||
      p.nim.toLowerCase().includes(q);

    const matchesKelas =
      filterKelas === 'Semua kelas' || p.kelas === filterKelas;

    return matchesQuery && matchesKelas;
  });

  const total = peserta.length;
  const hadir = peserta.filter((p) => p.hadir).length;
  const belumHadir = total - hadir;
  const terlihat = filteredPeserta.length;

  return (
    <div style={{ maxWidth: '700px', margin: '20px auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Aplikasi Manajemen Peserta Praktikum</h1>

      <RingkasanPeserta
        total={total}
        hadir={hadir}
        belumHadir={belumHadir}
        terlihat={terlihat}
      />

      <FormPeserta
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
        isEditing={Boolean(editingId)}
        errorMessage={errorMessage}
      />

      <FilterPeserta
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filterKelas={filterKelas}
        setFilterKelas={setFilterKelas}
      />

      <DaftarPeserta
        pesertaList={filteredPeserta}
        totalPeserta={total}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onToggleHadir={handleToggleHadir}
      />
    </div>
  );
}

export default App;