/// <reference types="Cypress" />

describe('dagplanning', function() {
   /*it('gets loaded', function() {
      cy.visit('http://localhost:4200');
      cy.get('#btnDagplanningAanpassen').click();
    });

    it('show its buttons right', function() {
        cy.visit('http://localhost:4200');
        cy.get('#btnDagplanningAanpassen').click();
        cy.get('#btnDagplanning').should('not.have.class', 'geselecteerd')
        cy.get('#btnOpmerkingen').should('not.have.class', 'geselecteerd')
        cy.get('#btnDagplanningAanpassen').should('have.class', 'geselecteerd')
      });

      it('shows the edit component', function() {
        cy.visit('http://localhost:4200');
        cy.get('#btnDagplanningAanpassen').click();
        cy.get('#editDagplanningKader').should('exist');
      });

      it('shows the edit component', function() {
        cy.visit('http://localhost:4200');
        cy.get('#btnDagplanningAanpassen').click();
        cy.get('#addAtelier').should("not.exist")
        cy.get('#atelierToevoegen').click();
        cy.get('#addAtelier').should("exist")
      });*/


      it('throws an error when adding without atelier', function() {
        cy.visit('http://localhost:4200');
        cy.get('#btnDagplanningAanpassen').click();
        cy.get('#atelierToevoegen').click();
        cy.get('#atelierOpslaan').click();
        cy.get('#atelierOpslaanError').contains(" Voeg een atelier naam toe ")
      });

      it('throws an error when adding gebruiker without selected', function() {
        cy.visit('http://localhost:4200');
        cy.get('#btnDagplanningAanpassen').click();
        cy.get('#atelierToevoegen').click();
        cy.get('#addGebruiker').click();
        cy.get('#addGebruikerError').contains(" Gelieve een gebruiker te selecter ")
      });

      



  
  });
  
  