import { Box, Grid, TextField } from "@mui/material";
import { useFormik } from "formik";
import { MailSchema } from "./schema";
import "./index.scss";
import { useState } from "react";
import { enqueueSnackbar } from "notistack";

const Form = () => {
  const [ani, setAni] = useState(true);
  const {
    values,
    handleChange: authChange,
    handleSubmit: authSubmit,
    errors,
    touched,
  } = useFormik({
    initialValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
    validationSchema: MailSchema,
    onSubmit: async (values) => {
      ani === true
        ? enqueueSnackbar(
            "Send Mail.Please check your mail(Inbox or Spam section)",
            { variant: "success" }
          )
        : enqueueSnackbar("Please Reload Page", { variant: "info" });
      const emailData = {
        Host: process.env.REACT_APP_SMPT_HOST,
        Username: process.env.REACT_APP_SMPT_USERNAME,
        Password: process.env.REACT_APP_SMPT_PASSWORD,
        To: values.email,
        From: process.env.REACT_APP_SMPT_FROM,
        Subject: `${values.subject}`,
        Body: `
        <div style="width: 100%; height: 100vh; background-color: #f1f1f7">
      <div style="width: 500px; padding: 15px; margin: 20px auto">
        <h2 style="font-size: 34px; margin-bottom: 8px; color: #3b3b63">
          From ${values.name}:
        </h2>
      </div>
      <div
        style="
          border: 1px solid #e0e0e0;
          width: 500px;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          padding: 15px;
          margin: 20px auto;
          background-color: #ffffff;
        "
      >
        <p
          style="
            font-size: 16px;
            color: #32325c;
            margin-top: 30px;
            font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande',
              'Lucida Sans', Arial, sans-serif;
          "
        >
          ${values.message}
        </p>
        <p
          style="
            font-size: 16px;
            color: #ab112b;
            margin-top: 30px;
            font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande',
              'Lucida Sans', Arial, sans-serif;
          "
        >
          This is a test email for SMTP.js.
        </p>
        <div style="display: flex; align-items: center">
          <p
            style="
              font-size: 16px;
              color: #ab112b;
              margin-top: 0px;
              font-family: 'Trebuchet MS', 'Lucida Sans Unicode',
                'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
            "
          >
            Created: Ilgar Zamanov
          </p>
        </div>
        <div style="display: flex; column-gap: 5px">
          <a
            href="https://www.linkedin.com/in/ilgar-zamanov-43141321b/"
            target="_blank"
            title="LinkedIn"
          >
            <img
              src="https://img.icons8.com/color/48/linkedin.png"
              alt="linkedin"
              style="width: 30px; height: 30px"
            />
          </a>
          <a href="https://www.instagram.com/th.ilgar/" title="Instagram">
            <img
              src="https://img.icons8.com/color/48/instagram-new--v1.png"
              alt="instagram"
              style="width: 30px; height: 30px"
            />
          </a>
        </div>
      </div>
    </div>
                `,
        IsHtml: true,
      };
      ani === true ? await window.Email.send(emailData) : "";
      setAni(false);
    },
  });
  const textFieldStyles = {
    color: "white",
  };
  const textAreaStyles = {
    color: "white",
    backkground: "#3a8b7d",
  };

  const inputLabelStyles = {
    color: "white",
  };

  return (
    <Box className="container">
      <Box onSubmit={authSubmit} component="form" onChange={authChange}>
        <Box>
          <Grid>
            <Grid item xs={10} sm={10} sx={{ padding: "0 10px" }}>
              <TextField
                id="name"
                name="name"
                value={values.name}
                label="Name "
                variant="standard"
                fullWidth
                margin="dense"
                InputProps={{
                  style: textFieldStyles,
                }}
                InputLabelProps={{
                  style: inputLabelStyles,
                }}
              />
              <Grid>
                <Grid item xs={10} sm={10}>
                  {errors.name && touched.name && (
                    <span className="errorMsg">{errors.name}</span>
                  )}
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={10} sm={10} sx={{ padding: "0 10px" }}>
              <TextField
                id="email"
                name="email"
                value={values.email}
                label="To"
                variant="standard"
                fullWidth
                margin="dense"
                InputProps={{
                  style: textFieldStyles,
                }}
                InputLabelProps={{
                  style: inputLabelStyles,
                }}
              />
              <Grid>
                <Grid item xs={10} sm={10}>
                  {errors.email && touched.email && (
                    <span className="errorMsg">{errors.email}</span>
                  )}
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={10} sm={10} sx={{ padding: "0 10px 10px 10px" }}>
              <TextField
                id="subject"
                name="subject"
                value={values.subject}
                label="Subject"
                variant="standard"
                fullWidth
                margin="dense"
                InputProps={{
                  style: textFieldStyles,
                }}
                InputLabelProps={{
                  style: inputLabelStyles,
                }}
              />
              <Grid>
                <Grid item xs={10} sm={10}>
                  {errors.subject && touched.subject && (
                    <span className="errorMsg">{errors.subject}</span>
                  )}
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={10} sm={10} sx={{ padding: "10px" }}>
              <TextField
                id="message"
                name="message"
                value={values.message}
                label="Message"
                multiline
                minRows={2}
                placeholder="Description"
                variant="outlined"
                fullWidth
                InputProps={{
                  style: textAreaStyles,
                }}
                InputLabelProps={{
                  style: inputLabelStyles,
                }}
              />
              <Grid>
                <Grid item xs={10} sm={10}>
                  {errors.message && touched.message && (
                    <span className="errorMsg">{errors.message}</span>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Box mt={3} className="boxButton">
            <Box className="button">
              <button className="btn btn-inside btn-boarder" type="submit">
                <Box id="plane" className={ani === true ? "" : "animation"}>
                  <img
                    src="https://i.cloudup.com/gBzAn-oW_S-2000x2000.png"
                    style={{ width: "64px", height: "64px" }}
                  />
                </Box>
              </button>
              <Box className="bg">
                <img
                  src="https://i.cloudup.com/2ZAX3hVsBE-3000x3000.png"
                  id="bg"
                  className={ani === true ? "" : "animation2"}
                  width="32px"
                  height="32px"
                  style={{ opacity: "0" }}
                />
              </Box>
              <Box className="around around-boarder"></Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Form;
