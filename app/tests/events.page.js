import { Selector } from 'testcafe';
import { PageIDs } from '../imports/ui/utilities/ids';

class EventsPage {
  constructor() {
    this.pageId = `#${PageIDs.eventsPage}`;
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    // This is first test to be run. Wait 10 seconds to avoid timeouts with GitHub Actions.
    await testController.wait(10000).expect(this.pageSelector.exists).ok();
  }

  async eventCount(testController) {
    const cardCount = Selector('h5').count;
    await testController.expect(cardCount).eql(1);
  }
}

export const eventsPage = new EventsPage();
