import { cn } from "@/lib/utils";

// wide: khung 1440px cho các section ảnh lớn; mặc định 1200px cho khối chữ
export default function Container({
  as: Tag = "div",
  wide = false,
  className,
  children,
  ...props
}) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full px-5 sm:px-8 lg:px-16",
        wide ? "max-w-[1440px]" : "max-w-[1200px]",
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
