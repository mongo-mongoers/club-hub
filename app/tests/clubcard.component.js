import { Selector } from 'testcafe';
import { ComponentIDs } from '../imports/ui/utilities/ids';

class ClubCard {
  async bookmarkClub(testController) {
    const visible = await Selector(`#${ComponentIDs.basicNavbarNav}`).visible;
    if (!visible) {
      await testController.click('button.navbar-toggler');
    }
    const bookmarkSelector = Selector('#bookmark-button');
    await testController.click(bookmarkSelector().nth(0));
  }

  async editClub(testController) {
    const visible = await Selector(`#${ComponentIDs.basicNavbarNav}`).visible;
    if (!visible) {
      await testController.click('button.navbar-toggler');
    }
    const editSelector = Selector('#editclub-button');
    await testController.click(editSelector().nth(0));
  }
}
export const clubCard = new ClubCard();
