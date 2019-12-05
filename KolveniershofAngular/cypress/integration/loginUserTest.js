/// <reference types="Cypress" />

describe('login', function() {

  it('default screen without actions', function() {
    cy.visit('http://localhost:4200/login')
    cy.get('#login').should('exist');
    cy.get('p.success').should('be.empty')
  });

  it('with empty fields', function() {
    cy.visit('http://localhost:4200/login')
    cy.get('#login').click();
    cy.get('p.success').contains('Gelieve een wachtwoord en/of gebruikersnaam in te vullen') ;
  });
});

