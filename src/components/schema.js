import * as yup from "yup";

const MailSchema = yup.object().shape({
  email: yup.string().email("Invalid Email").required("Please Insert Email"),
  name: yup
    .string()
    .trim()
    .min(1, "Too Short!")
    .max(50, "Too Long!")
    .required("Please Insert Name"),
  subject: yup
    .string()
    .trim()
    .min(1, "Too Short!")
    .max(50, "Too Long!")
    .required("Please Insert Subject"),
  message: yup
    .string()
    .trim()
    .min(1, "Too Short!")
    .max(1500, "Too Long!")
    .required("Please Insert Message"),
});

export { MailSchema };
