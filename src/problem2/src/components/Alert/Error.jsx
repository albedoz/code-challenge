import React , { useState , useEffect} from 'react';
import Alert from 'react-bootstrap/Alert';

function ErrorAlert({
    variant,
    message,
    onClose
}) {

    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
            if (onClose) onClose();
        }, 4000);
        return () => clearTimeout(timer);
    }, [onClose]);

    if (!visible) return null;

    return (
        <>
            <Alert key={variant} variant={variant}>
                {message}
            </Alert>
        </>
    );
}

export default ErrorAlert;