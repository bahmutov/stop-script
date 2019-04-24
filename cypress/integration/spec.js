// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="Cypress" />

it.skip('loads and crashes', () => {
  cy.visit('index.html')
})

it('loads, stops script and is fine', () => {
  cy.visit('index.html', {
    onBeforeLoad (win) {
      const original = win.document.head.appendChild
      cy.stub(win.document.head, 'appendChild').callsFake(child => {
        if (
          child.type === 'text/javascript' &&
          child.innerHTML.includes('about to blow')
        ) {
          // do not include this script
          return
        }
        original(child)
      })
    }
  })
})
