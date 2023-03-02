const { Country, Activities, conn } = require('../../src/db.js');
const { expect } = require('chai');
const axios = require('axios');
const { fullDataBase } = require('../../src/controllers/dataBaseController');

describe('Country model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Country.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Country.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Country.create({ name: 'Argentina' });
      });
    });
  });
});

//            COUNTRY           //
const baseURL = "https://restcountries.com/v3/all";

describe('probando countriesHandler', () => {
  it('Debe retornar todos los countries de la Database', async () => {
    const res = await axios.get(baseURL);
    expect(res.status).to.equal(200);
    expect(res.data).to.be.an('array');
    res.data.forEach(country => {
      expect(country).to.have.property('name');
    });
  });

  it('Debe retornar un país específico de la Database', async () => {
    const res = await axios.get(`https://restcountries.com/v3/name/argentina`);
    expect(res.status).to.equal(200);
    expect(res.data[0]).to.be.an('object');
    expect(res.data[0]).to.have.property('name');
    expect(res.data[0]).to.have.property('capital');
    expect(res.data[0]).to.have.property('population');
  });

  it('Debe retonar un mensaje si el país no es encontrado', async () => {
    try {
      await axios.get(`${baseURL}/100`);
    } catch (error) {
      expect(error.response.status).to.equal(404);
      expect(error.response.data).to.be.an('object');
      expect(error.response.data).to.have.property('message');
      expect(error.response.data.message).to.equal('Page Not Found');
    }
  });
});

//            DATA BASE           //
describe('Testeo y control la base de datos', () => {
  it('Debe verificar si retorna la info desde la base de datos', async () => {
    const countriesInformation = await fullDataBase(); //con este testing verificamos si  
    expect(countriesInformation).to.be.an('array');  // efectivamente estamos tomando
    expect(countriesInformation[0]).to.have.property('name');  //bien la data de la api.
    expect(countriesInformation[0]).to.have.property('flag');
    expect(countriesInformation[0]).to.have.property('capital');
    expect(countriesInformation[0]).to.have.property('continent');
    expect(countriesInformation[0]).to.have.property('subregion');
    expect(countriesInformation[0]).to.have.property('area');
    expect(countriesInformation[0]).to.have.property('population');
  });
});
describe('Testeando que ingrese la apiData en la DB', () => {
  beforeEach(async () => {
      await Country.destroy({ where: {} });
      const countries = await fullDataBase();
      expect(countries.length).to.be.above(1);
  });

  it('Debería guardar la data de la API en la DB', async () => {
      const countries = await fullDataBase();
      const allCountries = await Country.findAll();
      expect(allCountries.length).to.equal(countries.length);
  });
});
