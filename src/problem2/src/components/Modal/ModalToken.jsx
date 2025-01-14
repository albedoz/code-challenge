import React from 'react';
import Modal from 'react-bootstrap/Modal';
import ListGroup from 'react-bootstrap/ListGroup';
import { FROM, URL_IMAGE, TO } from '../../utils/constants';

const TokenModal = ({
    show,
    handleClose,
    tokenInfo,
    showType,
    setTokenFrom,
    setTokenTo,
    tokenFrom,
    tokenTo,
}) => {

    return (
        <Modal show={show} onHide={handleClose} centered scrollable>
            <Modal.Header closeButton>
                
            </Modal.Header>
            <Modal.Body>
                <ListGroup onClick={(e) => {
                    const token = JSON.parse(e.target.getAttribute('data-currency'));
                    const fn = showType.current === FROM ? setTokenFrom : setTokenTo;

                    if (showType.current === FROM && token.currency === tokenTo.currency) {
                        setTokenTo(tokenFrom);
                        setTokenFrom(tokenTo);
                    } else if (showType.current === TO && token.currency === tokenFrom.currency) {
                        setTokenFrom(tokenTo);
                        setTokenTo(tokenFrom);
                    } else {
                        fn(token);
                    }
                   
                    handleClose();
                }}>
                    {
                        tokenInfo && tokenInfo.map((token, index) => {
                            const url = `${URL_IMAGE}${token.currency}.svg`;
                            const variant = showType.current === FROM ? tokenFrom.currency === token.currency : tokenTo.currency === token.currency;

                            return (
                                <ListGroup.Item key={index} data-currency={JSON.stringify(token)} action variant={variant ? 'primary' : 'light'}>
                                    <img src={url} /> {token.currency}
                                </ListGroup.Item>
                            )
                        })
                    }
                </ListGroup>
            </Modal.Body>
        </Modal>
    )
}

export default TokenModal;