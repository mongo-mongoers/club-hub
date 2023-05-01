import { Selector } from 'testcafe';
import { ComponentIDs, PageIDs } from '../imports/ui/utilities/ids';

class AddEventPage {
  constructor() {
    this.pageId = `#${PageIDs.addEventPage}`;
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  async addEvent(testController) {
    const name = `event-${new Date().getTime()}`;
    const description = 'test description for events';
    const date = '01/01/23';
    const email = `user-${new Date().getTime()}@foo.com`;
    const location = 'test location for events';
    await this.isDisplayed(testController);
    // Define the new project
    await testController.typeText(`#${ComponentIDs.addEventFormName}`, name);
    await testController.typeText(`#${ComponentIDs.addEventFormDescription}`, description);
    await testController.typeText(`#${ComponentIDs.addEventFormDate}`, date);
    await testController.typeText(`#${ComponentIDs.addEventFormEmail}`, email);
    await testController.typeText(`#${ComponentIDs.addEventFormLocation}`, location);

    // Select two club topics
    const topicSelector = Selector(`#${ComponentIDs.createClubFormTopics} option`);
    await testController.click(topicSelector.nth(1));
    await testController.click(topicSelector.nth(2));
    // Submit
    await testController.click(`#${ComponentIDs.createClubFormSubmit} input.btn.btn-primary`);
    await testController.click(Selector('.swal-button--confirm'));
    await testController.click(`#${ComponentIDs.clubListMenuItem}`);
    await testController.click(Selector('#card-title').withExactText(name));
  }
}

export const addEventPage = new AddEventPage();
