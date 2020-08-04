import React from 'react';

import './preview.styles.scss';

const Preview = () => {
    return (
            <div className="web">
                <object type="text/html" data="http://localhost:3000/" className="webpre" aria-labelledby="Error"></object>
            </div>
    );
}

export default Preview;