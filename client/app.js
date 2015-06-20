var studentsLoaded = false;

Meteor.subscribe('students', function () {
	studentsLoaded = true;
});

Meteor.startup(function () {
	var students = Students.find({});
	students.observe({
		added: function (student) {
			if (studentsLoaded) {
				$('#notification').show().delay(5000).fadeOut();
				Session.set('addedStudent', student._id);
			}
		}
	});
})

Template.addstudent.events({
	'click input#addstudent': function (e) {
		e.preventDefault();
		var student = {};
		student.name = $("input[name='name']").val();
		student.phone = $("input[name='phone']").val();
		student.class = $("input[name='class']").val();
		student.city = $("input[name='city']").val();

		$('#addstudentForm')[0].reset();

		Meteor.call('addStudent', student);
	}
});

Template.liststudent.onCreated(function () {
	Session.set('sortquery', {name: 1});
});

Template.student.onRendered(function () {
		if (typeof Session.get('addedStudent') !== 'undefined' 
			&& Session.get('addedStudent') === this.data._id) {
			this.$('tr').addClass('paintgreen');
			setTimeout(function () {
				this.$('tr').removeClass('paintgreen');
			}, 2000);	
		}
})

Template.liststudent.helpers({
	'students': function () {
		return Students.find({}, {sort: Session.get('sortquery')});
	}
});

Template.liststudent.events({
	'click .theader': function (e) {
		var hvalue = $(e.target).attr("data-name");
		var newquery = {};
		if (typeof Session.get('sortquery')[hvalue] !== 'undefined') {
			newquery[hvalue] = (Session.get('sortquery')[hvalue]==1) ? -1 : 1;
		} else {
			newquery[hvalue] = 1;
		}
		Session.set('sortquery', newquery);
		if (newquery[hvalue]==1) {
			$(e.target).removeClass('arrowup').addClass('arrowdown');
		} else {
			$(e.target).removeClass('arrowdown').addClass('arrowup');
		}
	}
});
