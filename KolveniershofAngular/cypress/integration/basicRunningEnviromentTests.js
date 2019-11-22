/// <reference types="Cypress" />

describe('Runs the enviroment?', function() {
  it('the app effectivly runs', function() {
    cy.visit('http://localhost:4200');
  });
});