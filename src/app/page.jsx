"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import PassedCoursesSelector from "@/components/passed-courses-selector";
import ReactMarkdown from "react-markdown";
import { Globe } from "lucide-react";
import { useStudentAdvisor } from "@/hooks/useStudentAdvisor";
import BasicInfoForm from "@/components/BasicInfoForm";
import DepartmentTermForm from "@/components/DepartmentTermForm";
import CourseSelectionForm from "@/components/CourseSelectionForm";

export default function StudentAdvisors() {
  const {
    step,
    setStep,
    gpa,
    setGpa,
    advice,
    loading,
    selected,
    setSelected,
    completed,
    setCompleted,
    level,
    setLevel,
    department,
    setDepartment,
    term,
    setTerm,
    lang,
    setLang,
    progress,
    setProgress,
    totalCredits,
    credits,
    courses,
    handleSubmit,
  } = useStudentAdvisor();

  const formSteps = [
    {
      title: "المعلومات الأساسية",
      fields: (
        <BasicInfoForm
          gpa={gpa}
          setGpa={setGpa}
          level={level}
          setLevel={setLevel}
        />
      ),
    },
    {
      title: "معلومات القسم والفصل الدراسي",
      fields: (
        <DepartmentTermForm
          level={level}
          department={department}
          setDepartment={setDepartment}
          term={term}
          setTerm={setTerm}
        />
      ),
    },
    {
      title: "اختر المواد التي أتممت دراستها بنجاح",
      fields: (
        <PassedCoursesSelector
          level={level}
          department={department}
          passedCourses={completed}
          setPassedCourses={setCompleted}
          lang={lang}
        />
      ),
    },
    {
      title: "اختر المواد التي ترغب في تسجيلها",
      fields: (
        <CourseSelectionForm
          courses={courses}
          selected={selected}
          setSelected={setSelected}
          lang={lang}
          credits={credits}
          totalCredits={totalCredits}
        />
      ),
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">
        نظام الإرشاد الأكاديمي
      </h1>
      <AnimatePresence mode="wait">
        {step < 5 ? (
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">
                {formSteps[step - 1].title}
              </h2>
              {(step === 3 || step === 4) && (
                <motion.div
                  whileTap={{ scale: 0.8 }}
                  className="cursor-pointer hover:animate-pulse"
                  onClick={() => setLang((prev) => !prev)}
                >
                  <Globe className="h-6 w-6" />
                </motion.div>
              )}
            </div>
            <form className="space-y-6">
              {formSteps[step - 1].fields}
              <div className="flex justify-between">
                {step > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setStep(
                        step === 4 && level === "first" ? step - 2 : step - 1
                      );
                      setProgress((prev) =>
                        level === "first" ? prev - 0.4 : prev - 0.25
                      );
                    }}
                  >
                    السابق
                  </Button>
                )}
                {step < 4 ? (
                  <Button
                    type="button"
                    onClick={() => {
                      setStep(
                        step === 2 && level === "first" ? step + 2 : step + 1
                      );
                      setProgress((prev) =>
                        level === "first" ? prev + 0.4 : prev + 0.25
                      );
                    }}
                    disabled={!gpa || !level}
                  >
                    {completed.length === 0 && step === 3 ? "تخطي" : "التالي"}
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={
                      loading ||
                      !term ||
                      !level ||
                      !gpa ||
                      selected.length === 0
                      // credits < totalCredits
                    }
                    onClick={handleSubmit}
                    className="hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                  >
                    {loading ? "جاري التحميل..." : "الحصول على النصيحة"}
                  </Button>
                )}
              </div>
            </form>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-xl font-semibold mb-4">النصيحة الأكاديمية</h2>
            {loading ? (
              <Skeleton className="w-full h-40" />
            ) : (
              <ReactMarkdown className="bg-white shadow-lg rounded-lg p-6 prose max-w-full">
                {advice}
              </ReactMarkdown>
            )}
            <Button
              className="mt-6"
              onClick={() => {
                setStep(1);
                setProgress(0);
              }}
            >
              بدء استشارة جديدة
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Khamis Team */}
      <motion.div
        initial={{ opacity: 0, x: -50, width: "2rem" }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ width: "8rem" }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-5 left-5 w-8 h-8 flex items-center justify-center bg-slate-950 shadow-lg shadow-slate-950/40 text-white rounded-full overflow-hidden group"
      >
        <div className="flex items-center gap-2">
          <p className="text-nowrap text-sm group-hover:block hidden">
            🌹 By Khamis
          </p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="none"
          >
            <path
              fillRule="evenodd"
              d="M7.157 0 2.333 9.408l-.56 1.092H7a.25.25 0 0 1 .25.25V16h1.593l4.824-9.408.56-1.092H9a.25.25 0 0 1-.25-.25V0H7.157ZM7 9H4.227L7.25 3.106V5.25C7.25 6.216 8.034 7 9 7h2.773L8.75 12.894V10.75A1.75 1.75 0 0 0 7 9Z"
              clipRule="evenodd"
              className="fill-white"
            ></path>
          </svg>
        </div>
      </motion.div>
      
      {/* progress-bar */}
      <motion.div
        className={`progress-bar ${
          progress && "h-1"
        }  rounded-r-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500`}
        animate={{ scaleX: progress }} // Animate the scaleX
        transition={{ duration: 0.5 }} // Smooth transition
      />
    </div>
  );
}
