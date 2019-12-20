/// <reference types="Cypress" />

var namen = ['jonah desmet', 'lucas vermeulen', 'nicolas planckaer', 'nicolas planckaer'];
var ateliers = ['bib', 'crea', 'feest', 'koken'];

describe('end-to-end', function () {
  it('changes planning users affects pictoagenda', function () {
    namen.forEach(function (naam, index) {
      cy.visit('http://localhost:4200/login');
      cy.get('#emailInvullen').click();
      cy.get('#emailInvullen').type('jonahdesmet@hotmail.com');
      cy.get('#password').click();
      cy.get('#password').type('password1010');
      cy.get('#login').click();
      cy.get('p.success').should('be.empty');
      cy.url().should('eq', 'http://localhost:4200/');
      cy.get('#btnDagplanningAanpassen').click();
      cy.get('#atelierToevoegen').click();
      cy.get('#atelierNaamInput').type(ateliers[index]);
      cy.get('#gebruikerToevoegenLijst').click();
      cy.get('#gebruikerToevoegenLijst').type(namen[index]);
      cy.get('#addGebruiker').click();
      cy.get('#dagMomentSelect').select("Voormiddag");
      cy.get('#atelierOpslaan').click();
      cy.wait(1500);
      cy.get('#atelierPlanning').should('exist');
      cy.get('.dagmoment').contains(ateliers[index]);
      cy.visit('http://localhost:4200/picto-clientenlijst');
      cy.get('#clientNaam').children().contains(namen[index]).click({
        force: true
      });
      cy.get('.yellow')
        .children().first()
        .children().first()
        .children().first()
        .children().eq(2)
        .children().first()
        .children().last()
        .children().first()
        .should('have.attr', 'src', 'https://kolveniershof3punt2.azurewebsites.net/pictos/' + ateliers[index] + '.jpg');
      cy.visit('http://localhost:4200/');
      cy.get('#btnDagplanningAanpassen').click();
      cy.get('.dagmoment').contains(ateliers[index]).parent().find('a').click({
        force: true
      });
    })
  });


  it('add gebruiker', function () {
    cy.visit('http://localhost:4200/login');
    cy.get('#emailInvullen').click();
    cy.get('#emailInvullen').type('jonahdesmet@hotmail.com')
    cy.get('#password').click();
    cy.get('#password').type('password1010')
    cy.get('#login').click();
    cy.get('p.success').should('be.empty')
    cy.url().should('eq', 'http://localhost:4200/');
    cy.get('#beheer-personen').click();
    cy.url().should('eq', 'http://localhost:4200/beheer-personen');
    cy.get('#nieuweGebruiker').click();
  });

});
