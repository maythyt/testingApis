const admin = require('./admin')

module.exports = app => {
    app.post('/signup', app.api.user.save)
    app.post('/signin', app.api.auth.signIn)
    app.post('/validateToken', app.api.auth.validateToken)

    app.route('/users')
   .all(app.config.passport.authenticate())
       .post(app.api.user.save)
       .get(app.api.user.get)
       
    app.route('/users/:id')
    .all(app.config.passport.authenticate())
       .put(app.api.user.save)

    app.route('/categories')
    .all(app.config.passport.authenticate())
       .get(app.api.category.get)
       .post(app.api.category.save)

    app.route('/categories/:id')
    .all(app.config.passport.authenticate())
       .get(app.api.category.getById)
       .put(app.api.category.save)
       .delete(admin(app.api.category.remove))
   
   app.route('/products')
       .get(app.api.product.get)
       .post(app.api.product.save)
      
   app.route('/products/:id')
   .all(app.config.passport.authenticate())
       .get(app.api.product.getById)
       .put(app.api.product.save)
       .delete(admin(app.api.product.remove))
}