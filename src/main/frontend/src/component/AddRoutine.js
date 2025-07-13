import {useState} from "react";
import axios from 'axios';
import "./RoutineList.css";

export default function AddRoutine({userId, isOpen, closeModal}) {
     const [routineName, setRoutineName] = useState('');
     const [startDate, setStartDate] = useState('');
     const [endDate, setEndDate] = useState('');
     const [selectedDays, setSelectedDays] = useState([]);
     const days = [
         { label: '월', value: '2'},
         { label: '화', value: '3'},
         { label: '수', value: '4'},
         { label: '목', value: '5'},
         { label: '금', value: '6'},
         { label: '토', value: '7'},
         { label: '일', value: '1'}
     ];

     const handleCheckboxChange = (day) => {
         if(selectedDays.includes(day)) { // 선택 해제
             setSelectedDays(selectedDays.filter(d => d !== day));
         } else { // 선택 추가
             setSelectedDays([...selectedDays, day]);
         }
     };

     const handleSubmit = async (e) => {
         e.preventDefault();

         try {
             const res = await axios.post('/api/routine', {
                 userId: userId,
                 name: routineName,
                 repeatDays: selectedDays,
                 startDate: startDate,
                 endDate: endDate
             });
             if(res.data.success) {
                 alert(res.data.message);
                 closeModal();
                 setRoutineName('');
                 setStartDate('');
                 setEndDate('');
                 setSelectedDays([]);
             }
             else {
                 console.log("루틴 등록 실패");
             }
         } catch (err) {
             console.error('에러 발생: ', err);
         }
     };

     return (
         <div style={{display:isOpen?"block": "none",
             position: "fixed",
             top: 0,
             left: 0,
             width: "100vw",
             height: "100vh",
             backgroundColor: "rgba(0,0,0,0.35)"}}>
             <div style={{
                 position: "absolute",
                 top: "50%",
                 left: "50%",
                 transform: "translate(-50%, -50%)",
                 width: "677px",
                 height: "498px",
                 backgroundColor: "white",
                 borderRadius: "20px",
                 border: "solid 1px"
             }}>
                 <div style={{padding: "30px"}}>
                     <img style={{ border: "none",
                         cursor: "pointer",
                         width:"40px",
                         marginLeft: "580px"
                     }} src={"./close.png"} alt={"closeModal"} onClick={closeModal}></img>

                     <form className={"AR_form"}>
                         <div>
                             <input type="text" className={"AR_routineName"} placeholder={"루틴 이름"} value={routineName} onChange={(e) => setRoutineName(e.target.value)}></input>
                         </div>
                         <div>
                             <label htmlFor="start-date" className={"AR_inputLabel"}>시작일 &nbsp;&nbsp;| &nbsp;&nbsp;</label>
                             <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} id="start-date" name="start-date" required/>

                         </div>

                         <div>
                             <label htmlFor="end-date" className={"AR_inputLabel"}>종료일 &nbsp;&nbsp;| &nbsp;&nbsp;</label>
                             <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} id="end-date" name="end-date" required/>
                         </div>
                         <div>
                             <span className={"AR_inputLabel"}>반복 &nbsp;&nbsp;| &nbsp;&nbsp;</span>
                             {days.map(({label, value}) => (
                                 <label key={value}>
                                     <input type="checkbox" checked={selectedDays.includes(value)} onChange={() => handleCheckboxChange(value)} />
                                     {label}
                                 </label>
                             ))}
                         </div>
                         <button className={"AR_submit"} onClick={handleSubmit}>추가</button>
                     </form>

                 </div>

             </div>
         </div>
    );
}