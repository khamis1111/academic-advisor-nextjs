import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function CourseSelectionForm({
  courses,
  selected,
  setSelected,
  lang,
  credits,
  totalCredits,
}) {
  return (
    <div className="space-y-4">
      {courses()?.length !== 0 ? (
        <>
          <div className="flex items-center justify-between">
            <Label>المواد المتاحة</Label>
            <Label
              className={`${
                credits < totalCredits && "text-red-500 font-bold"
              }`}
            >
              اجمالي عدد الساعات المتاحة {credits} من {totalCredits}
            </Label>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {courses()?.map((course) => (
              <label
                key={course.courseCode}
                className="flex items-center space-x-2 rtl:space-x-reverse"
              >
                <Checkbox
                  value={course.name}
                  checked={selected.includes(course)}
                  onCheckedChange={(checked) => {
                    return checked
                      ? setSelected([...selected, course])
                      : setSelected(
                          selected.filter((value) => value !== course)
                        );
                  }}
                />
                <span>{lang ? course.name : course.nameAr}</span>
              </label>
            ))}
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center h-40">
          <p className="text-center text-2xl md:text-3xl font-medium">
            يرجى استكمال البيانات المطلوبة 😪
          </p>
        </div>
      )}
    </div>
  );
}
