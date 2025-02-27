import {Injectable} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {Strategy, VerifyCallback} from "passport-google-oauth2";
import {GoogleUser} from "../types/google-user.type";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, "google") {
  constructor() {
    const clientID = process.env.GOOGLE_CLIENT_ID as string;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET as string;
    const callbackURL = process.env.GOOGLE_CALLBACK_URL as string;

    super({
      clientID,
      clientSecret,
      callbackURL,
      scope: ["profile", "email", "openid"],
      proxy: true
    });
  }

  authorizationParams(): {[key: string]: string} {
    return {
      access_type: "offline",
      prompt: "consent",
    };
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: any,
    done: VerifyCallback
  ): Promise<any> {
    const {id, name, emails, photos} = profile;

    const user: GoogleUser = {
      provider: "google",
      providerId: id,
      email: emails[0].value,
      name,
      _accessToken,
      _refreshToken,
      picture: photos[0].value,
    };

    done(null, user);
  }
}