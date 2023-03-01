/// <reference types="cypress" />

describe('Student Registration page', () => {
  let user;

  before(() => {
    cy.visit('/');
    cy.task('generateUser').then(generateUser => {
      user = generateUser;
    });
  });

  it('should register a new student', () => {
    cy.findByPlaceholder('First Name')
      .type(user.firstName);
    cy.findByPlaceholder('Last Name')
      .type(user.lastName);
    cy.get('#userEmail')
      .type(user.email);
    cy.contains('.custom-control-label', user.gender)
      .click();
    cy.findByPlaceholder('Mobile Number')
      .type(user.mobileNumber);
    // cy.get('#dateOfBirthInput')
    //   .type('{selectall}23 Oct 1991{enter}');
    cy.get('#dateOfBirthInput')
      .click()
    cy.pickDate('month-select')
      .select(user.birth.month);
    cy.pickDate('year-select')
      .select(`${user.birth.year}`);
    cy.pickDate('day')
      .contains(user.birth.day).click();
    cy.get('.subjects-auto-complete__value-container')
      .type('en{enter}' + 'phy{enter}');
    cy.contains('.custom-control-label', user.hobby)
      .click();
    cy.findByPlaceholder('Current Address')
      .type(user.address);
    cy.get('#state')
      .type('{downarrow}{enter}');
    cy.get('#city')
      .type('{downarrow}{enter}');
    cy.contains('#submit', 'Submit')
      .click();
    cy.contains('tr', 'Student Name')
      .should('contain', user.firstName)
      .and('contain', user.lastName);
    cy.contains('tr', 'Student Email')
      .should('contain', user.email);
    cy.contains('tr', 'Gender')
      .should('contain', user.gender);
    cy.contains('tr', 'Mobile')
      .should('contain', user.mobileNumber);
    cy.contains('tr', 'Date of Birth')
      .should('contain', user.birth.year)
      .and('contain', user.birth.month)
      .and('contain', user.birth.day);
    cy.contains('tr', 'Subject')
      .should('contain', 'English');
    cy.contains('tr', 'Hobbies')
      .should('contain', user.hobby);
    cy.contains('tr', 'Address')
      .should('contain', user.address);
    cy.contains('tr', 'State and City')
      .should('contain', 'Uttar Pradesh')
      .and('contain', 'Lucknow');
  });
});

// cypress.config.js

const { defineConfig } = require('cypress');
const faker = require('faker');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://demoqa.com/automation-practice-form',
    viewportHeight: 1080,
    viewportWidth: 1320,
    setupNodeEvents(on, config) {
      on("task", {
        generateUser() {
          randomIndex = Math.floor(Math.random() * 2);
          genders = ['Male', 'Female', 'Other'];
          hobbies = ['Sports', 'Reading', 'Music'];
          return {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
            mobileNumber: faker.phone.phoneNumber('##########'),
            password: '12345Qwert!',
            gender: genders[randomIndex],
            birth: {
              year: Math.floor(2000 + Math.random() * 20),
              month: faker.date.month(),
              day: Math.ceil(Math.random() * 29)
            },
            hobby: hobbies[randomIndex],
            address: faker.address.streetAddress()
          };
        },
      });
    },
  },
});
