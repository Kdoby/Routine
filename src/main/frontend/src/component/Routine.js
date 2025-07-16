import {useState} from "react";
import './RoutineList.css';
import axios from "axios";

export default function Routine({name, id, onDelete}) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };
    // 루틴 삭제
    const del = async (e) => {
        e.stopPropagation();
        if(!window.confirm(`{name}을 삭제하시겠습니까?`)) return;
        try {
            onDelete(id);
            const response = await axios.delete(`/api/routine/${id}`);
            if(response.data.success) {
                console.log(response.data.message);
            }
            else {
                console.error('삭제 실패: ', response.data.message);
            }
        } catch (err) {
            console.error('에러 발생: ', err);
        }
    }

    return (
        <div className={"L_listItem"}>
            <div className={"L_flag"} />
            <div className={"L_title"}>{name}</div>
            <div className={"L_menu"} onClick={toggleDropdown}>
                <img style={{height: "15px"}} src={"./menu.png"} alt={"menu"}/>
                {isDropdownOpen && (
                    <div className={"L_dropdown"}>
                        <div className={"L_dropdownItem"}>수정</div>
                        <div className={"L_dropdownItem"}>종료</div>
                        <div className={"L_dropdownItem"} onClick={del}>삭제</div>
                    </div>
                )}
            </div>
        </div>
    );
}