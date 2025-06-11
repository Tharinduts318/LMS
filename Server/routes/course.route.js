import express from "express"
import {isAuthenticated} from "../middleware/isAuthenticated.js"
import { createCourse, createLecture, editCourse, editLecture, getCourseById, getCourseLecture, getCreatorCaurses, getPublishedCourse, removeLecture, togglePublishedCourse } from "../controllers/course.controller.js"
import { singleUpload } from "../middleware/multer.js"

const router = express.Router()

router.route("/").post(isAuthenticated, createCourse)
router.route("/published-courses").get(getPublishedCourse)
router.route("/").get(isAuthenticated, getCreatorCaurses)
router.route("/:courseId").put(isAuthenticated, singleUpload, editCourse )
router.route("/:courseId").get(isAuthenticated,getCourseById)
router.route("/:courseId/lecture").post(isAuthenticated, createLecture)
router.route("/:courseId/lecture").get(isAuthenticated, getCourseLecture)
router.route("/:courseId/lecture/:lectureId").post(isAuthenticated, editLecture)
router.route("/:courseId/lecture/:lectureId").delete(isAuthenticated, removeLecture)
router.route("/:courseId").patch(togglePublishedCourse)


export default router;