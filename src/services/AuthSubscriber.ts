import { User } from "firebase/auth";

export interface AuthSubscriber {
  notify(user: User | null): void;
}
