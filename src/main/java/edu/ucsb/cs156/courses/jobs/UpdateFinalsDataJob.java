package edu.ucsb.cs156.courses.jobs;

import edu.ucsb.cs156.courses.collections.ConvertedSectionCollection;
import edu.ucsb.cs156.courses.documents.ConvertedSection;
import edu.ucsb.cs156.courses.documents.CoursePage;
import edu.ucsb.cs156.courses.documents.FinalExam;
import edu.ucsb.cs156.courses.models.Quarter;
import edu.ucsb.cs156.courses.services.UCSBCurriculumService;
import edu.ucsb.cs156.courses.services.jobs.JobContext;
import edu.ucsb.cs156.courses.services.jobs.JobContextConsumer;
import java.util.List;
import java.util.Optional;

import javax.security.auth.Subject;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class UpdateFinalsDataJob implements JobContextConsumer {
  private String start_quarterYYYYQ;
  private String end_quarterYYYYQ;
  private UCSBCurriculumService ucsbCurriculumService;
  private ConvertedSectionCollection convertedSectionCollection;

  @Override
  public void accept(JobContext ctx) throws Exception {
    List<Quarter> quarters = Quarter.quarterList(start_quarterYYYYQ, end_quarterYYYYQ);
    for (Quarter quarter : quarters) {
      String quarterYYYYQ = quarter.getYYYYQ();
      updateFinals(ctx, quarterYYYYQ);
    }
  }

  public void updateFinals(JobContext ctx, String quarterYYYYQ)
      throws Exception {
    ctx.log("Updating final exam info for [" + quarterYYYYQ + "]");

    List<ConvertedSection> convertedSections =
        convertedSectionCollection.findByQuarterRange(quarterYYYYQ, quarterYYYYQ);

    ctx.log("Attempting to update final exams for " + convertedSections.size() + " sections in MongoDB...");

    int updatedSections = 0;
    int errors = 0;

    for (ConvertedSection section : convertedSections) {
      String enrollCd = section.getSection().getEnrollCode();
      try {
        FinalExam finalExam = ucsbCurriculumService.getFinalExamObject(quarterYYYYQ, enrollCd);
        section.setFinalExam(finalExam);
        convertedSectionCollection.save(section);
        updatedSections++;
      } catch (Exception e) {
        ctx.log("Error saving final exam: " + e.getMessage());
        errors++;
      }
    }

    ctx.log(
        String.format(
            "%d final exams updated, %d errors",
            updatedSections, errors));
    ctx.log("Final exam info for [" + quarterYYYYQ + "] has been updated");
  }
}
