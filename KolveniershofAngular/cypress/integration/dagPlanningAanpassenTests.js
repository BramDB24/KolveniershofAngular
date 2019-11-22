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
      });*/

      it('shows the edit component', function() {
        cy.visit('http://localhost:4200');
        cy.get('#btnDagplanningAanpassen').click();
        cy.get('#editDagplanningKader').should('exist');
      });


  
  });
  
  