import { Selector } from 'testcafe';
import { ComponentIDs, PageIDs } from '../imports/ui/utilities/ids';

class ClubListPage {
  constructor() {
    this.pageId = `#${PageIDs.clubList}`;
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    // This is first test to be run. Wait 10 seconds to avoid timeouts with GitHub Actions.
    await testController.wait(10000).expect(this.pageSelector.exists).ok();
  }

  async editClub(testController) {
    const modifiedClubName = `editClubTest-${new Date().getTime()}`;
    const originalClubName = 'Association for Computing Machinery';
    await testController.click('#editclub-button');
    await testController.typeText(`#${ComponentIDs.editClubName}`, modifiedClubName, { replace: true });
    await testController.click(`#${ComponentIDs.editClubSubmit} input.btn.btn-primary`);
    await testController.click(Selector('.swal-button--confirm'));
    await testController.click(`#${ComponentIDs.clubListMenuItem}`);
    await testController.click(Selector('#card-title').withExactText(modifiedClubName));
    // Undo modifications
    await testController.click('#editclub-button');
    await testController.typeText(`#${ComponentIDs.editClubName}`, originalClubName, { replace: true });
    await testController.click(`#${ComponentIDs.editClubSubmit} input.btn.btn-primary`);
    await testController.click(Selector('.swal-button--confirm'));
    await testController.click(Selector('#card-title').withExactText(originalClubName));
  }

  async gotoClubInfo(testController) {
    await testController.click('#moreinfo-button');
  }
}

export const clubListPage = new ClubListPage();
