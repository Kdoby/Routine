import {useState} from "react";
import './App.css';
import RoutineList from "./component/RoutineList";
import MonthlyView from "./component/MonthlyView";
import WeeklyView from "./component/WeeklyView";


function App() {
    const [userId, setUserId] = useState('');
    const [selectedView, setSelectedView] = useState(true);
    return (
        <div style={{display: "flex", margin: "10%", marginTop:"5%"}}>
            <RoutineList userId={userId}/>
            <div style={{display: "flex", flexDirection: "column"}}>
                <div className={"RoutineHeader"}>
                    <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)}></input>
                    <button className={"CurrentDate"} >현재 날짜로 이동</button>
                    <div className={"DateNavigator"} >
                        <h2 className={"DateNavLabel"}>2025-07-07</h2>
                    </div>
                </div>
                <div className={"RoutineNavigator"} >
                    <div className={"ViewButton"} onClick={() => {
                        if (selectedView !== true) {
                            setSelectedView(true);
                        }
                    }}><p className={"ViewMonthly"} style={{color: selectedView ? 'black' : 'lightgray'}}>월간</p></div>
                    <div className={"ViewButton"} onClick={() => {
                        if (selectedView !== false) {
                            setSelectedView(false);
                        }
                    }}><p className={"ViewWeekly"} style={{color: !selectedView ? 'black' : 'lightgray'}}>주간</p></div>
                </div>
                {selectedView && <MonthlyView />}
                {!selectedView && <WeeklyView />}
            </div>

        </div>
    );
}

export default App;
