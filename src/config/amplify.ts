import { Amplify } from "aws-amplify";
import config from "../amplifyconfiguration.json";

export function configureAmplify() {
  Amplify.configure(config);
}