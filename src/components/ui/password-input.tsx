"use client";
import * as React from "react";
import { Icon } from "@iconify/react"
import { Input, InputProps } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils";

const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, type, ...props }, ref) => {
		const [showPassword, setShowPassword] = React.useState(false);
		const togglePasswordVisibility = () => setShowPassword(!showPassword);

		return (
			<div className="relative">
				<Input
					type={showPassword ? "text" : "password"}
					className={cn("hide-password-toggle pr-10", className)}
					ref={ref}
					{...props}
				/>
				<Button
					type="button"
					variant="ghost"
					size="sm"
					className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-gray-500"
					onClick={togglePasswordVisibility}
				>
					{showPassword ? (
						<Icon
							icon="ant-design:eye-outlined"
							className="h-4 w-4"
						/>
					) : (
						<Icon
							icon="ant-design:eye-invisible-outlined"
							className="h-4 w-4"
						/>
					)}
					<span className="sr-only">
						{showPassword ? "Hide password" : "Show password"}
					</span>
				</Button>
			</div>
		);
	},
);
PasswordInput.displayName = "Input";

export { PasswordInput }