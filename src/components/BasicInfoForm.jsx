import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function BasicInfoForm({ gpa, setGpa, level, setLevel }) {
  return (
    <div className="space-y-2">
      <Label htmlFor="gpa">المعدل التراكمي (GPA)</Label>
      <Input
        placeholder="المعدل التراكمي (GPA)"
        id="gpa"
        type="number"
        step="0.01"
        min="0"
        max="4"
        value={gpa}
        onChange={(e) =>
          e.target.value >= 0 && e.target.value <= 4
            ? setGpa(e.target.value)
            : null
        }
      />
      <Label htmlFor="level">المستوى الدراسي</Label>
      <Select onValueChange={setLevel} disabled={!gpa} defaultValue={level}>
        <SelectTrigger>
          <SelectValue placeholder="اختر المستوى الدراسي" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="first">السنة الأولى</SelectItem>
          <SelectItem value="second">السنة الثانية</SelectItem>
          <SelectItem value="third">السنة الثالثة</SelectItem>
          <SelectItem value="fourth">السنة الرابعة</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
