Router.configure({
    layoutTemplate: 'appBody'
});

Router.route('/addstudent', function () {
    Session.set('page', 'addstudent');
    this.render('addstudent');
});

Router.route('/liststudent', function () {
    Session.set('page', 'liststudent');
    this.render('liststudent');
});

Router.route('/', function () {
   this.redirect('/liststudent');
});
