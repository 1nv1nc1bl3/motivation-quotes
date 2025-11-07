import { useState, useEffect } from 'react';
import './css/App.css';
import Spinner from './components/Spinner';

function App() {
    const [theQuote, setTheQuote] = useState({ quote: '', author: '' });
    const [loading, setLoading] = useState(false);

    const controller = new AbortController();
    const fetchedQuotes = async () => {
        try {
            setLoading(true);
            const res = await fetch(
                'https://quoteslate.vercel.app/api/quotes/random?tags=motivation,wisdom',
                { signal: controller.signal }
            );
            const data = await res.json();
            // console.log(data);
            const newQuote = { quote: data.quote, author: data.author };
            setTheQuote(newQuote);
        } catch (error) {
            console.log('Error fetching quote', error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchedQuotes();
        return () => controller.abort();
    }, []);

    return (
        <div className='container'>
            <div className='calendar-app'>
                <div className='calendar'>
                    <h1 className='heading'>Motivation Quotes</h1>

                    {loading ? (
                        <Spinner />
                    ) : (
                        <p className='quote-field'>
                            <span className='quote-body'>{theQuote.quote}</span>
                            <span className='quote-author'>
                                {theQuote.author}
                            </span>
                        </p>
                    )}

                    <button onClick={fetchedQuotes} className='quote-btn'>
                        show me the next quote
                    </button>
                </div>
            </div>
        </div>
    );
}

export default App;
