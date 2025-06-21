function Rank({ username, entries }) {
    return (
        <div>
            <div className="white f3">
                <span style={{ color: "#FFF700"}}>@{`${username}`}</span>, your current entry count is...
            </div>
            <div className="white f1" style={{ color: "#FFF700"}}>
                {`${entries}`}
            </div>
        </div>
    );
}

export default Rank;