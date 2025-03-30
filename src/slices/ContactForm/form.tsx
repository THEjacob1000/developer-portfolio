import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { Root as Label } from "@radix-ui/react-label";
import {
	type ComponentPropsWithoutRef,
	type ComponentRef,
	type HTMLAttributes,
	createContext,
	forwardRef,
	useContext,
	useId,
} from "react";
import type { ControllerProps, FieldPath, FieldValues } from "react-hook-form";
import { Controller, useFormContext } from "react-hook-form";

type FormItemContextValue = {
	id: string;
};

const FormItemContext = createContext<FormItemContextValue>(
	{} as FormItemContextValue,
);

const useFormField = () => {
	const fieldContext = useContext(FormFieldContext);
	const itemContext = useContext(FormItemContext);
	const { getFieldState, formState } = useFormContext();

	const fieldState = getFieldState(fieldContext.name, formState);

	if (!fieldContext) {
		throw new Error("useFormField should be used within <FormField>");
	}

	const { id } = itemContext;

	return {
		id,
		name: fieldContext.name,
		formItemId: `${id}-form-item`,
		formDescriptionId: `${id}-form-item-description`,
		formMessageId: `${id}-form-item-message`,
		...fieldState,
	};
};

type FormFieldContextValue<
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
	name: TName;
};

const FormFieldContext = createContext<FormFieldContextValue>(
	{} as FormFieldContextValue,
);

const FormField = <
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
	...props
}: ControllerProps<TFieldValues, TName>) => {
	return (
		<FormFieldContext.Provider value={{ name: props.name }}>
			<Controller {...props} />
		</FormFieldContext.Provider>
	);
};

const FormItem = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }, ref) => {
		const id = useId();

		return (
			<FormItemContext.Provider value={{ id }}>
				<div ref={ref} className={className} {...props} />
			</FormItemContext.Provider>
		);
	},
);
FormItem.displayName = "FormItem";

const FormControl = forwardRef<
	ComponentRef<typeof Slot>,
	ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
	const { error, formItemId, formDescriptionId, formMessageId } =
		useFormField();

	return (
		<Slot
			ref={ref}
			id={formItemId}
			aria-describedby={
				!error
					? `${formDescriptionId}`
					: `${formDescriptionId} ${formMessageId}`
			}
			aria-invalid={!!error}
			{...props}
		/>
	);
});
FormControl.displayName = "FormControl";

const FormMessage = forwardRef<
	HTMLParagraphElement,
	HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
	const { error, formMessageId } = useFormField();
	const body = error ? String(error?.message ?? "") : children;

	if (!body) {
		return null;
	}

	return (
		<p
			ref={ref}
			id={formMessageId}
			className={cn("text-[0.8rem] font-medium text-destructive", className)}
			{...props}
		>
			{body}
		</p>
	);
});
FormMessage.displayName = "FormMessage";

const FormLabel = forwardRef<
	ComponentRef<typeof Label>,
	ComponentPropsWithoutRef<typeof Label>
>(({ className, ...props }, ref) => {
	const { error, formItemId } = useFormField();

	return (
		<Label
			ref={ref}
			className={cn(
				"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
				error && "text-destructive",
				className,
			)}
			htmlFor={formItemId}
			{...props}
		/>
	);
});
FormLabel.displayName = "FormLabel";

export {
	FormControl,
	FormField,
	FormItem,
	FormMessage,
	useFormField,
	FormLabel,
};
