package edu.ucsb.cs156.courses.controllers;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import edu.ucsb.cs156.courses.config.SecurityConfig;
import edu.ucsb.cs156.courses.repositories.UserRepository;
import edu.ucsb.cs156.courses.services.UCSBCurriculumService;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.AutoConfigureDataJpa;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

@Slf4j
@WebMvcTest(value = UCSBFinalExamController.class)
@Import(SecurityConfig.class)
@AutoConfigureDataJpa
public class UCSBFinalExamControllerTests {

  private ObjectMapper mapper = new ObjectMapper();

  @MockBean UserRepository userRepository;

  @Autowired private MockMvc mockMvc;

  @MockBean private UCSBCurriculumService ucsbCurriculumService;

  @Test
  public void test_finals() throws Exception {

    String expectedResult = "{expectedJSONResult}";
    String urlTemplate = "/api/finalsInfo?qxx=%s&enrollCd=%s";
    String url = String.format(urlTemplate, "w24", "04051");
    when(ucsbCurriculumService.getFinalExamInfo(any(String.class), any(String.class)))
        .thenReturn(expectedResult);

    MvcResult response =
        mockMvc
            .perform(get(url).contentType("application/json"))
            .andExpect(status().isOk())
            .andReturn();
    String responseString = response.getResponse().getContentAsString();

    assertEquals(expectedResult, responseString);
  }
}
