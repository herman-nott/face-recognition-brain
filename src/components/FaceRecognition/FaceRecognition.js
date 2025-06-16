import { useState, useEffect  } from 'react';

function FaceRecognition({ imageUrl }) {
    const [error, setError] = useState(false);

    useEffect(() => {
        if (imageUrl) {
        setError(false);
        }
    }, [imageUrl]);

    const handleError = () => {
        setError(true);
    };
    
    return (
        <div className="center ma">
            <div className="absolute mt2 pb1">
                {imageUrl && !error && (
                    <img
                        src={imageUrl}
                        alt="Detected"
                        width="500px"
                        height="auto"
                        onError={handleError}
                    />
                )}
                {error && (
                    <p style={{ color: 'red', fontWeight: 'bold' }}>
                        &#10006; Error loading image. Make sure the link is correct.
                    </p>
                )}
            </div>
        </div>
    );
}

export default FaceRecognition;