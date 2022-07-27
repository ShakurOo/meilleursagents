describe('Redirections', () => {
  describe('When visits the app', () => {
    it('with "/" url should redirects to "/realtors/101"', () => {
      cy.visit('/');
      cy.location('pathname').should('eq', '/realtors/101');
    });

    it('with "/realtors" url should redirects to "/realtors/101"', () => {
      cy.visit('/realtors');
      cy.location('pathname').should('eq', '/realtors/101');
    });

    it('with "/realtors/101/messages" url should redirects to "/realtors/101"', () => {
      cy.visit('/realtors/101/messages');
      cy.location('pathname').should('eq', '/realtors/101');
    });

    it('with "/i-hope-ill-work-at-meilleurs-agents" should redirects to "/realtors/101"', () => {
      cy.visit('/i-hope-ill-work-at-meilleurs-agents');
      cy.location('pathname').should('eq', '/realtors/101');
    });
  });

  describe('When ids in urls are valide', () => {
    describe('Visits the list page', () => {
      it('with "/realtors/101" url should not redirect', () => {
        cy.visit('/realtors/101');
        cy.location('pathname').should('eq', '/realtors/101');
      });
    });

    describe('Visits the details page', () => {
      it('with "/realtors/101/messages/10199" url should not redirect', () => {
        cy.visit('/realtors/101/messages/10199');
        cy.location('pathname').should('eq', '/realtors/101/messages/10199');
      });
    });
  });

  describe('When ids in urls are invalide', () => {
    describe('Visits the list page', () => {
      it('with wrong "/realtors/XXX" url should redirects to "/realtors/101"', () => {
        cy.visit('/realtors/XXX');
        cy.location('pathname').should('eq', '/realtors/101');
      });
    });

    describe('Visits the details page', () => {
      it('with wrong "/realtors/101/messages/XXX" url should redirects to "/realtors/101"', () => {
        cy.visit('/realtors/101/messages/XXX');
        cy.location('pathname').should('eq', '/realtors/101');
      });
    });
  });
});

describe('Responsive behavior', () => {
  describe('When the viewport is large', () => {
    describe('Visits the list page', () => {
      it('should display both message list and details', () => {
        cy.visit('/realtors/101');
        cy.get("[data-testid='list-view-wrapper']").should('be.exist');
        cy.get("[data-testid='details-view-wrapper']").should('be.exist');
      });
    });

    describe('Visits the details page', () => {
      it('should display both message list and details', () => {
        cy.visit('/realtors/101/messages/10199');
        cy.get("[data-testid='list-view-wrapper']").should('be.exist');
        cy.get("[data-testid='details-view-wrapper']").should('be.exist');
      });
    });
  });

  describe('When the viewport is small', () => {
    describe('Visits the list page', () => {
      it('should display only message list', () => {
        cy.viewport('iphone-6+');
        cy.visit('/realtors/101');
        cy.get("[data-testid='list-view-wrapper']").should('be.exist');
        cy.get("[data-testid='details-view-wrapper']").should('not.be.exist');
      });
    });

    describe('Visits the details page', () => {
      it('should display only message details', () => {
        cy.viewport('iphone-6+');
        cy.visit('/realtors/101/messages/10199');
        cy.get("[data-testid='list-view-wrapper']").should('not.be.exist');
        cy.get("[data-testid='details-view-wrapper']").should('be.exist');
      });
    });
  });

  describe('When the viewport changes', () => {
    it('Should adjust the responsive behavior', () => {
      cy.viewport('iphone-6+');
      cy.visit('/realtors/101/messages/10199');

      cy.get("[data-testid='list-view-wrapper']").should('not.be.exist');
      cy.get("[data-testid='details-view-wrapper']").should('be.exist');

      cy.viewport('macbook-16');
      cy.get("[data-testid='list-view-wrapper']").should('be.exist');
      cy.get("[data-testid='details-view-wrapper']").should('be.exist');
    });
  });
});

export {};
