import axios from "axios";
import {useEffect, useState} from "react";

export default function DailyRoutine({userId, date, fetchMonthly}){
    const [dailyList, setDailyList] = useState({dailyStatistic: 0, routines: []}); // { double dailyStatistic, List<RoutineResponse> routines }
    // Daily - 리스트, 통계 받아오기
    const fetchDailyStats = async () => {
        try{
            const res = await axios.get(`/api/routine/daily/${userId}/${date.toISOString().slice(0,10)}`);
            setDailyList(res.data);
            console.log("일간 통계 받아오기: ", res.data);
        } catch (e){
            console.error("fail fetch: ", e);
        }
    }
    useEffect(()=>{
        if(!userId || !date) {
            return;
        }
        fetchDailyStats();
    }, [userId, date]);

    const handleCheckboxClick = async (e, id, isCompleted) => {
        e.preventDefault();

        try {
            const res = await axios.post(`/api/routine/log`, {
                routineId: id,
                date: date.toISOString().slice(0,10),
                isCompleted: isCompleted
            });
            if (res.data.success){
                alert(res.data.message);
                setDailyList((prev => ({
                    ...prev,
                    routines: prev.routines.map(routine =>
                        routine.id === id ? {...routine, isCompleted: isCompleted} : routine
                    )
                })));
                fetchMonthly();
            }
        } catch (err) {
            console.error('에러 발생: ', err);
        }
    }
    return(
        <div className={"DR_wrapper"}>
            <div className={"DR_header"}>
                <h2>Routine</h2>
                <p>{dailyList.dailyStatistic}%</p>
                <div className={"DR_achieve"}></div>
            </div>
            <div className={"DR_List"}>
                {dailyList.routines.map((routine) => (
                    <div key={routine.id} onClick={(e) => handleCheckboxClick(e, routine.id, !routine.isCompleted)}>
                        <input type="checkbox" checked={routine.isCompleted}/>
                        <p>{routine.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}