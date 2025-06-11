import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import RichTextEditor from "@/components/ui/RichTextEditor";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { setCourse } from "@/redux/courseSlice";
import { Label } from "@radix-ui/react-label";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const CourseTab = () => {
  const params = useParams();
  const id = params.courseId;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { course } = useSelector((store) => store.course);
  const selectCourse = course.find((course) => course._id === id);

  const [selectedCourse, setSelectedCourse] = useState(selectCourse);
  const [loading, setLoading] = useState(false);
  const [publish, setPublish] = useState(false);
  const getCourseById = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/v1/course/${id}`, {
        withCredentials: true, // This is required to send cookies with the request
      });
      if (res.data.success) {
        setSelectedCourse(res.data.course);
      }
    } catch (error) {
      console.log(error);
      // Handle unauthorized error
      if (error.response?.status === 401) {
        toast.error("Please login to access this course");
        navigate("/login");
      }
    }
  };
  useEffect(() => {
    getCourseById();
  }, [id]); // Only re-run when the id changes

  // useEffect(() => {
  //   if (selectedCourse) {
  //     setPublish(selectedCourse.isPublished);
  //   }
  // }, [selectedCourse]);

  const [input, setInput] = useState({
    courseTitle: selectedCourse?.courseTitle,
    subTitle: selectedCourse?.subTitle,
    description: selectedCourse?.description,
    category: selectedCourse?.category,
    courseLevel: selectedCourse?.courseLevel,
    coursePrice: selectedCourse?.coursePrice,
    file: "",
  });

  const [previewThumbnail, setPreviewThumbnail] = useState(
    selectedCourse?.courseThumbnail
  );

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const selectCategory = (value) => {
    setInput({ ...input, category: value });
  };

  const selectCourseLevel = (value) => {
    setInput({ ...input, courseLevel: value });
  };

  //get file
  const selectThumbnail = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput({ ...input, courseThumbnail: file });
      const fileReader = new FileReader();
      fileReader.onloadend = () => setPreviewThumbnail(fileReader.result);
      fileReader.readAsDataURL(file);
    }
  };

  const updateCourseHandler = async () => {
    const formData = new FormData();
    formData.append("courseTitle", input.courseTitle);
    formData.append("subTitle", input.subTitle);
    formData.append("description", input.description);
    formData.append("category", input.category);
    formData.append("courseLevel", input.courseLevel);
    formData.append("coursePrice", input.coursePrice);
    formData.append("file", input.courseThumbnail);

    try {
      setLoading(true);
      const res = await axios.put(
        `http://localhost:8000/api/v1/course/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        navigate("lecture");
        toast.success(res.data.message);
        dispatch([...course, setCourse(res.data.course)]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const togglePublishUnpublish = async () => {
    const action = publish ? "unpublish" : "publish";
    try {
      // Important...................................
      //i added "null," part to this line(143) and add use effect code line to line(59)
      //then i change <Button> in line(171)
      //and line(138)
      const res = await axios.patch(
        `http://localhost:8000/api/v1/course/${id}`,

        {
          params: {
            action,
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        setPublish(!publish);

        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card>
      <CardHeader className="flex md:flex-row justify-between">
        <div>
          <CardTitle>Basic Course Information</CardTitle>
          <CardDescription>
            Make changes to your course here. click save when you're done.
          </CardDescription>
        </div>
        <div className="space-x-2">
          <Button
            onClick={async () => {
              await togglePublishUnpublish();
              setSelectedCourse({
                ...selectedCourse,
                isPublished: !selectedCourse.isPublished,
              });
            }}
            // onClick={() =>
            //   togglePublishUnpublish(
            //     selectedCourse.isPublished ? "Unpublish" : "Publish"
            //   )
            // }
            // onClick={togglePublishUnpublish}
            className="bg-gray-800"
          >
            {selectedCourse.isPublished ? "Unpublish" : "Publish"}
            {/* {publish ? "Unpublish" : "Publish"} */}
          </Button>
          <Button variant="destructive">Remove Course</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 mt-5">
          <div>
            <Label>Title</Label>
            <Input
              value={input.courseTitle}
              onChange={changeEventHandler}
              type="text"
              name="courseTitle"
              placeholder="Ex. fullstack developer"
            />
          </div>
          <div>
            <Label>Subtitle</Label>
            <Input
              value={input.subTitle}
              onChange={changeEventHandler}
              type="text"
              name="subtitle"
              placeholder="Ex. Become a fullstack developer from zero to hero in 2 months"
            />
          </div>
          <div>
            <Label>Description</Label>
            <RichTextEditor input={input} setInput={setInput} />
          </div>
          <div className="flex md:flex-row flex-wrap gap-1 items-center md:gap-5">
            <div>
              <Label>Category</Label>
              <Select
                defaultValue={input.category}
                onValueChange={selectCategory}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Category</SelectLabel>
                    <SelectItem value="Next js">Next js</SelectItem>
                    <SelectItem value="Data Science">Data Science</SelectItem>
                    <SelectItem value="Frontend development">
                      Frontend development
                    </SelectItem>
                    <SelectItem value="Backend development">
                      Backend development
                    </SelectItem>
                    <SelectItem value="Mern Stack development">
                      Mern Stack development
                    </SelectItem>
                    <SelectItem value="Javascript">Javascript</SelectItem>
                    <SelectItem value="Python">Python</SelectItem>
                    <SelectItem value="Docker">Docker</SelectItem>
                    <SelectItem value="MongoDB">MongoDB</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Course Level</Label>
              <Select
                defaultValue={input.courseLevel}
                onValueChange={selectCourseLevel}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a course level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Course Level</SelectLabel>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Advance">Advance</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Price in (LKR)</Label>
              <Input
                type="number"
                name="coursePrice"
                value={input.coursePrice}
                onChange={changeEventHandler}
                placeholder="199"
                className="w-fit"
              />
            </div>
          </div>
          <div>
            <Label>Course Thumbnail</Label>
            <Input
              type="file"
              id="file"
              onChange={selectThumbnail}
              placeholder="199"
              accept="image/*"
              className="w-fit"
            />
            {previewThumbnail && (
              <img
                src={previewThumbnail}
                alt="Thumbnail"
                className="w-64 my-2 "
              />
            )}
          </div>
          <div className="flex gap-2">
            <Button onClick={() => navigate("/admin/course")} variant="outline">
              Cancel
            </Button>
            <Button
              className="bg-gray-800 hover:bg-gray-800"
              disabled={loading}
              onClick={updateCourseHandler}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                  Please wait...
                </>
              ) : (
                "save"
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseTab;
