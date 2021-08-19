/// <reference types="cypress" />

context('Assertions', () => {
  before(() => {
    cy.visit('localhost:5500')
  })

  describe('buttonss', () => {
    it('Ajustar', () => {
      cy.get('#start')
      .should('have.text', 'Iniciar nuevo partido')
      .should("not.be.disabled")

      cy.get('#deal')
      .should('have.text', 'Repartir mano')
      .should("be.disabled")

      cy.get('#change')
      .should('have.text', 'Cambiar cartas')
      .should("be.disabled")

      cy.get('#score')
      .should('have.text', 'Mostrar cartas y puntaje')
      .should("be.disabled")

      cy.get('#close')
      .should('have.text', 'Cerrar mano')
      .should("be.disabled")

      cy.get('#rules')
      .should('have.text', 'Mostrar Reglas')
      .should("not.be.disabled")
      .click()
      cy.on('window:alert', message => expect(message).to.match(/los puntajes/));    }

    )})

  })
