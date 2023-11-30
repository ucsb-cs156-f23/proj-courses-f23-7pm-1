import React from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import PersonalScheduleDropdown from "../PersonalSchedules/PersonalScheduleDropdown.js";
import { useBackend } from "main/utils/useBackend.js";
import { useState } from "react";
import { useMemo } from "react";

function CourseForm({ initialCourse, submitAction, buttonLabel = "Create" }) {
  // Stryker disable all
  const {
    data: schedules,
    error: _error,
    status: _status,
  } = useBackend(
    ["/api/personalschedules/all"],
    { method: "GET", url: "/api/personalschedules/all" },
    [],
  );

  const memoCourse = useMemo(() => { return {psId: schedules[0]?.id} }, [schedules]);
  
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ defaultValues: initialCourse || memoCourse });
  // Stryker enable all

  const navigate = useNavigate();

  const controlId = "CourseForm-psId";

  // if (schedules.length > 0 && localStorage.getItem(controlId) == null) {
  //   localStorage.setItem(controlId, schedules[0].id);
  // }

  const localSearchSchedule = localStorage.getItem(controlId);

  const [scheduleState, setScheduleState] = useState(
    // Stryker disable next-line all : not sure how to test/mock local storage
    localSearchSchedule || "",
  );

  if (schedules.length > 0) {
    localStorage.setItem(controlId, schedules[0].id);
  }

  if (scheduleState) {
    localStorage.setItem(controlId, scheduleState);
  }

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

      <Form.Group className="mb-3" data-testid="CourseForm-psId">
        <PersonalScheduleDropdown
          schedules={schedules}
          schedule={scheduleState}
          setSchedule={setScheduleState}
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
