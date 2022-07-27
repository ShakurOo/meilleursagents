/* eslint-disable cypress/no-unnecessary-waiting */
/* eslint-disable cypress/no-force */
describe('Navigation', () => {
  beforeEach(() => {
    cy.intercept({ method: 'GET', url: '/realtors/*/messages/*' }).as('getMessages');
    cy.visit('/');
  });

  it('should display the details of the message', () => {
    cy.log('**Check if messages has been fetched**');
    cy.wait('@getMessages');
    cy.get("[data-testid='item-link']").its('length').should('be.gte', 0);

    cy.wait(500);

    cy.log('**Open the second message from the list**');
    cy.get("[data-testid='item-link']").eq(1).click({ force: true });

    cy.wait(250);
    cy.log(
      '**Scroll into the list of messages and wait until the new messages are fetched**',
    );
    cy.get("[data-testid='list-view'] .list").scrollTo(0, 660);
    cy.wait('@getMessages');

    cy.wait(250);
    cy.log(
      '**Scroll into the list of messages and wait until the new messages are fetched**',
    );
    cy.get("[data-testid='list-view'] .list").scrollTo(0, 2000);
    cy.wait('@getMessages');

    cy.wait(1000);
    cy.log('**Open a deeper message from the list**');
    cy.get("[data-testid='item-link']").eq(2).click({ force: true });

    cy.wait(1000);
    cy.log('**Update the viewport and navigate back to the list of messages view**');
    cy.viewport('iphone-6+');

    cy.wait(500);
    cy.get("[data-testid='back-button']").click();

    cy.viewport('macbook-16');

    cy.wait('@getMessages');
    cy.get("[data-testid='list-view'] .list").scrollTo(0, 0);

    cy.wait(1000);
    cy.log('**Changes the realtor and check if messages has been fetched**');
    cy.get("[data-testid='realtors-select']").click();

    cy.wait(250);
    cy.get("[data-value='102']").click();

    cy.wait(250);
    cy.get("[data-testid='item-link']").eq(4).click({ force: true });

    cy.intercept({ method: 'GET', url: '/realtors/*/messages/*' }, []).as('getMessages');

    cy.get("[data-testid='realtors-select']").click();

    cy.wait(250);
    cy.get("[data-value='103']").click();

    cy.wait(250);
    cy.get("[data-testid='item-link']").should('not.exist');
  });
});

export {};
