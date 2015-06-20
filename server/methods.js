Meteor.methods({
	'addStudent': function (student) {
		student.createdOn = Date.now();
		Students.insert(student);
	}
});