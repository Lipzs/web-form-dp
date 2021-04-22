import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

const DateAndTimePickers = ({onChange, data}) => {
  const classes = useStyles();

  return (
    <form className={classes.container} noValidate>
      <TextField
        id="datetime-local"
        label="Data de agendamento"
        type="datetime-local"
        onChange={(e) => { onChange(e) }}
        defaultValue={ data }
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </form>
  );
}

export default DateAndTimePickers;