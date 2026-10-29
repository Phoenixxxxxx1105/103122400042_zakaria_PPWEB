import React from 'react';

function FormPeserta({ formData, setFormData, handleSubmit, handleCancel, isEditing, errorMessage }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div style={{ padding: '16px', border: '1px solid #ddd', borderRadius: '8px', marginBottom: '20px', backgroundColor: '#ffffff' }}>
      <h3 style={{ marginTop: 0 }}>{isEditing ? 'Ubah Peserta' : 'Tambah Peserta'}</h3>

      {errorMessage && (
        <div style={{ padding: '10px', backgroundColor: '#f8d7da', color: '#721c24', borderRadius: '4px', marginBottom: '15px', border: '1px solid #f5c6cb' }}>
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Nama Mahasiswa:</label>
          <input
            type="text"
            name="nama"
            value={formData.nama}
            onChange={handleChange}
            placeholder="Masukkan nama"
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>NIM (8 Digit):</label>
          <input
            type="text"
            name="nim"
            value={formData.nim}
            onChange={handleChange}
            placeholder="Contoh: 10121001"
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Kelas:</label>
          <select
            name="kelas"
            value={formData.kelas}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          >
            <option value="Pilih kelas">Pilih kelas</option>
            <option value="TI-2A">TI-2A</option>
            <option value="TI-2B">TI-2B</option>
          </select>
        </div>

        <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
          <button
            type="submit"
            style={{ padding: '8px 16px', backgroundColor: isEditing ? '#ffc107' : '#0d6efd', color: isEditing ? '#000' : '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            {isEditing ? 'Simpan perubahan' : 'Tambah peserta'}
          </button>

          {isEditing && (
            <button
              type="button"
              onClick={handleCancel}
              style={{ padding: '8px 16px', backgroundColor: '#6c757d', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              Batal
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default FormPeserta;