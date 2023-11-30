import { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

import { quarterRange } from "main/utils/quarterUtilities";

import { useSystemInfo } from "main/utils/systemInfo";
import SingleQuarterDropdown from "../Quarters/SingleQuarterDropdown";

const UpdateFinalsJobForm = ({ callback }) => {
  const { data: systemInfo } = useSystemInfo();

  // Stryker disable OptionalChaining
  const startQtr = systemInfo?.startQtrYYYYQ || "20211";
  const endQtr = systemInfo?.endQtrYYYYQ || "20214";
  // Stryker enable OptionalChaining

  const quarters = quarterRange(startQtr, endQtr);

  // Stryker disable all : not sure how to test/mock local storage
  const localStartQuarter = localStorage.getItem("FinalsJob.StartQuarter");
  const localEndQuarter = localStorage.getItem("FinalsJob.EndQuarter");

  const [startQuarter, setStartQuarter] = useState(
    localStartQuarter || quarters[0].yyyyq,
  );
  const [endQuarter, setEndQuarter] = useState(
    localEndQuarter || quarters[quarters.length - 1].yyyyq,
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("UpdateFinalsJobForm: start quarter", startQuarter);
    console.log("UpdateFinalsJobForm: end quarter", endQuarter);
    callback({ startQuarter, endQuarter });
  };

  // Stryker disable all : Stryker is testing by changing the padding to 0. But this is simply a visual optimization as it makes it look better
  return (
    <Form onSubmit={handleSubmit}>
      <Container>
        <Row>
          <Col md="auto">
            <SingleQuarterDropdown
              quarters={quarters}
              quarter={startQuarter}
              setQuarter={setStartQuarter}
              controlId={"FinalsJob.StartQuarter"}
              label="Start Quarter"
            />
          </Col>
          <Col md="auto">
            <SingleQuarterDropdown
              quarters={quarters}
              quarter={endQuarter}
              setQuarter={setEndQuarter}
              controlId={"FinalsJob.EndQuarter"}
              label="End Quarter"
            />
          </Col>
        </Row>
        <Row style={{ paddingTop: 10, paddingBottom: 10 }}>
          <Col md="auto">
            <Button variant="primary" type="submit" data-testid="updateFinals">
              Update Finals
            </Button>
          </Col>
        </Row>
      </Container>
    </Form>
  );
};

export default UpdateFinalsJobForm;
