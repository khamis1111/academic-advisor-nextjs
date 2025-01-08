import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export default function DepartmentTermForm({
  level,
  department,
  setDepartment,
  term,
  setTerm,
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor="department">القسم</Label>
      <Select
        onValueChange={setDepartment}
        disabled={level === "third" || level === "fourth" ? false : true}
        defaultValue={department}
      >
        <SelectTrigger>
          <SelectValue placeholder="اختر القسم" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="CS">علوم الحاسب - CS</SelectItem>
          <SelectItem value="IS">نظم المعلومات - IS</SelectItem>
          <SelectItem value="IT">تكنولوجيا المعلومات - IT</SelectItem>
        </SelectContent>
      </Select>
      <Label htmlFor="term">الفصل الدراسي الحالي</Label>
      <Select
        onValueChange={setTerm}
        disabled={
          level === "third" || level === "fourth" ? !department : !level
        }
        defaultValue={term}
      >
        <SelectTrigger>
          <SelectValue placeholder="اختر الفصل الدراسي" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="first">الفصل الأول</SelectItem>
          <SelectItem value="second">الفصل الثاني</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
