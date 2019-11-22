/// <reference types="Cypress" />

describe('dagplanning', function() {
  var monthNames = [
    "januari", "februari", "maart",
    "april", "mei", "juni", "juli",
    "augustus", "september", "oktober",
    "november", "december"
  ];

  var dayNames = [
    "maandag", "dinsdag", "woensdag",
    "donderdag", "vrijdag", "zaterdag", "zondag"
  ];

 it('browser gets loaded', function() {
    cy.visit('http://localhost:4200');
    cy.get('#btnDagplanningAanpassen').should('not.be.disabled');
    cy.get('#btnDagplanning').should('have.class', 'geselecteerd')
    cy.get('#btnOpmerkingen').should('not.have.class', 'geselecteerd')
  });

  it('changes day backward', function() {
    cy.visit('http://localhost:4200');
    cy.get('#vorigeDatum').click()
    var vandaag = new Date()
    vandaag.setDate(vandaag.getDate() - 1);
    var dayIndex = vandaag.getDay();
    var dagDatum = vandaag.getDate();
    var monthIndex = vandaag.getMonth();
    var year = vandaag.getFullYear();
    var stringDatum =  dayNames[dayIndex - 1] + ' ' + dagDatum +' ' + monthNames[monthIndex] + ' ' + year;
    cy.get('.datum').contains(stringDatum);
  });

  it('changes day forward', function() {
    cy.visit('http://localhost:4200');
    cy.get('#volgendeDatum').click()
    var vandaag = new Date()
    vandaag.setDate(vandaag.getDate() + 1);
    var dayIndex = vandaag.getDay();
    var dagDatum = vandaag.getDate();
    var monthIndex = vandaag.getMonth();
    var year = vandaag.getFullYear();
    var stringDatum =  dayNames[dayIndex - 1] + ' ' + dagDatum +' ' + monthNames[monthIndex] + ' ' + year;
    cy.get('.datum').contains(stringDatum);
  });

  it('loads on today', function() {
    cy.visit('http://localhost:4200');
    cy.get('.datum').should('not.be.empty');
    var vandaag = new Date()
    var dayIndex = vandaag.getDay();
    var dagDatum = vandaag.getDate();
    var monthIndex = vandaag.getMonth();
    var year = vandaag.getFullYear();
    var stringDatum =  dayNames[dayIndex - 1] + ' ' + dagDatum +' ' + monthNames[monthIndex] + ' ' + year;
    cy.get('.datum').contains(stringDatum);
  });

  it('goes to opmerkingen', function() {
    cy.visit('http://localhost:4200');
    cy.get('#btnOpmerkingen').click();
    cy.url().should('eq', 'http://localhost:4200/');
    cy.get('#btnDagplanningAanpassen').should('be.disabled');
    cy.get('#btnDagplanning').should('not.have.class', 'geselecteerd')
    cy.get('#btnOpmerkingen').should('have.class', 'geselecteerd')
  });

  it('loads volledigedag', function() {
    cy.visit('http://localhost:4200');
    cy.get('#volledigeDag').should('exist');
    cy.get('#specialeAteliers').should('not.exist');
  });

  it('loads voormiddag ', function() {
    cy.visit('http://localhost:4200');
    cy.get('#voormiddag').should('exist');
    cy.get('#specialeAteliers').should('not.exist');
  });

  it('loads namiddag ', function() {
    cy.visit('http://localhost:4200');
    cy.get('#namiddag').should('exist');
    cy.get('#specialeAteliers').should('not.exist');
  });


it('changes to Toon afwezigheden, ziektes, vervoer', function() {
  cy.visit('http://localhost:4200');
  cy.get('#afwezigheden').click();
  cy.get('#volledigeDag').should('not.exist');
  cy.get('#voormiddag').should('not.exist');
  cy.get('#namiddag').should('not.exist');
  cy.get('#specialeAteliers').should('exist');
});



});

