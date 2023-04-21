import { Selector } from 'testcafe';
import { ComponentIDs } from '../imports/ui/utilities/ids';

class ClubCard {
  async bookmarkClub(testController) {
    const visible = await Selector(`#${ComponentIDs.basicNavbarNav}`).visible;
    if (!visible) {
      await testController.click('button.navbar-toggler');
    }
    await testController.click(`#${ComponentIDs.loginDropdown}`);
    await testController.click(`#${ComponentIDs.loginDropdownSignIn}`);
  }
}
export const clubCard = new ClubCard();
