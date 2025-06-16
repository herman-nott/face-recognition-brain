import './ImageLinkForm.css';

function ImageLinkForm({ onInputChange, onButtonSubmit }) {
    return (
        <div>
            <p className="f3">
                {'This Magic Brain will detect faces in your pictures. Give it a try.'}
            </p>

            <div className="center">
                <div className="pa4 br3 shadow-5 center form">
                    <input className="f4 pa2 w-70 center border-none outline-none" type="text" onChange={onInputChange} />
                    <button className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple border-none button" onClick={onButtonSubmit}>Detect</button>
                </div>
            </div>
        </div>
    );
}

export default ImageLinkForm;