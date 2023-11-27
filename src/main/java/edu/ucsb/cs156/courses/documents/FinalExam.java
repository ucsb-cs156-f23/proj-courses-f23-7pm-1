package edu.ucsb.cs156.courses.documents;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FinalExam implements Cloneable {
  private boolean hasFinals;
  private String comments;
  private String examDay;
  private String examDate;
  private String beginTime;
  private String endTime;

  public Object clone() throws CloneNotSupportedException {

    FinalExam newFinalExam = (FinalExam) super.clone();

    return newFinalExam;
  }
}
