import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  firstYearCourses,
  secondYearCourses,
  thirdYearCourses,
} from "@/utils/coursesData";

export default function PassedCoursesSelector({
  level,
  department,
  passedCourses,
  setPassedCourses,
  lang,
}) {
  const [availableCourses, setAvailableCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCourses, setFilteredCourses] = useState([]);

  useEffect(() => {
    const getCoursesByLevel = (level) => {
      switch (level) {
        case "second":
          return [...firstYearCourses];
        case "third":
          return [...firstYearCourses, ...secondYearCourses];
        case "fourth":
          return [
            ...firstYearCourses,
            ...secondYearCourses,
            ...thirdYearCourses.filter(
              (course) => course.department === department
            ),
          ];
        default:
          return [];
      }
    };

    setAvailableCourses(getCoursesByLevel(level));
  }, [level, department]);

  useEffect(() => {
    const filtered = availableCourses.filter(
      (course) =>
        course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.nameAr.includes(searchTerm) ||
        course.courseCode.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCourses(filtered);
  }, [searchTerm, availableCourses]);

  const toggleCourse = (e, course) => {
    e.preventDefault();
    
    if (passedCourses.some((c) => c.courseCode === course.courseCode)) {
      setPassedCourses(
        passedCourses.filter((c) => c.courseCode !== course.courseCode)
      );
    } else {
      setPassedCourses([...passedCourses, course]);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-2">
        <Label htmlFor="search-courses">البحث عن المواد</Label>
        <Input
          id="search-courses"
          type="text"
          placeholder="ابحث باسم المادة أو رمزها"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {filteredCourses.map((course) => (
          <Button
            key={course.courseCode}
            variant={
              passedCourses.some((c) => c.courseCode === course.courseCode)
                ? "default"
                : "outline"
            }
            className="justify-start"
            onClick={(e) => toggleCourse(e, course)}
          >
            <span className="truncate">
              {lang ? course.name : course.nameAr} ({course.courseCode})
            </span>
          </Button>
        ))}
      </div>
      {filteredCourses.length === 0 && (
        <p className="text-center text-gray-500">لا توجد مواد مطابقة للبحث</p>
      )}
    </div>
  );
}
