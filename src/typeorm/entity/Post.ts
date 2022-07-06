import { Thumb } from "./Thumb";
import { IsIP, Length } from "class-validator";
import { Entity, Column, ManyToOne, OneToMany, AfterInsert } from "typeorm";
import { Comment } from "./Comment";

import { Model } from "./Models/Model";
import { User } from "./User";

@Entity()
export class Post extends Model {
  @Column()
  @Length(1, 255)
  title!: string;

  @Column({ type: "text" })
  content!: string;

  @Column({
    type: "enum",
    enum: ["user", "admin", "superadmin"],
    default: "user",
  })
  permision!: string;

  @Column()
  category!: string;

  @Column({
    nullable: false,
    default: false,
  })
  views!: number;

  @Column({
    nullable: false,
    default: 0,
  })
  delete!: boolean;

  @Column({
    nullable: false,
    default: true,
  })
  useComment!: boolean;

  @Column({
    nullable: false,
    default: 0,
  })
  commentCount!: number;

  @Column()
  @IsIP()
  ipAddress!: string;

  @Column({
    nullable: true,
  })
  slug!: string;

  @AfterInsert()
  createSlug() {
    this.title;
  }

  @ManyToOne(() => User, (post) => post.posts, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  user!: Partial<User>;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments!: Partial<Comment[]>;

  @OneToMany(() => Thumb, (thumb) => thumb.post)
  thumbs!: Partial<Thumb[]>;

  toJSON() {
    const ipAddress = "X.X." + this.ipAddress.split(".").slice(2, 4).join(".");
    return {
      ...this,
      ipAddress,
    };
  }
}
