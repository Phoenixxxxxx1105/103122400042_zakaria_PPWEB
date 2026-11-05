import React from 'react'
import { useState } from 'react';

function Counter() {
    cont [jumlah, setJumlah] = useState(0);

    return (
    <div>
        <p>Jumlah klik: {jumlah}</p>
        <button onClick = {() => setJumlah(jumlah + 1)}>Tambah</button>
    </div>
    );
}

export default Counter
