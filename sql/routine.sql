CREATE TABLE routine (
    id bigint AUTO_INCREMENT PRIMARY KEY,
    user_id varchar(50) not null,
    routine_name varchar(255) not null,
    start_date DATE not null,
    end_date DATE,
    is_closed BOOLEAN default false
);

CREATE TABLE routine_log (
    id bigint AUTO_INCREMENT PRIMARY KEY,
    routine_id bigint,
    log_date DATE,
    is_completed BOOLEAN default false
);

CREATE TABLE repeat_days (
    id bigint AUTO_INCREMENT PRIMARY KEY,
    routine_id bigint,
    week_of_day int not null
);
// 1 = 일, 2 = 월, ... , 7 = 토