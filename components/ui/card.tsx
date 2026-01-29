import * as React from "react";
import { ArrowCircleDown2, ArrowCircleUp2 } from "iconsax-reactjs";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("rounded-xl border bg-card text-card-foreground", className)}
    {...props}
  />
));
Card.displayName = "Card";
interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  amount?: string;
  percentage?: string;
  percentageColor?: "green" | "red";
  showSelect?: boolean;
  selectDefault?: string;
  selectOptions?: { value: string; label: string }[];
}

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  (
    {
      className,
      children,
      title,
      amount,
      percentage,
      percentageColor = "green",
      showSelect = false,
      selectDefault = "thisYear",
      selectOptions = [
        { value: "thisYear", label: "This Year" },
        { value: "thisMonth", label: "This Month" },
      ],
      ...props
    },
    ref,
  ) => {
    const colorClasses =
      percentageColor === "green"
        ? "bg-green-100 text-green-700"
        : "bg-red-100 text-red-700";

    if (title && amount) {
      return (
        <div
          ref={ref}
          className={cn(
            "flex flex-wrap justify-between items-start gap-2 pb-2 p-2",
            className,
          )}
          {...props}
        >
          <div className="flex flex-col min-w-[150px]">
            <p className="text-sm text-muted-foreground text-[#8E8E93]">
              {title}
            </p>

            <div className="flex items-center flex-wrap gap-x-2 mt-1">
              <h2 className="font-semibold text-[24px] leading-[24px] font-inter text-[#3A3A3C]">
                {amount}
              </h2>

              {percentage && (
                <div
                  className={`text-xs ${colorClasses} px-2 py-1 rounded-full font-medium flex items-center gap-1`}
                >
                  <span>
                    {percentageColor === "green" ? (
                      <ArrowCircleUp2 className="w-4 h-4 text-green-500" />
                    ) : (
                      <ArrowCircleDown2 className="w-4 h-4 text-red-500" />
                    )}
                  </span>
                  {percentage}
                </div>
              )}
            </div>
          </div>

          {showSelect && (
            <div className="flex flex-col items-end w-full sm:w-auto hover:">
              <Select defaultValue={selectDefault}>
                <SelectTrigger className="w-[115px] h-7 text-xs mt-1 border-muted-foreground/20 cursor-pointer">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {selectOptions.map((opt) => (
                    <SelectItem
                      key={opt.value}
                      value={opt.value}
                      className="cursor-pointer"
                    >
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn("flex flex-col space-y-1.5 p-6", className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className,
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
