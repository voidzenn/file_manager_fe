import { Input } from "../ui/input";

interface TextField {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextField = ({ value, onChange }: TextField) => {
  return (
    <div className="bg-blue">
      <Input value={value} onChange={onChange} />
    </div>
  );
};

export default TextField;
