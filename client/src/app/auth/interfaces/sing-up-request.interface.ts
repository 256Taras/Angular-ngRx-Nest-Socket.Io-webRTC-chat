import {CandidateInterface} from "./candidate.interface";

export interface SingUpRequestInterface{
  user:CandidateInterface;
  jwt:string
}
