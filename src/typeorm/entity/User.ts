import { Model } from "../Models/Model";
import { Entity, Column } from "typeorm";

@Entity()
export class User extends Model {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  age: number;
}
