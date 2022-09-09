const labels = require('./labels');
const authAdmin = require('./authAdmin');
const Models = require('../model/models');

var adminJs; 
var adminRouter;

const createAdminPanel = (sequelizeDb,) => {
    const AdminJs = require('adminjs');
    const AdminJsExpress = require('@adminjs/express');
    const AdminJsSequelize = require('@adminjs/sequelize');

    AdminJs.registerAdapter(AdminJsSequelize);

    adminJs = new AdminJs({
        databae: [sequelizeDb],
        rootpath: '/admin',
        resources: [
            {
                resource: Models.User,
                options: {
                    parent: {
                        icon: ''
                    },
                    
                    properties: {
                        imageUrl: {
                            components: {
                                show: AdminJs.bundle('./components/image_view.tsx'),
                                
                            }
                        },
                        
                    }
                }
            },
            {
                resource: Models.Product,
                options: {
                    parent: {
                        icon: ''
                    },
                    properties: {
                        imageUrl: {
                            components: {
                                show: AdminJs.bundle('./components/image_view.tsx'),
                            }
                        },
                    },
                }
            },
            {
                resource: Models.Category,
                options: {
                    parent: {
                        icon: ''
                    },
                    properties: {
                        imageUrl: {
                            components: {
                                show: AdminJs.bundle('./components/image_view.tsx'),
                                list: AdminJs.bundle('./components/image_view.tsx')
                            }
                        }
                    },
                }

            },
            {
                resource: Models.Address,
                options: {
                    parent: {icon: ''},
                }
            },
            {
                resource: Models.AccessToekn,
                options: {
                    parent: {icon: ''},
                }
            },
            {
                resource: Models.Order,
                options: {
                    parent: {icon: ''},
                }
            },
            {
                resource: Models.OrderItem,
                options: {
                    parent: {icon: ''},
                }
            },
            {
                resource: Models.Wishlist,
                options: {
                    parent: {icon: ''},
                }
            },
            {
                resource: Models.WishListItem,
                options: {
                    parent: {icon: ''},
                }
            },
        ],
        locale: labels.label,
        branding: labels.branding,
    })

    adminJs.watch();

    adminRouter = AdminJsExpress
        .buildAuthenticatedRouter(
            adminJs, {
            authenticate: authAdmin.authAdmin,
            cookiePassword: 'session Key'
        }
        )
    console.log("Admin route created");
    return [adminJs, adminRouter];
}


module.exports = {
    createAdminPanel,
    adminJs,
    adminRouter
}