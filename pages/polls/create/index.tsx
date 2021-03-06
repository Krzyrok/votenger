import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { KeyboardDatePicker } from '@material-ui/pickers';

import { URL as MAIN_PAGE_URL } from '../..';
import useUser from '../../../hooks/useUser';
import { isUserAdmin } from '../../../auth';

export const URL = '/polls/create';

const CreatePollPage: React.FunctionComponent = () => {
  const router = useRouter();
  const [user] = useUser();

  useEffect(() => {
    if (!isUserAdmin(user?.username)) {
      router.push(MAIN_PAGE_URL);
    }
  }, []);

  return (
    <Container>
      <Grid container justify="center">
        <Grid item md={4} xs={12}>
          <Typography align="center" variant="h4">
            Create poll
          </Typography>
          <Formik
            initialValues={{
              description: '',
              name: '',
              plannedFor: new Date().toString(),
            }}
            onSubmit={async (values) => {
              await axios.post('/api/polls', values);

              router.push(MAIN_PAGE_URL);
            }}
            validationSchema={Yup.object().shape({
              name: Yup.string().required('Field is required'),
            })}
          >
            {(props) => {
              const {
                values,
                touched,
                errors,
                isSubmitting,
                isValid,
                handleChange,
                handleBlur,
                handleSubmit,
                setFieldValue,
              } = props;
              return (
                <form onSubmit={handleSubmit}>
                  <Grid container direction="column" spacing={3}>
                    <Grid item></Grid>
                    <Grid item>
                      <TextField
                        fullWidth
                        error={errors.name && touched.name}
                        helperText={errors.name && touched.name && errors.name}
                        id="name"
                        inputProps={{ maxLength: 32 }}
                        label="Name"
                        margin="normal"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.name}
                      />
                    </Grid>
                    <Grid item>
                      <KeyboardDatePicker
                        fullWidth
                        format="dd/MM/yyyy"
                        id="plannedFor"
                        label="Date"
                        onBlur={handleBlur}
                        onChange={(plannedFor) => {
                          setFieldValue('plannedFor', plannedFor.toString());
                        }}
                        value={values.plannedFor}
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        fullWidth
                        multiline
                        id="description"
                        inputProps={{ maxLength: 256 }}
                        label="Description"
                        margin="normal"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.description}
                      />
                    </Grid>
                    <Grid item>
                      <Button
                        fullWidth
                        color="primary"
                        disabled={isSubmitting || !isValid}
                        type="submit"
                        variant="contained"
                      >
                        Create
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              );
            }}
          </Formik>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CreatePollPage;
