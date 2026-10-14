// Cache Components yêu cầu giá trị thời gian phải được cache: "use cache" => tính 1 lần khi build/revalidate.
export default async function CurrentYear() {
  "use cache";
  return new Date().getFullYear();
}
