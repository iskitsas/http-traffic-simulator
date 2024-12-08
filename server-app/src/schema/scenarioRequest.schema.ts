import { object, string, array } from "yup";

const fileConfigSchema = object({
  project: object({
    projectName: string()
      .required("project not found")
  }),
  scenario: array()
    .of(object().shape({
      workers: string()
        .required("Number of workers is required"),
      totalclients: string()
        .required("totalclients is required"),
      duration: string()
        .required("duration is required"),
      throttling: string(),
      delay: string()
        .required("delay is required"),
    }))
    .required("scenario required")
  ,
  requests: array()
    .of(object().shape({
      port: string()
        .required("port is required"),
      host: string()
        .required("host is required"),
      method: string()
        .required("method is required"),
      path: string()
        .required("method is required"),
    }))
    .required("requests required")
})
const scenarioConfigSchema = object({
  scenario: object().shape({
    workers: string()
      .required("Number of workers is required"),
    totalclients: string()
      .required("totalclients is required"),
    duration: string()
      .required("duration is required"),
    throttling: string(),
    delay: string()
      .required("delay is required"),
  })
    .required("scenario required")
  ,
  requests: array()
    .of(object().shape({
      port: string()
        .required("port is required"),
      host: string()
        .required("host is required"),
      method: string()
        .required("method is required"),
      path: string(),
    }))
    .required("requests required")
});

export { fileConfigSchema, scenarioConfigSchema }