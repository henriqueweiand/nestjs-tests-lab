/// <reference types="cypress" />

describe('example to-do app', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('displays two todo items by default', () => {
    cy.get('[data-testid="email"]').type("test@gmail.com");
    cy.get('[data-testid="from"]').select(1);
    cy.get('[data-testid="to"]').select(2);
    cy.get('[data-testid="amount"]').type(100);
    cy.get('[data-testid="comment"]').type("my comment");
    
    cy.get('[data-testid="submit"]').click()
    cy.get('[data-testid="alert"]').should('not.exist')
    cy.contains('Your order was received')
  })

  it('should show an error message if any field is missing', () => {
    cy.get('[data-testid="submit"]').click()
    cy.get('[data-testid="alert"]').should('be.visible')
    cy.contains('Fill out all the fields')
  })

})
