import LoginScreen from './screens/login-screen';
import PersonsScreen from './screens/persons-screen';
import SettingsScreen from './screens/settings-screen';
import ScoresheetsScreen from './screens/scoresheets-screen';
import CategoriesScreen from './screens/categories-screen';

const routes = {
	Login: {
		screen: LoginScreen
	},
	Persons: {
		screen: PersonsScreen
	},
	Settings: {
		screen: SettingsScreen
	},
	Scoresheets: {
		screen: ScoresheetsScreen
	},
	Categories: {
		screen: CategoriesScreen
	}
};

export default routes;