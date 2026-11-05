const { useState, useEffect } = React;

function App() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [scenario, setScenario] = useState('/api/users?delay=1000');

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [postResult, setPostResult] = useState(null);

    const scenarios = [
        { label: 'Berhasil', url: '/api/users?delay=1000', timeout: 5000 },
        { label: 'Data Kosong', url: '/api/users?mode=empty&delay=1000', timeout: 5000 },
        { label: 'Error HTTP', url: '/api/users?mode=error&delay=1000', timeout: 5000 },
        { label: 'Timeout 700ms', url: '/api/users?delay=2500', timeout: 700 }
    ];

    const fetchUsers = async (abortController) => {
        setLoading(true);
        setError(null);
        
        const currentScenario = scenarios.find(s => s.url === scenario);

        try {
            const response = await axios.get(currentScenario.url, {
                signal: abortController.signal,
                timeout: currentScenario.timeout
            });
            
            if (response.data.length === 0) {
                setUsers([]);
                setError("Data peserta kosong.");
            } else {
                setUsers(response.data);
            }
        } catch (err) {
            if (axios.isCancel(err)) {
                console.log("Request dibatalkan karena perubahan skenario.");
            } else {
                setUsers([]); 
                if (err.code === 'ECONNABORTED') {
                    setError("Request Timeout. Waktu tunggu habis.");
                } else {
                    setError(`Error HTTP: ${err.response?.status || err.message}`);
                }
            }
        } finally {
            if (!abortController.signal.aborted) {
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        const controller = new AbortController();
        fetchUsers(controller);
        
        return () => {
            controller.abort(); 
        };
    }, [scenario]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setPostResult(null);

        if (name.trim() === '') {
            setPostResult({ type: 'error', msg: 'Nama tidak boleh kosong atau hanya spasi.' });
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setPostResult({ type: 'error', msg: 'Format email tidak valid.' });
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await axios.post('/api/users', { name: name.trim(), email });
            setPostResult({
                type: 'success',
                msg: `Simulasi berhasil, data tidak disimpan. (Status: ${response.status})`,
                data: response.data
            });
            setName('');
            setEmail('');
        } catch (err) {
            setPostResult({ type: 'error', msg: `Gagal mengirim data: ${err.message}` });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="dashboard">
            <div className="card">
                <h2>Daftar Peserta (GET)</h2>
                
                <div className="form-group">
                    <label>Pilih Skenario API:</label>
                    <select value={scenario} onChange={(e) => setScenario(e.target.value)} disabled={loading}>
                        {scenarios.map((s, idx) => (
                            <option key={idx} value={s.url}>{s.label}</option>
                        ))}
                    </select>
                </div>
                
                <div className="form-group">
                    <button onClick={() => {
                        const controller = new AbortController();
                        fetchUsers(controller);
                    }} disabled={loading}>
                        Muat Ulang
                    </button>
                </div>

                {loading && <div className="loader">Memuat data...</div>}
                
                {!loading && error && <div className="status error">{error}</div>}
                
                {!loading && !error && users.length > 0 && (
                    <div>
                        {users.map(user => (
                            <div key={user.id} className="user-item">
                                <strong>{user.name}</strong><br/>
                                <small>{user.email}</small>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="card">
                <h2>Registrasi Baru (POST)</h2>
                
                {postResult && (
                    <div className={`status ${postResult.type}`}>
                        {postResult.msg}
                        {postResult.data && (
                            <div style={{marginTop: '10px', fontSize: '0.85rem'}}>
                                ID: {postResult.data.id} <br/>
                                Name: {postResult.data.name} <br/>
                                Email: {postResult.data.email} <br/>
                                Simulated: {postResult.data.simulated ? 'true' : 'false'}
                            </div>
                        )}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Nama Lengkap</label>
                        <input 
                            type="text" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)}
                            disabled={isSubmitting}
                        />
                    </div>
                    <div className="form-group">
                        <label>Alamat Email</label>
                        <input 
                            type="text" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={isSubmitting}
                        />
                    </div>
                    <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Mengirim...' : 'Kirim Pendaftaran'}
                    </button>
                </form>
            </div>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);