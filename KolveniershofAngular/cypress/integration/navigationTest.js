/// <reference types="Cypress" />

describe('navigation bar', function() {
  it('goes to pictoagenda', function() {
  cy.visit('http://localhost:4200');
  cy.get('#picto-agendas').click();
  cy.url().should('eq', 'http://localhost:4200/picto-agenda');
});

it('goes to beheer personen', function() {
  cy.visit('http://localhost:4200');
  cy.get('#beheer-personen').click();
  cy.url().should('eq', 'http://localhost:4200/register-gebruiker');
});

it('goes to 4-weekse planning', function() {
  cy.visit('http://localhost:4200');
  cy.get('#4-weekse-planning').click();
  cy.url().should('eq', 'http://localhost:4200/vierweekse-planning');
});

it('goes to beheer ateliers', function() {
  cy.visit('http://localhost:4200');
  cy.get('#beheer-ateliers').click();
  cy.url().should('eq', 'http://localhost:4200/ateliers');
});

it('goes to aanwezigheden', function() {
  cy.visit('http://localhost:4200');
  cy.get('#aanwezigheden').click();
  cy.url().should('eq', 'http://localhost:4200/aanwezigheden');
});

it('goes to login', function() {
  cy.visit('http://localhost:4200');
  cy.get('#aanmelden').click();
  cy.url().should('eq', 'http://localhost:4200/login');
});




});