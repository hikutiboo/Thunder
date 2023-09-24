import React, { useEffect, useState } from 'react';
import "./agree-modal.sass";

function AgreeModal({ component, className }) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(true);

        return () => setVisible(false);
    }, [])

    return (
        <div className={(className ? className : '') + " agree-modal-container screen-blocker " + (visible ? "visible" : '')}>
            <div className="agree-modal">
                {component}
            </div>
        </div>
    )
}

export default AgreeModal;