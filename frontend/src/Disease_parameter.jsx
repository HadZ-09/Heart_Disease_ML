import './app.css';
import { Search } from 'lucide-react';
import { useState } from 'react';

function Disease(props) {
  const [formData, setFormData] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit() {
    setLoading(true);
    
    const payload = {};
    for (const key of props.ml_param) {
      payload[key] = Number(formData[key] || 0);
    }

    try {
      const res = await fetch('http://127.0.0.1:8000/predict_heart_disease', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      setResult({ error: 'Failed to get prediction' });
    } finally {
      setLoading(false);
    }
  }

 
  const getResultStyle = () => {
    if (!result) return {};
    if (result.error) {
      return { backgroundColor: '#41454e', color: 'white' }; 
    }
    
    const isPositive = Number(result.prediction) === 1;
    return {
      backgroundColor: isPositive ? '#c94d4d' : '#38d873', 
    
    };
  };

  return (
    <>
      <div className='trueBottom'>
        <div className='mid'>
          <div className='head'>Heart's Data</div>
          <div className='info'>Input your data here</div>
        </div>

        <div className='bottom'>
          {props.ml_param?.map((n) => (
            <div className='pred' key={n}>
              <input
                type='number'
                id={n}
                name={n}
                placeholder={`    ${n}`}
                onChange={handleChange}
              />
            </div>
          ))}
          <div className='actions-group'>
          <button className='predict' onClick={handleSubmit} disabled={loading}>
            {loading ? 'Processing...' : <Search />}
          </button>

          
          {result && (
            <div className='result' style={getResultStyle()}>
              {result.error ? result.error : `${result.diagonosis}  ${result.probability}%`}
            </div>
          )}
        </div>
      </div>
      </div>
    </>
  );
}

export default Disease;