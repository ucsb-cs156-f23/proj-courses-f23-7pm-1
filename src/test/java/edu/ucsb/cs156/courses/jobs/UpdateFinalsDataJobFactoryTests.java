package edu.ucsb.cs156.courses.jobs;

import static org.junit.jupiter.api.Assertions.assertEquals;

import edu.ucsb.cs156.courses.collections.ConvertedSectionCollection;
import edu.ucsb.cs156.courses.services.UCSBCurriculumService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.AutoConfigureDataJpa;
import org.springframework.boot.test.autoconfigure.web.client.RestClientTest;
import org.springframework.boot.test.mock.mockito.MockBean;

@RestClientTest(UpdateFinalsDataJobFactory.class)
@AutoConfigureDataJpa
public class UpdateFinalsDataJobFactoryTests {

  @MockBean UCSBCurriculumService ucsbCurriculumService;

  @MockBean ConvertedSectionCollection convertedSectionCollection;

  @Autowired UpdateFinalsDataJobFactory factory;

  @Test
  void test_createForQuarterRange() throws Exception {

    // Act

    UpdateFinalsDataJob updateFinalsDataJob = factory.createForQuarterRange("20221", "20222");

    // Assert

    assertEquals("20221", updateFinalsDataJob.getStart_quarterYYYYQ());
    assertEquals("20222", updateFinalsDataJob.getEnd_quarterYYYYQ());
  }
}
