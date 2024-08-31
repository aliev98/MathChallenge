
function OverScreen({ cause, level, restart}) {
    function Restart() {
        restart();
    }

    return (
        <div>
            {cause == "Time" ?
             <div>
                    <h3>Time ran out, you reached level { level}</h3>
            </div>
             :
                <div>
                    <h3>Wrong answer, you reached level { level}</h3>
                </div>
            }
            <div>
                <button onClick={Restart} style={{backgroundColor:'forestgreen'} }>Play again</button>
            </div>
        </div>
  );
}

export default OverScreen;