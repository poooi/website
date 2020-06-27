describe('site navigation', () => {
  it('downloads', () => {
    cy.visit('/')

    cy.get('#header nav').should('be.visible')

    cy.get('#header nav .bp3-button').first().click()
    cy.location('pathname').should('equal', '/')

    cy.get('#header nav .bp3-button').eq(1).click()
    cy.location('pathname', { timeout: 10000 }).should('equal', '/explore')

    cy.get('#header nav .bp3-button').eq(2).click()
    cy.location('pathname', { timeout: 10000 }).should('equal', '/downloads')
  })
})
