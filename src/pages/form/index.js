import React, { Component } from 'react';
import api from '../../services/api';

import DateField from '../../components/date';
import Switch from '@material-ui/core/Switch';
import SuccessModal from '../../components/successModal';

import './styles.css';

export default class form extends Component {

  constructor(props) {
    super(props);
    this.today = new Date();

    this.baseState = {
      name: '',
      cellphone: '',
      whatsapp: false,
      brand: '',
      model: '',
      year: '',
      licensePlate: '',
      date: new Date(),
      context: {},
      open: false,
      success: {
        title: '',
        description: ''
      }
    }
    this.state = this.baseState;

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeCellphone = this.onChangeCellphone.bind(this);
    this.onChangeWhatsapp = this.onChangeWhatsapp.bind(this);
    this.onChangeBrand = this.onChangeBrand.bind(this);
    this.onChangeModel = this.onChangeModel.bind(this);
    this.onChangeYear = this.onChangeYear.bind(this);
    this.onChangeLicensePlate = this.onChangeLicensePlate.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onReset = this.onReset.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  onChangeName(e) {
    this.setState({ name: e.target.value })
  }

  onChangeCellphone(e) {
    this.setState({ cellphone: e.target.value })
  }

  onChangeWhatsapp(e) {
    this.setState({ whatsapp: e.target.checked })
  }
  onChangeBrand(e) {
    this.setState({ brand: e.target.value })
  }

  onChangeModel(e) {
    this.setState({ model: e.target.value })
  }

  onChangeYear(e) {
    this.setState({ year: e.target.value })
  }
  onChangeLicensePlate(e) {
    this.setState({ licensePlate: e.target.value })
  }

  onChangeDate(e) {
    this.setState({ date: e.target.value })
  }

  onReset(e) {
    this.setState(this.baseState);
  }

  handleClose() {
    this.setState({ open: false });
  }

  async onSubmit(e) {
    e.preventDefault();

    const scheduleObj = {
      name: this.state.name,
      cellphone: this.state.cellphone,
      whatsapp: this.state.whatsapp,
      brand: this.state.brand,
      model: this.state.model,
      licensePlate: this.state.licensePlate,
      date: this.state.date,
      year: this.state.year,
      context: this.state.context
    };

    try {
      const response = await api.post('schedule', scheduleObj);
      const receivedData = response.data;
      const dateOfSchedule = (receivedData.data.date).split('T')[0];

      this.setState({ context: receivedData });

      if (response.status === 200) {
        this.setState({
          success: {
            title: 'Agendamento efetuado com successo',
            description: `Seu agendamento foi efetuado para a data ${dateOfSchedule}`
          }
        })
      }

      this.setState({ open: true });
    } catch (err) {
      this.setState({
        success: {
          title: 'Ops... Encontramos alguns problemas :(',
          description: err.response.data.errors
        }
      })

      this.setState({ open: true });
    }
  }

  render() {
    return (
      <>
        <form onSubmit={this.onSubmit}>
          <fieldset>
            <legend>Novo agendamento</legend>
            <div className="form">
              <section className="field-1">
                <input type="text" value={this.state.name}
                  onChange={this.onChangeName} placeholder="Nome Completo*" required />
                <input type="text" value={this.state.cellphone}
                  onChange={this.onChangeCellphone} placeholder="Celular (99) 99999-9999"
                />
              </section>
              <section className="field-2">
                {this.state.cellphone !== '' && (
                  <section>
                    <p>Possui WhatsApp?: </p>
                    <Switch
                      checked={this.state.whatsapp}
                      onChange={this.onChangeWhatsapp}
                      name="whatsApp"
                      inputProps={{ 'aria-label': 'whatsapp checkbox' }}
                    />
                  </section>
                )}
              </section>
              <section className="field-3">
                <input type="text" value={this.state.brand}
                  onChange={this.onChangeBrand} placeholder="Marca*" required />
                <input type="text" value={this.state.model}
                  onChange={this.onChangeModel} placeholder="Modelo*" required />
              </section>
              <section className="field-4">
                <input type="text" value={this.state.year}
                  onChange={this.onChangeYear} placeholder="Ano" />
                <input type="text" value={this.state.licensePlate}
                  onChange={this.onChangeLicensePlate} placeholder="Placa *" required />
              </section>
              <DateField value={this.state.date} min={this.today} onChange={(e) => { this.onChangeDate(e) }} />
              <br />
              <br />
              <section className="buttons">
                <button type="submit">Enviar</button>
                <button type="button" value="Limpar"
                  onClick={this.onReset}>Limpar</button>
              </section>
                * Campos obrigatórios
              </div>
          </fieldset>
        </form>

        <SuccessModal
          open={this.state.open}
          handleClose={() => { this.handleClose() }}
          description={this.state.success.description}
          title={this.state.success.title}
        />
      </>
    );
  }
}