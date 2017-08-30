import FirebaseManager from '../utils/firebase-manager';

class ScoresheetService {

	constructor(db) {
		this.db = db;
	}

	async loadScoresheet(scoresheetId) {
		const scoresheet = {};

		const persons = await this.loadPersons(scoresheetId);

		for(let person of persons) {
			person.pluses = 0;
			person.minuses = 0;

			const categories = await this.loadCategories(person.$id);

			for(let category of categories) {
				const grades = await this.loadGrades(category.$id);
				category.grades = grades;

				this.calculateScore(category, grades);

				person.pluses += category.pluses;
				person.minuses += category.minuses;
			}

			person.categories = categories;
		}

		scoresheet.persons = persons;

		return scoresheet;
	}

	calculateScore(target, grades) {
		target.pluses = 0;
		target.minuses = 0;

		return grades.reduce((result, grade) => {
			if (grade.value > 0) {
				result.pluses ++;
			} else {
				result.minuses ++;
			}
			return result;
		}, target);
	}

	loadPersons(scoresheetId) {
		const queryParam = { paramName: 'scoresheetId', paramValue: scoresheetId };
		return this._queryDb('persons', queryParam);
	}

	loadCategories(personId) {
		const queryParam = { paramName: 'personId', paramValue: personId };
		return this._queryDb('categories', queryParam);
	}

	loadGrades(categoryId) {
		const queryParam = { paramName: 'categoryId', paramValue: categoryId };
		return this._queryDb('grades', queryParam);
	}

	_queryDb(path, { paramName, paramValue }) {
		return this.db.query(path).where(paramName, paramValue).asList()
	}

}

export default new ScoresheetService(FirebaseManager.instance());
