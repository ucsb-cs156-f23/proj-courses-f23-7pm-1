package edu.ucsb.cs156.courses.jobs;

import edu.ucsb.cs156.courses.collections.ConvertedSectionCollection;
import edu.ucsb.cs156.courses.services.UCSBCurriculumService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UpdateFinalsDataJobFactory {

  @Autowired private UCSBCurriculumService ucsbCurriculumService;

  @Autowired private ConvertedSectionCollection convertedSectionCollection;

  public UpdateFinalsDataJob createForQuarterRange(
      String start_quarterYYYYQ, String end_quarterYYYYQ) {
    return new UpdateFinalsDataJob(start_quarterYYYYQ, end_quarterYYYYQ, ucsbCurriculumService, convertedSectionCollection);
  }
}
