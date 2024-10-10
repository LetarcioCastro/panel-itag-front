import { useState, forwardRef, Ref } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";

type InputPasswordProps = {
  viewModel?: { password: string; setPassword: (value: string) => void };
  [key: string]: any;
};

export const InputPassword = forwardRef(function ({ viewModel, ...rest }: InputPasswordProps, ref: Ref<HTMLInputElement>) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <div style={{ position: "relative" }}>
        <Input
          value={!viewModel ? undefined : viewModel.password}
          onChange={
            !viewModel
              ? undefined
              : (e) => viewModel.setPassword(e.target.value)
          }
          type={showPassword ? "text" : "password"}
          ref={ref}
          {...rest}
        />
        <button
          type="button"
          style={{
            position: "absolute",
            right: "10px",
            top: "50%",
            transform: "translateY(-50%)",
            cursor: "pointer",
          }}
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
    </div>
  );
})
