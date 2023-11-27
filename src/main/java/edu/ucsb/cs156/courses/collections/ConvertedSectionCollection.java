package edu.ucsb.cs156.courses.collections;

import edu.ucsb.cs156.courses.documents.ConvertedSection;
import java.util.List;
import java.util.Optional;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ConvertedSectionCollection extends MongoRepository<ConvertedSection, ObjectId> {
  @Query("{'courseInfo.quarter': ?0, 'section.enrollCode': ?1}")
  Optional<ConvertedSection> findOneByQuarterAndEnrollCode(String quarter, String enrollCode);

  @Query("{'courseInfo.quarter': { $gte: ?0, $lte: ?1 }, 'courseInfo.courseId': { $regex: ?2 } }")
  List<ConvertedSection> findByQuarterRangeAndCourseId(
      String startQuarter, String endQuarter, String courseId);

  @Query(
      "{'courseInfo.quarter': {$gte: ?0, $lte: ?1}, 'section.instructors': { '$elemMatch': { 'instructor': { $regex: ?2 }, 'functionCode': { $regex: ?3 }}}}")
  List<ConvertedSection> findByQuarterRangeAndInstructor(
      String startQuarter, String endQuarter, String instructor, String functionCode);

  @Query(
      "{'courseInfo.quarter': { $gte: ?0, $lte: ?1 }, 'section.timeLocations.building': { $regex: ?2, $options: 'i' } }")
  List<ConvertedSection> findByQuarterRangeAndBuildingCode(
      String startQuarter, String endQuarter, String buildingCode);

  @Query("{'courseInfo.quarter': { $gte: ?0, $lte: ?1 }}")
  List<ConvertedSection> findByQuarterRange(
      String startQuarter, String endQuarter);
}
