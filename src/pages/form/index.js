import React, { useState } from 'react';
import api from '../../services/api';

import { Grid, } from '@material-ui/core';

import DateField from '../../components/date';
import Switch from '@material-ui/core/Switch';
import Modal from '../../components/modal';
import Input from '../../components/input';

import './styles.css';

const Form = () => {

  const [name, setName] = useState('');
  const [cellphone, setCellphone] = useState('');
  const [whatsapp, setWhatsapp] = useState(false);
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [licensePlate, setLicensePlate] = useState('');
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [modalInfo, setModalInfo] = useState({ title: '', description: '', success: false });

  const [nameError, setNameError] = useState('');
  const [cellphoneError, setCellphoneError] = useState('');
  const [brandError, setBrandError] = useState('');
  const [modelError, setModelError] = useState('');
  const [licensePlateError, setLicensePlateError] = useState('');

  const clearFields = () => {
    setName('');
    setCellphone('');
    setWhatsapp(false);
    setBrand('');
    setModel('');
    setYear('');
    setLicensePlate('');
  }

  const handleSubmit = async(e) => {
    e.preventDefault();

    if (name === undefined || name === '') {
      setNameError('Campo requerido');
      return;
    }

    if (cellphone !== '' && cellphone.length < 11) {
      setCellphoneError('O telefone precisa ter 11 dígitos');
      return;
    }

    if (brand === undefined || brand === '') {
      setBrandError('Campo requerido');
      return;
    }

    if (model === undefined || model === '') {
      setModelError('Campo requerido');
      return;
    }

    if (licensePlate === undefined || licensePlate === '') {
      setLicensePlateError('Campo requerido');
      return;
    }

    try {
      const response = await api.post('schedule', {
        name,
        cellphone,
        whatsapp,
        brand,
        model,
        year,
        licensePlate,
        date
      });
      const receivedData = response.data;
      const dateOfSchedule = (receivedData.formatedDate);
  
      if (response.status === 200) {
        setModalInfo({
          title: 'Agendamento efetuado com successo',
          description: `Olá ${receivedData.data.name} seu agendamento foi
            efetuado  com sucesso para a data ${dateOfSchedule}`,
          success: true
        });

        setOpen(true);
      }
  
      clearFields()
    } catch (err) {
      setModalInfo({
        title: 'Ops... Encontramos alguns problemas :(',
        description: err.response.data.errors,
        success: false
      })

      setOpen(true);
    }      
  }

  return (
    <div className="container">
      <h1>Faça seu agendamento</h1>
      <div className="form-container">
        <form onSubmit={(e) => handleSubmit(e)}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Input
                name="name"
                label="Nome"
                onChange={(e) => {setName(e.target.value); setNameError('')}}
                error={nameError}
                value={name}
              />
            </Grid>
            <Grid item xs={6}>
              <Input
                name="cellphone"
                label="Celular"
                onChange={(e) => {setCellphone(e.target.value); setCellphoneError('')}}
                error={cellphoneError}
                value={cellphone}
              />
            </Grid>
            <Grid item xs={6}>  
              <Input
                name="brand"
                label="Marca"
                onChange={(e) => {setBrand(e.target.value); setBrandError('')}}
                error={brandError}
                value={brand}
              />
            </Grid>
            <Grid item xs={6}>
              <section>
                <p>Possui WhatsApp? </p>
                <Switch
                  disabled={cellphone === ''}
                  onChange={(e) => setWhatsapp(e.target.checked)}
                  name="whatsApp"
                  inputProps={{ 'aria-label': 'whatsapp checkbox' }}
                />
              </section>
            </Grid> 
            <Grid item xs={6}>
              <Input
                name="model"
                label="Modelo"
                onChange={(e) => {setModel(e.target.value); setModelError('')}}
                error={modelError}
                value={model}
              />
            </Grid>
            <Grid item xs={6}>
              <Input
                name="year"
                label="Ano"
                onChange={(e) => setYear(e.target.value)}
                value={year}
              />
            </Grid>
            <Grid item xs={6}>
              <Input
                name="licensePlate"
                label="Placa"
                onChange={(e) => {setLicensePlate(e.target.value); setLicensePlateError('')}}
                error={licensePlateError}
                value={licensePlate}
              />
            </Grid>
            <Grid item xs={5}>
              <DateField onChange={(e) => setDate(e.target.value)} />
            </Grid>
            <Grid item xs={6}>
              <button type="submit">Enviar</button> 
            </Grid>
            <Grid item xs={6}>
              <button type="button" value="Limpar" onClick={clearFields}>Limpar</button>
            </Grid>
          </Grid>
        </form>
      </div>
      
      <Modal
        open={open}
        handleClose={() => setOpen(false)}
        description={modalInfo.description}
        title={modalInfo.title}
      />
    </div>
  )
}

export default Form;