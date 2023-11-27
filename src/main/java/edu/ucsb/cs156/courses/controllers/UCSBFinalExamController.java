package edu.ucsb.cs156.courses.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import edu.ucsb.cs156.courses.repositories.UserRepository;
import edu.ucsb.cs156.courses.services.UCSBCurriculumService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api/finalsInfo")
public class UCSBFinalExamController {

  private ObjectMapper mapper = new ObjectMapper();

  @Autowired UserRepository userRepository;

  @Autowired UCSBCurriculumService ucsbCurriculumService;

  @GetMapping(value = "", produces = "application/json")
  public ResponseEntity<String> finalsinfo(@RequestParam String qxx, @RequestParam String enrollCd)
      throws JsonProcessingException {

    String body = ucsbCurriculumService.getFinalExamInfo(qxx, enrollCd);

    return ResponseEntity.ok().body(body);
  }
}
