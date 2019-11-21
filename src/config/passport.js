import passport from 'passport';
import { Strategy, ExtractJwt } from "passport-jwt";
import models from '../models';
 
class passportManager {
  initialize() {
    var opts = {
      jwtFromRequest : ExtractJwt.fromAuthHeaderWithScheme("jwt"),
      secretOrKey : process.env.JWT_SECRET_KEY
    };
    passport.use(new Strategy(opts, (jwt_payload, done) => {
      models.User.findById(jwt_payload.id).then(user => {
        if (user) {
          done(null, user);
        } else {
          done(null, false);
        }
      }).catch(err => {
        done(err, false);
      });
    }));
    return passport.initialize();
  }
  authenticate(req, res, next) {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
      if (err) { return next(err); }
        if (!user) {
          if (info.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Your token has expired." });
          } else {
            return res.status(401).json({ message: info.message });
          }
        }
        req.user = user;
      return next();
    })(req, res, next);
  }
}
export default new passportManager();
