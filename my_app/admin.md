# Admin 

## Admin Identification and creation
You can do as below:

- Step 1 : Create one superadmin manually give isAdmin = 2

- Step 2 : Above created superadmin can only add/register sub admin, give isAdmin = 1

- Step 3: And last, from normal regostration, you can give isAdmin = 0

- so isAdmin = 2 (superadmin), isAdmin = 1 (subadmin) and  isAdmin = 0 (normal user)

- Note: 2,1 value for isAdmin is my suggestion, you can change if you want as per your requirements.

If it's a software platform (meaning one web address and database for all users of your app) then the first admin user is typically created by running commands on the server command line console to create the right record. Or perhaps by a setup script that is run once. This creates the first admin user, and then that user logs in and creates more admin users via the UI. This typically only ever needs to be done once in the entire lifetime of the project, so no need to have this be a user friendly process.

However, if it's a server you install your own instance of it's common to have a setup wizard, since each new install will need to go through this process, it's worth the effort to make something user friendly. You go to something like myapp.com/setup and then complete a few forms that sets up the first admin user and provides initial configuration and preferences. After this first admin user is setup this setup page would no longer be accessible, so that no other new admin users can be created that way.

Routes for admin
- [x] /admin/ (this will be something like a dashboard)
- [x] /admin/emails/ (this is for opening email section of the dashboard)
- [x] /admin/emails/create (this is for opening email section of the dashboard)
- [x] /admin/emails/delete (this is for opening email section of the dashboard)
- [x] /admin/emails/update (this is for opening email section of the dashboard)
- [x] /admin/teachers/ (this is the route for viewing all the teachers in the dashboard)
- [x] /admin/teachers/create (this is the route for adding teachers in the app database)
- [ ] /admin/teachers/edit (this is a route for editing details of a teacher)
- [x] /admin/teachers/delete (this route for deleting a teacher data or user from the app)
- [ ] /admin/updates/create (this route is for creating updates for teachers)
- [ ] /admin/updates/letters/ (this is a route for viewing and approving letters submitted by teachers)
- [x] /admin/study/create (this is a route for adding study material for teachers)
- [ ] /admin/study/update (this is a route for updating study material for teachets)
- [x] /admin/study/delete (this is a route for deleting study material for teachers)
- [x] /admin/study/read (this is open the study material for the teachers on the admin side)
- [ ] /admin/exprenses/create (this is a route for adding total expenses spend by the managment in the school)
- [ ] /admin/expenses/update (this is a route for updating total expenses spend by the managment in the school)
- [ ] /admin/expenses/delete (this is a route for deleting total expenses spend by the managment in the school)
- [ ] /admin/dailyUpdates/create (this is a route for adding daily updates for the teachers)
- [ ] /admin/dailyUpdates (this is a route for adding daily updates for the teachers)
- [ ] /admin/dailyUpdates/update (this is a route for updating daily updates for the teachers)
- [ ] /admin/dailyUpdates/deleting (this is a route for deleting daily updates for the teachers)
- [x] /admin/add (this is route for adding a admin in the database)
- [x] /admin/delete (this is route for deleting a admin in the database)
- [x] /admin/updating (this is route for updating profile of a admin in the database)
- [x] /admin/:id (this is a route for viewing admin profile in the app)


### Privileges for admin users
- Add teachers
- Remove teachers
- Edit teacher's information and details
- send updates realted to school and events
- Add study material
- View all teacher's profile
- Ability to approve letter for leave , promotion etc
- Set upcoming schedule's in the calender
- Provide tasks to the teachers
- Provide update to the teachers via email
