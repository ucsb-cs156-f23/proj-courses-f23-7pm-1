package edu.ucsb.cs156.courses.jobs;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

import edu.ucsb.cs156.courses.collections.ConvertedSectionCollection;
import edu.ucsb.cs156.courses.documents.ConvertedSection;
import edu.ucsb.cs156.courses.documents.CoursePage;
import edu.ucsb.cs156.courses.documents.CoursePageFixtures;
import edu.ucsb.cs156.courses.entities.Job;
import edu.ucsb.cs156.courses.services.UCSBCurriculumService;
import edu.ucsb.cs156.courses.services.jobs.JobContext;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
public class UpdateFinalsDataJobTests {
  @Mock UCSBCurriculumService ucsbCurriculumService;

  @Mock ConvertedSectionCollection convertedSectionCollection;

  Job jobStarted = Job.builder().build();
  JobContext ctx = new JobContext(null, jobStarted);

  @Test
  void test_subject_and_quarter_range() throws Exception {

    var job =
        spy(
            new UpdateFinalsDataJob(
                "20211",
                "20213",
                ucsbCurriculumService,
                convertedSectionCollection));
    doNothing().when(job).updateFinals(any(), any());

    job.accept(ctx);

    verify(job).updateFinals(ctx, "20211");
    verify(job).updateFinals(ctx, "20212");
    verify(job).updateFinals(ctx, "20213");
  }

  @Test
  void test_log_output_success() throws Exception {

    // Act
    var job =
        new UpdateFinalsDataJob(
            "20211", "20211", ucsbCurriculumService, convertedSectionCollection);
    job.accept(ctx);

    // Assert

    String expected =
        """
                Updating final exam info for [20211]
                Attempting to update final exams for 0 sections in MongoDB...
                0 final exams updated, 0 errors
                Final exam info for [20211] has been updated""";

    assertEquals(expected, jobStarted.getLog());
  }

  @Test
  void test_log_output_with_updates() throws Exception {

    // Arrange

    String coursePageJson = CoursePageFixtures.COURSE_PAGE_JSON_MATH3B;
    CoursePage coursePage = CoursePage.fromJSON(coursePageJson);

    List<ConvertedSection> convertedSections = coursePage.convertedSections();

    List<ConvertedSection> exampleSections = new ArrayList<>();

    ConvertedSection section0 = convertedSections.get(0);
    ConvertedSection section1 = convertedSections.get(1);

    exampleSections.add(section0);
    exampleSections.add(section1);

    Optional<ConvertedSection> section0Optional = Optional.of(section0);
    Optional<ConvertedSection> emptyOptional = Optional.empty();

    when(convertedSectionCollection.findByQuarterRange(
            eq("20222"), eq("20222")))
        .thenReturn(exampleSections);

    // Act
    var job =
        new UpdateFinalsDataJob(
            "20222", "20222", ucsbCurriculumService, convertedSectionCollection);
    job.accept(ctx);

    // Assert

    String expected =
        """
                Updating final exam info for [20222]
                Attempting to update final exams for 2 sections in MongoDB...
                2 final exams updated, 0 errors
                Final exam info for [20222] has been updated""";

    assertEquals(expected, jobStarted.getLog());
  }

  @Test
  void test_log_output_with_errors() throws Exception {

    // Arrange

    String coursePageJson = CoursePageFixtures.COURSE_PAGE_JSON_MATH3B;
    CoursePage coursePage = CoursePage.fromJSON(coursePageJson);

    List<ConvertedSection> convertedSections = coursePage.convertedSections();

    List<ConvertedSection> listWithOneSection = new ArrayList<>();

    ConvertedSection section0 = convertedSections.get(0);

    listWithOneSection.add(section0);

    when(convertedSectionCollection.findByQuarterRange(
            eq(section0.getCourseInfo().getQuarter()), eq(section0.getCourseInfo().getQuarter())))
        .thenReturn(listWithOneSection);
    when(convertedSectionCollection.save( any() ))
        .thenThrow(new IllegalArgumentException("Testing Exception Handling!"));

    // Act
    var job =
        new UpdateFinalsDataJob(
            "20222", "20222", ucsbCurriculumService, convertedSectionCollection);
    job.accept(ctx);

    // Assert

    String expected =
        """
                Updating final exam info for [20222]
                Attempting to update final exams for 1 sections in MongoDB...
                Error saving final exam: Testing Exception Handling!
                0 final exams updated, 1 errors
                Final exam info for [20222] has been updated""";

    assertEquals(expected, jobStarted.getLog());
  }
}
