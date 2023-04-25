import { Selector } from 'testcafe';
import { ComponentIDs, PageIDs } from '../imports/ui/utilities/ids';

class CreateClubPage {
  constructor() {
    this.pageId = `#${PageIDs.createClubPage}`;
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  async addClub(testController) {
    const name = `radgrad-${new Date().getTime()}`;
    const abbreviation = 'TST';
    const description = 'test description';
    const goals = 'test goals';
    const email = `user-${new Date().getTime()}@foo.com`;
    await this.isDisplayed(testController);
    // Define the new project
    await testController.typeText(`#${ComponentIDs.createClubFormName}`, name);
    await testController.typeText(`#${ComponentIDs.createClubFormAbbreviation}`, abbreviation);
    await testController.typeText(`#${ComponentIDs.createClubFormDescription}`, description);
    await testController.typeText(`#${ComponentIDs.createClubFormGoals}`, goals);
    await testController.typeText(`#${ComponentIDs.createClubFormEmail}`, email);

    // Select two interests.
    const interestsSelector = Selector(`#${ComponentIDs.addProjectFormInterests} div.form-check input`);
    await testController.click(interestsSelector.nth(0));
    await testController.click(interestsSelector.nth(8));

    await testController.click(`#${ComponentIDs.addProjectFormSubmit} input.btn.btn-primary`);
    await testController.click(Selector('.swal-button--confirm'));
  }
}

export const createClubPage = new CreateClubPage();
