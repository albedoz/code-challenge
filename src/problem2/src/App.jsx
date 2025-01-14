import React, { useEffect, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { fetchTokenInfo } from './utils/fetchToken';
import BottomArrow from './components/icons/BottomArrow';
import ArrowIcon from './components/icons/ArrowIcon';
import TokenModal from './components/Modal/ModalToken';
import { swapToken } from './utils/swap';
import { FROM, TO, URL_IMAGE, REGEX_CHECK_NUM } from './utils/constants';
import ErrorAlert from './components/Alert/Error';
import LoadingPage from './components/Loading/LoadingPage';

const regexNumber = new RegExp(REGEX_CHECK_NUM);
let timeStampFetch = 0;

let timeStampSwap = 0;

function App() {

    const [tokenInfo, setTokenInfo] = useState([]);
    const [tokenFrom, setTokenFrom] = useState({});
    const [tokenTo, setTokenTo] = useState({});
    const [amountTokenFrom, setAmountTokenFrom] = useState('0');

    const [show, setShow] = useState(false);
    const showType = useRef(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const handleFetchToken = async () => {
        try {
            timeStampFetch = Date.now();
            setLoading(true)
            const result = await fetchTokenInfo();
            const sortedResult = result.sort((a, b) => {
                if (a.currency === b.currency) {
                    return new Date(b.date) - new Date(a.date);
                }
                return a.currency.localeCompare(b.currency);
            });
            const uniqueResult = new Map();
            for (const item of sortedResult) {
                if (!uniqueResult.has(item.currency)) {
                    uniqueResult.set(item.currency, item);
                }
            }
            const finalResult = Array.from(uniqueResult.values());
            setTokenInfo(finalResult);
            setTokenFrom(finalResult[0]);
            setTokenTo(finalResult[1]);
            setLoading(false)
            setError(null)
        } catch (error) {
            setLoading(false);
            setError('Error fetching token info ! Please try again')
        }
    }

    const handleClose = () => {
        showType.current = null;
        setShow(false);
    };

    const handleQuickSwap = () => {
        const tempToken = tokenFrom;
        setTokenFrom(tokenTo);
        setTokenTo(tempToken);
    }

    const handleFromChange = (e) => {
        if (e.target.value === '') {
            setAmountTokenFrom('0')
        }

        if (regexNumber.test(e.target.value)) {
            setAmountTokenFrom(e.target.value.replace(/^0+(?!\.)/, ''))
        }
    }

    const handleSwap = async () => {
        try {
            setLoading(true)
            await new Promise((resolve, reject) => {
                let id = setTimeout(() => {
                    resolve();
                    clearTimeout(id);
                }, 3000)
            });
            setLoading(false);
            timeStampSwap = Date.now();
        } catch (error) {
            setLoading(false)
            setError('Error swap token ! Please try again');
        }
    }

    useEffect(() => {
        handleFetchToken();
    }, []);

    const amountTokenTo = Boolean(tokenFrom?.price && amountTokenFrom) ? swapToken(tokenFrom, tokenTo, amountTokenFrom) : '0';

    return (
        <div>
            <div className="swap-container">
                <div className="swap-header">Swap Tokens</div>
                {error && <ErrorAlert
                    variant='danger'
                    message={error}
                    key={timeStampFetch}
                    onClose={() => setError(null)}
                />}
                {
                    !!timeStampSwap && <ErrorAlert
                        variant='success'
                        message='Swap token successfully'
                        key={timeStampSwap}
                    />
                }
                <form className="swap-form" id="swapForm">
                    <div className="tokenContainer">
                        <Form.Group
                            controlId="formBasicEmail"
                            className='tokenInputContainer'
                        >
                            <Form.Control
                                type="text"
                                placeholder="0"
                                size='sm'
                                value={amountTokenFrom}
                                onChange={handleFromChange}
                                disabled={loading || !tokenInfo.length}
                            />
                        </Form.Group>
                        <Button
                            variant='dark'
                            className='tokenSelect'
                            size="sm"
                            onClick={() => {
                                showType.current = FROM;
                                setShow(true)
                            }}
                            disabled={loading || !tokenInfo.length}
                        >
                            <img className='tokenImage' src={`${URL_IMAGE}${tokenFrom.currency}.svg`} />
                            <span className="tokenText">{tokenFrom?.currency || ''}</span>
                            <BottomArrow />
                        </Button>
                    </div>
                    <div className="arrowContainer">
                        <Button
                            className='arrowButton'
                            variant='light'
                            size="sm"
                            onClick={handleQuickSwap}
                            disabled={loading || !tokenInfo.length}
                        >
                            <ArrowIcon />
                        </Button>
                    </div>
                    <div className="tokenContainer">
                        <Form.Group
                            controlId="formBasicEmail"
                            className='tokenInputContainer'
                        >
                            <Form.Control
                                type="text"
                                placeholder="0"
                                size='sm'
                                value={amountTokenTo}
                                disabled
                            />
                        </Form.Group>
                        <Button
                            variant='dark'
                            className='tokenSelect'
                            size="sm"
                            onClick={() => {
                                showType.current = TO;
                                setShow(true)
                            }}
                            disabled={loading || !tokenInfo.length}
                        >
                            <img className='tokenImage' src={`${URL_IMAGE}${tokenTo.currency}.svg`} />
                            <span className="tokenText">{tokenTo?.currency || ''} </span>
                            <BottomArrow />
                        </Button>
                    </div>
                    <button
                        type="button"
                        className="swap-button"
                        disabled={
                            loading
                            || amountTokenFrom === '0'
                            || amountTokenFrom === ''
                            || amountTokenTo === '0'
                            || amountTokenTo === ''
                        }
                        onClick={handleSwap}
                    >
                        Swap
                    </button>
                    {show &&
                        <TokenModal
                            show={show}
                            handleClose={handleClose}
                            tokenInfo={tokenInfo}
                            showType={showType}
                            setTokenFrom={setTokenFrom}
                            setTokenTo={setTokenTo}
                            tokenFrom={tokenFrom}
                            tokenTo={tokenTo}
                        />
                    }
                    {loading && <LoadingPage />}
                </form>
            </div>
        </div>
    );
}

export default App;