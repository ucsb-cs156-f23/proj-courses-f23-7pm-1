package edu.ucsb.cs156.courses.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import edu.ucsb.cs156.courses.entities.GradeHistory;
import edu.ucsb.cs156.courses.repositories.GradeHistoryRepository;
import edu.ucsb.cs156.courses.utilities.CourseUtilities;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@Tag(name = "API for grade history data")
@RequestMapping("/api/gradehistory")
@RestController
public class GradeHistoryController extends ApiController {
  @Autowired GradeHistoryRepository gradeHistoryRepository;

  @Autowired ObjectMapper mapper;

  @Operation(summary = "Get grade history for a course")
  @GetMapping(value = "/search", produces = "application/json")
  public Iterable<GradeHistory> gradeHistoryBySubjectAreaAndCourseNumber(
      @Parameter(
              name = "subjectArea",
              description = "Subjects of UCSB",
              example = "CMPSC",
              required = true)
          @RequestParam
          String subjectArea,
      @Parameter(
              name = "courseNumber",
              description = "Represents a subject-specific course",
              example = "130A",
              required = true)
          @RequestParam
          String courseNumber) {
    String course = CourseUtilities.makeFormattedCourseId(subjectArea, courseNumber);
    Iterable<GradeHistory> gradeHistoryRows = gradeHistoryRepository.findByCourse(course);
    return gradeHistoryRows;
  }
}
