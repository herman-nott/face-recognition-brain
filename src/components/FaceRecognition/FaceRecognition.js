import { useState, useEffect  } from 'react';
import './FaceRecognition.css';

function FaceRecognition({ imageUrl, boxes }) {
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
                    <div>
                        <img
                            src={imageUrl}
                            alt="Detected"
                            width="500px"
                            height="auto"
                            onError={handleError}
                            id = "inputImage"
                        />
                        {/* <div className="bounding-box" style={{ top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol }}></div> */}
                        {Array.isArray(boxes) && boxes.map((box, i) => {
                            return (
                                <div
                                    key={i}
                                    className="bounding-box"
                                    style={{
                                        top: box.topRow,
                                        left: box.leftCol,
                                        right: box.rightCol,
                                        bottom: box.bottomRow
                                    }}
                                ></div>
                            );
                        })}
                    </div>
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