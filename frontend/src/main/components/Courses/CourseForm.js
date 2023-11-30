import React from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import PersonalScheduleDropdown from "../PersonalSchedules/PersonalScheduleDropdown.js";
import { useBackend } from "main/utils/useBackend";

function CourseForm({ initialCourse, controlId, submitAction, scheduleState, setScheduleState, buttonLabel = "Create" }) {
  // Stryker disable all
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ defaultValues: initialCourse || {} });
  // Stryker enable all

  const navigate = useNavigate();

  const {
    data: schedules,
    error: _error,
    status: _status,
  } = useBackend(
    // Stryker disable next-line all 
    ["/api/personalschedules/all"],
    { method: "GET", url: "/api/personalschedules/all" },
    [],
  );

  return (
    <Form onSubmit={handleSubmit(submitAction)}>
      {initialCourse && (
        <Form.Group className="mb-3">
          <Form.Label htmlFor="id">Id</Form.Label>
          <Form.Control
            data-testid="CourseForm-id"
            id="id"
            type="text"
            {...register("id")}
            value={initialCourse.id}
            disabled
          />
        </Form.Group>
      )}

      <Form.Group className="mb-3">
        <Form.Label htmlFor="enrollCd">Enrollment Code</Form.Label>
        <Form.Control
          data-testid="CourseForm-enrollCd"
          id="enrollCd"
          type="text"
          isInvalid={Boolean(errors.enrollCd)}
          {...register("enrollCd", {
            required: "Enroll Code is required.",
          })}
        />
        <Form.Control.Feedback type="invalid">
          {errors.enrollCd?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <PersonalScheduleDropdown
          schedules={schedules}
          scheduleState={scheduleState}
          setScheduleState={setScheduleState}
          controlId={controlId}
        />
      </Form.Group>

      <Button type="submit" data-testid="CourseForm-submit">
        {buttonLabel}
      </Button>
      <Button
        variant="Secondary"
        onClick={() => navigate(-1)}
        data-testid="CourseForm-cancel"
      >
        Cancel
      </Button>
    </Form>
  );
}

export default CourseForm;
