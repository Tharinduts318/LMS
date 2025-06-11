import React, { useEffect } from "react";
import CourseCard from "@/components/ui/CourseCard";

//import coursesJson from "../data/courseData.js";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCourse } from "@/redux/courseSlice.js";


const Courses = () => {
  const dispatch = useDispatch()
  const {course} = useSelector(store => store.course)

  useEffect(()=>{
    const getAllPublishedCourse = async ()=>{
      try {
        const res = await axios.get(`http://localhost:8000/api/v1/course/published-courses`, {withCredentials:true})
        if(res.data.success){
          dispatch(setCourse(res.data.courses))
        }
      } catch (error) {
        console.log(error);
        
      }
    }
    getAllPublishedCourse()
  })

  return (
    <div className="bg-gray-100 pt-14">
      <div className="min-h-screen max-w-7xl mx-auto py-10">
        <div className="px-4">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">
            Our Courses
          </h1>
          <p className="text-center text-gray-600 mb-12">
            Explore our curated courses to boost your skills and career. Whether
            you're a beginner or an expert, We have something for everyone
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {course?.map((course) => {
              return <CourseCard key={course.id} course={course} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;
