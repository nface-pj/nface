import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { Post } from "./Post";
import { User } from "./User";
import { Model } from "./Models/Model";

@Entity()
export class Comment extends Model {
  @Column({
    nullable: false,
    type: "longtext",
  })
  content!: string;

  @Column("boolean", {
    default: false,
  })
  deleted!: boolean;

  @Column({
    nullable: false,
  })
  ipAddress!: string;

  @Column({
    nullable: true,
  })
  anonymouseId?: string;

  @Column({
    nullable: true,
  })
  password?: string;

  @Column({
    nullable: false,
    default: false,
  })
  isMember!: boolean;

  @ManyToOne((_) => Comment, (comment) => comment.childComments)
  parentComment!: Partial<Comment>;

  @OneToMany((_) => Comment, (comment) => comment.parentComment, {
    // primary: true,
  })
  childComments!: Partial<Comment[]>;

  @ManyToOne(() => User, (user) => user.comments, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  user!: Partial<User>;

  @ManyToOne(() => User, (user) => user.commentsForNickname, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "user_nickname", referencedColumnName: "nickname" })
  user_nickname!: Partial<User>;

  @ManyToOne(() => User, (user) => user.commentsForId, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "user_id", referencedColumnName: "id" })
  user_id!: Partial<User>;

  @ManyToOne(() => Post, (post) => post.comments, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  post!: Partial<Post>;

  toJSON() {
    return {
      ...this,
      test: this.user_nickname,
      password: undefined,
    };
  }
}
