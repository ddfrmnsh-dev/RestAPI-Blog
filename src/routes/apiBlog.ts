import { Express } from "express";
import blogController from "./../controller/apiBlogController";
export default function (app:Express) {

    app.route("/feed")
        .get(blogController.getFeed)

    app.route("/post")
        .post(blogController.insertPost)

    app.route("/post/:id")
        .get(blogController.getPostById)
        .put(blogController.updatePostById)
        .delete(blogController.deletePostById)

    app.route("/user")
        .post(blogController.insertUser)

    app.route("/user/:username")
        .get(blogController.getUserById)
}