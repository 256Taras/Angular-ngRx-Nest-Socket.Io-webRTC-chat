import { ErrorResponceInterface } from "src/app/shared/interfaces/error-responce.interface";
import { ConversationStateInterface } from "./conversation-state.interface";

export interface ChatStateInterface {
conversations:ConversationStateInterface[],
isLoading:boolean,
errors:ErrorResponceInterface
}
