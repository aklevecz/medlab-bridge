import React from "react";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { authenticationService } from "@/_services";

import {
  Body,
  Button,
  CContainer,
  Header,
  Label,
  StyledField,
  StyledForm
} from "../_styles/form";

const Login = ({ history, location }) => {
  // redirect to home if already logged in
  const handleFocus = event => event.target.select();

  if (authenticationService.currentUserValue) {
    history.push("/");
  }

  return (
    <CContainer>
      <Header>
        <h2>login</h2>
      </Header>
      <Body>
        <Formik
          initialValues={{
            username: "",
            password: ""
          }}
          validationSchema={Yup.object().shape({
            username: Yup.string().required("Username is required"),
            password: Yup.string().required("Password is required")
          })}
          onSubmit={({ username, password }, { setStatus, setSubmitting }) => {
            setStatus();
            authenticationService.login(username, password).then(
              user => {
                const { from } = location.state || {
                  from: { pathname: "/" }
                };
                history.push(from);
              },
              error => {
                setSubmitting(false);
                setStatus(error);
              }
            );
          }}
          render={({ errors, status, touched, isSubmitting }) => (
            <StyledForm>
              <div className="form-group">
                <Label htmlFor="username">raptorname</Label>
                <StyledField
                  name="username"
                  type="text"
                  placeholder="hehe"
                  onFocus={handleFocus}
                  className={
                    "form-control" +
                    (errors.username && touched.username ? " is-invalid" : "")
                  }
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
              <div className="form-group">
                <Label htmlFor="password">password</Label>
                <StyledField
                  name="password"
                  type="password"
                  placeholder=""
                  className={
                    "form-control" +
                    (errors.password && touched.password ? " is-invalid" : "")
                  }
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
              <div className="form-group">
                <Button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting}
                >
                  GO
                </Button>
                {isSubmitting && (
                  <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                )}
              </div>
              {status && <div className={"alert alert-danger"}>{status}</div>}
            </StyledForm>
          )}
        />
      </Body>
    </CContainer>
  );
};

export { Login };
