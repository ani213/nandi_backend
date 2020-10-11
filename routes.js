var volunteerController=require('./controller/volunteer')
var uploadController=require("./helper/upload")
module.exports=function(router,auth){
            
    router.route('/me').get(volunteerController.me)
    // super Admin
    // router.route('/change/key/secret').get(auth.authenticate,auth.hasRoles([roleConfig.ROLES.SUPER.id]),userController.changeKeySecret);
    router.route('/test').post(auth.x_csrf_auth,volunteerController.createVolunteer)
}