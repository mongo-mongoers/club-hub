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
    const name = `testName-${new Date().getTime()}`;
    const abbreviation = 'TST';
    const description = 'test description';
    const goals = 'test goals';
    const email = `user-${new Date().getTime()}@foo.com`;
    const logo = 'https://cdn.pixabay.com/photo/2016/01/03/11/24/gear-1119298_960_720.png';
    await this.isDisplayed(testController);
    // Define the new project
    await testController.typeText(`#${ComponentIDs.createClubFormName}`, name);
    await testController.typeText(`#${ComponentIDs.createClubFormAbbreviation}`, abbreviation);
    await testController.typeText(`#${ComponentIDs.createClubFormDescription}`, description);
    await testController.typeText(`#${ComponentIDs.createClubFormGoals}`, goals);
    await testController.typeText(`#${ComponentIDs.createClubFormEmail}`, email);
    await testController.typeText(`#${ComponentIDs.createClubFormLogo}`, logo);

    // Select two club topics
    const topicSelector = Selector(`#${ComponentIDs.createClubFormTopics} option`);
    await testController.click(topicSelector.nth(1));
    await testController.click(topicSelector.nth(2));
    // Submit
    await testController.click(`#${ComponentIDs.createClubFormSubmit}`);
  }
}

export const createClubPage = new CreateClubPage();
