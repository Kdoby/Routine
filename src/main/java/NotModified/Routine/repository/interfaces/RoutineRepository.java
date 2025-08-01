package NotModified.Routine.repository.interfaces;

import NotModified.Routine.domain.Routine;
import NotModified.Routine.domain.RoutineLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface RoutineRepository extends JpaRepository<Routine, Long> {

    // 루틴 중에서 targetDate 범위 내에 속하고, 활성화 된 것
    @Query("SELECT r FROM Routine r " +
            "WHERE r.userId = :userId " +
            "AND r.startDate <= :targetDate " +
            "AND r.endDate >= :targetDate")
    List<Routine> findRoutinesOnDate(@Param("userId") String userId, @Param("targetDate")LocalDate targetDate);

    @Query("SELECT r FROM Routine r " +
            "WHERE r.userId = :userId " +
            "AND r.startDate <= :lastDay " +
            "AND r.endDate >= :firstDay")
    List<Routine> findRoutinesInMonth(@Param("userId") String userId,
                                            @Param("firstDay") LocalDate firstDay,
                                            @Param("lastDay") LocalDate lastDay);

    // 반복 종료일자를 넘기면 루틴 자동 종료
    @Modifying
    @Query("UPDATE Routine r SET r.isClosed = true WHERE r.endDate < :today AND r.isClosed = false")
    int closedExpiredRoutines(@Param("today") LocalDate today);
}
