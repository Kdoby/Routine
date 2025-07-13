import {useState} from "react";
import './RoutineList.css';

export default function Routine() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div className={"L_listItem"}>
            <div className={"L_flag"} />
            <div className={"L_title"}>brush teeth on the morning</div>
            <div className={"L_menu"} onClick={toggleDropdown}>
                <img style={{height: "15px"}} src={"./menu.png"} alt={"menu"}/>
                {isDropdownOpen && (
                    <div className={"L_dropdown"}>
                        <div className={"L_dropdownItem"}>수정</div>
                        <div className={"L_dropdownItem"}>종료</div>
                        <div className={"L_dropdownItem"}>삭제</div>
                    </div>
                )}
            </div>
        </div>
    );
}