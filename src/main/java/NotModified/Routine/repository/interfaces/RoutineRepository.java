package NotModified.Routine.repository.interfaces;

import NotModified.Routine.domain.Routine;
import NotModified.Routine.domain.RoutineLog;
import org.springframework.data.jpa.repository.JpaRepository;
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
}
