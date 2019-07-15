import React, { useEffect } from 'react';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import {
  TextField,
  Button,
  Typography,
  Grid,
} from '@material-ui/core';
import { createUser, resetError } from '../../store/actions/user';

const SubscribeForm = ({
  fetchinError,
  fetching,
  isAuthenticated,
  createUser: creatUserAction,
  resetError: resetErrorAction,
}) => {
  const formikRef = React.createRef();

  useEffect(() => () => {
    resetErrorAction();
  }, []);

  useEffect(() => {
    if (fetchinError) {
      formikRef.current.setErrors({ form: 'Error submiting form' });
    }
  }, [fetching]);

  const handelSubmit = (values) => {
    creatUserAction(values);
  };

  const handelValidate = (values) => {
    const errors = {};
    if (!values.username) {
      errors.username = 'Required';
    }
    if (!values.password) {
      errors.password = 'Required';
    }
    if (values.password !== values.passwordConfirm) {
      errors.passwordConfirm = ' does not match';
    }
    return errors;
  };

  return (
    <>
      {isAuthenticated && <Redirect to="/" />}
      <Formik
        validate={handelValidate}
        onSubmit={handelSubmit}
        ref={formikRef}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField autoFocus variant="outlined" fullWidth id="username" label="Username" type="text" name="username" required value={values.username} onChange={handleChange} />
                {errors.username && touched.username
                 && <Typography variant="body2" color="textSecondary" align="center">{errors.username}</Typography>
                }
              </Grid>
              <Grid item xs={12}>
                <TextField variant="outlined" fullWidth id="password" label="Password" type="password" name="password" placeholder="" required value={values.password} onChange={handleChange} />
                {errors.password && touched.password
                 && <Typography variant="body2" color="textSecondary" align="center">{errors.password}</Typography>
                }
              </Grid>
              <Grid item xs={12}>
                <TextField variant="outlined" fullWidth id="passwordConfirm" label="Confirm password" type="password" name="passwordConfirm" placeholder="" required value={values.passwordConfirm} onChange={handleChange} />
                {errors.passwordConfirm
                 && <Typography variant="body2" color="textSecondary" align="center">{errors.passwordConfirm}</Typography>
                }
              </Grid>
              <Grid item xs={12}>
                <Button fullWidth variant="contained" color="secondary" type="submit" value="Submit" disabled={fetching}>Submit</Button>
                {errors.form
                 && <Typography variant="body2" color="textSecondary" align="center">{errors.form}</Typography>
                }
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
};

SubscribeForm.propTypes = {
  fetchinError: PropTypes.bool,
  fetching: PropTypes.bool,
  isAuthenticated: PropTypes.bool,
  createUser: PropTypes.func,
  resetError: PropTypes.func,
};

const mapStateToProps = ({ user }) => ({
  fetchinError: user.error,
  fetching: user.fetching,
  isAuthenticated: user.isAuthenticated,
});

export default connect(mapStateToProps, { createUser, resetError })(SubscribeForm);
